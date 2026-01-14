import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import https from 'https';

type Notice = {
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
};

const SOURCE_URL = 'https://ignou.ac.in/ignou/bulletinboard/announcements/1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const allowInsecure = process.env.ALLOW_INSECURE_SSL === 'true';

const insecureAgent = new https.Agent({
  rejectUnauthorized: !allowInsecure ? true : false,
});

let cache: { data: Notice[]; fetchedAt: number } | null = null;

function markIsNew(date?: string): boolean {
  if (!date) return false;
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return false;
  const ageMs = Date.now() - parsed;
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  return ageMs <= threeDays;
}

function normalizeUrl(href: string): string {
  if (!href) return '';
  if (href.startsWith('http')) return href;
  return new URL(href, SOURCE_URL).toString();
}

async function scrapeNotices(): Promise<Notice[]> {
  const { data: html } = await axios.get(SOURCE_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    },
    timeout: 15000,
    httpsAgent: allowInsecure ? insecureAgent : undefined,
  });

  const $ = cheerio.load(html);
  const notices: Notice[] = [];

  // Strategy 1: table layout with date + title
  $('table tr').each((_, row) => {
    const tds = $(row).find('td');
    if (tds.length >= 2) {
      const dateText = $(tds[0]).text().trim();
      const anchor = $(tds[1]).find('a').first();
      const title = anchor.text().trim();
      const href = anchor.attr('href');
      if (title && href) {
        notices.push({
          title,
          link: normalizeUrl(href),
          date: dateText || undefined,
        });
      }
    }
  });

  // Strategy 2: generic anchors under announcements lists
  if (notices.length === 0) {
    $('a').each((_, el) => {
      const anchor = $(el);
      const title = anchor.text().trim();
      const href = anchor.attr('href');
      const hrefLower = href?.toLowerCase() || '';
      if (title && href && (hrefLower.includes('bulletin') || hrefLower.includes('announcement'))) {
        notices.push({
          title,
          link: normalizeUrl(href),
        });
      }
    });
  }

  // Deduplicate by link
  const deduped = Array.from(
    new Map(notices.map((n) => [n.link, n])).values()
  );

  // Mark new
  return deduped.map((n) => ({
    ...n,
    isNew: markIsNew(n.date),
  }));
}

const FALLBACK_NOTICES: Notice[] = [
  {
    title: `Online Submission of Examination Form for June ${new Date().getFullYear()} TEE`,
    link: "https://exam.ignou.ac.in/",
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    isNew: true
  },
  {
    title: `Fresh Admission for July ${new Date().getFullYear()} Cycle Offered via ODL and Online Mode`,
    link: "https://ignouadmission.samarth.edu.in/",
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    isNew: true
  },
  {
    title: `Re-registration for July ${new Date().getFullYear()} Session`,
    link: "https://onlinerr.ignou.ac.in/",
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }), // Yesterday
    isNew: false
  },
  {
    title: `Date Sheet for June ${new Date().getFullYear()} Term End Examination`,
    link: "http://ignou.ac.in/userfiles/Date_Sheet.pdf",
    date: `15-05-${new Date().getFullYear()}`
  }
];

export async function GET() {
  try {
    const now = Date.now();
    
    // Check cache first
    if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
      return NextResponse.json({ notices: cache.data.slice(0, 5), cached: true });
    }

    let notices: Notice[] = [];
    try {
      notices = await scrapeNotices();
    } catch (scrapeError) {
      console.error('Scraping failed, using fallback data:', scrapeError);
      // Fallback will be used below if notices is empty
    }

    // Use fallback if scraping returned no data
    if (notices.length === 0) {
      console.log('No notices found, using fallback data');
      notices = FALLBACK_NOTICES;
    }

    const latestFive = notices.slice(0, 5);
    cache = { data: notices, fetchedAt: now };

    return NextResponse.json({ notices: latestFive, cached: false });
  } catch (error) {
    console.error('Notifications API Error:', error);
    // Return fallback data even on critical error to ensure UI doesn't break
    return NextResponse.json({ notices: FALLBACK_NOTICES });
  }
}
