# IGNOU With Us

A comprehensive educational platform for IGNOU students providing Solved Assignments, Previous Year Question Papers (PYQs), Guess Papers, and Study Notes.

## Features

### Student Features
- 🔍 Search by Subject Code (e.g., BHDE-144, ECO-01)
- 📘 Access to Solved Assignments, PYQs, Guess Papers, and Study Notes
- 📂 Clear categorization by Course → Subject → Content Type → Session
- 📱 Mobile-friendly, fast-loading design
- 🔐 Free + Paid PDF access

### Admin Features
- 📤 Upload & manage PDFs
- 🏷️ Assign metadata (Course, Subject Code, Session, Content Type)
- 💰 Set Free / Paid pricing
- 👥 User management
- 📊 Analytics dashboard

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: JSON-based (easily migratable to MongoDB/PostgreSQL)
- **Authentication**: JWT-based
- **File Storage**: Local filesystem (migratable to S3/Cloudinary)

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Create a `.env.local` file:**
```
JWT_SECRET=your-very-long-random-secret-key-here
ADMIN_EMAIL=admin@ignouwithus.com
ADMIN_PASSWORD=your-secure-password-here
ADMIN_NAME=Admin User
```

3. **Initialize admin user:**
```bash
npm run init-admin
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

For detailed setup instructions, see [SETUP.md](./SETUP.md).

## Project Structure

```
├── app/              # Next.js app directory
│   ├── api/          # API routes
│   ├── admin/        # Admin dashboard pages
│   ├── subject/      # Subject detail pages
│   └── layout.tsx    # Root layout
├── components/       # React components
├── lib/              # Utilities and database helpers
├── public/           # Static files and PDFs
└── types/            # TypeScript type definitions
```

## Quick Start Guide

1. After installation, login to the admin dashboard at `/admin/login`
2. Upload your first PDF using the "Upload PDF" feature
3. Test the student experience by searching for the subject code
4. Browse courses and subjects to see the content organization

## Admin Features

- **Dashboard**: Overview with statistics and analytics
- **Upload PDFs**: Easy form-based PDF upload with metadata
- **Manage PDFs**: View, edit, and delete uploaded PDFs
- **Analytics**: Track downloads, revenue, and popular subjects

## Student Features

- **Search**: Quick search by subject code (e.g., BHDE-144)
- **Browse**: Navigate by course (BA, MA, BCA, etc.)
- **Subject Pages**: Organized view of all content for a subject
- **Download**: Free PDFs download instantly, paid PDFs require purchase
- **Mobile-Friendly**: Responsive design works on all devices

## Data Storage

Currently uses JSON files for simplicity:
- `data/users.json` - User accounts
- `data/pdfs.json` - PDF metadata
- `data/purchases.json` - Purchase records

This can be easily migrated to MongoDB, PostgreSQL, or any other database.

## Future Enhancements

- Payment gateway integration (Razorpay/Stripe)
- PDF watermarking for security
- User purchase history and downloads
- Email notifications
- Advanced search and filters
- PDF preview functionality
- Bulk upload feature

## License

MIT
