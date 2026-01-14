# Banner Image Setup Guide

## Quick Setup

1. **Place your banner image** in the `public` folder with one of these names:
   - `banner.jpg` (recommended)
   - `banner.png`
   - `banner.webp`

2. **That's it!** The banner will automatically appear on your homepage.

## Image Recommendations

### Best Specifications:
- **Format**: JPG (best compression) or PNG (transparency support) or WebP (best quality/size ratio)
- **Dimensions**: 1920x700px or larger (will scale automatically)
- **Aspect Ratio**: 16:9 or 2.7:1 works best
- **File Size**: Under 1MB for fast loading (optimize before uploading)
- **Content**: Should include your design with students, campus, logo, etc.

### Image Optimization Tips:
- Use tools like TinyPNG, Squoosh, or ImageOptim to compress
- For JPG: Quality 80-85% is usually perfect
- For PNG: Use 8-bit if possible
- For WebP: Best modern format, smallest file size

## Transparency & Overlay Settings

The banner uses layered overlays for optimal text readability:

### Current Settings (Optimized for Original Banner):
- **Dark Overlay**: `from-black/15 via-black/10 to-black/20` (15% top, 10% middle, 20% bottom) - Light for better banner visibility
- **Blue Tint**: `from-blue-600/40 via-blue-500/30 to-blue-600/45` (40% top, 30% middle, 45% bottom) - Vibrant blue matching original
- **Total Overlay**: Approximately 30-40% opacity combined - Lighter to show banner details

### To Adjust Transparency:

Edit `components/Banner.tsx` and modify these values:

**For More Visible Banner (less overlay):**
```tsx
// Change from:
from-black/15 via-black/10 to-black/20
// To:
from-black/5 via-black/3 to-black/10

// And:
from-blue-600/40 via-blue-500/30 to-blue-600/45
// To:
from-blue-600/20 via-blue-500/15 to-blue-600/25
```

**For More Readable Text (more overlay):**
```tsx
// Change to:
from-black/30 via-black/25 to-black/40
// And:
from-blue-600/60 via-blue-500/50 to-blue-600/65
```

**Current settings are optimized to match the original banner design - vibrant blue background with good text visibility.**

### Opacity Values Reference:
- `/10` = 10% opacity (very transparent)
- `/30` = 30% opacity (light overlay)
- `/50` = 50% opacity (medium overlay) - **Current**
- `/70` = 70% opacity (strong overlay)
- `/90` = 90% opacity (very strong overlay)

## Content Elements

The banner component includes:
- ✅ Logo section (semi-transparent white background)
- ✅ Main slogan: "Your Partner in IGNOU Success!"
- ✅ Red service banner
- ✅ Call-to-action buttons
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Automatic fallback gradient if image not found

## Testing

1. Add your image to `public/banner.jpg`
2. Refresh your browser
3. Check different screen sizes (mobile, tablet, desktop)
4. Adjust overlay opacity if needed

## Troubleshooting

**Image not showing?**
- Check file name is exactly `banner.jpg`, `banner.png`, or `banner.webp`
- Check file is in the `public` folder (not `public/images`)
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for 404 errors

**Text not readable?**
- Increase overlay opacity (see above)
- Make sure your banner image isn't too bright/light
- Adjust text shadow in the component

**Image too large/slow loading?**
- Compress the image (use TinyPNG or similar)
- Convert to WebP format
- Reduce dimensions if over 2000px wide
