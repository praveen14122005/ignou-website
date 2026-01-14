# Setup Guide for IGNOU With Us

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```
   JWT_SECRET=your-secret-key-change-in-production-use-a-long-random-string
   ADMIN_EMAIL=admin@ignouwithus.com
   ADMIN_PASSWORD=your-secure-password-here
   ADMIN_NAME=Admin User
   ```

3. **Initialize Admin User**
   ```bash
   npm run init-admin
   ```
   
   This will create an admin user with the credentials from your `.env.local` file.
   If you don't have a `.env.local` file, it will use default credentials:
   - Email: `admin@ignouwithus.com`
   - Password: `admin123`
   
   ⚠️ **Important**: Change the default password after first login!

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin
   - Admin Login: http://localhost:3000/admin/login

## First Steps

1. **Login as Admin**
   - Go to http://localhost:3000/admin/login
   - Use the admin credentials you set up

2. **Upload Your First PDF**
   - Navigate to the admin dashboard
   - Click "Upload PDF"
   - Fill in the form:
     - Select a PDF file
     - Enter Subject Code (e.g., BHDE-144)
     - Enter Subject Name
     - Select Course and Content Type
     - Set Session
     - Choose Free or Paid
   - Click "Upload PDF"

3. **Test the Student Experience**
   - Go to the homepage
   - Search for the subject code you just uploaded
   - View the subject page
   - Download the PDF (if free) or purchase it (if paid)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── admin/         # Admin API endpoints
│   │   ├── auth/          # Authentication endpoints
│   │   └── search/        # Search endpoint
│   ├── admin/             # Admin dashboard pages
│   ├── course/            # Course listing pages
│   ├── subject/           # Subject detail pages
│   └── search/            # Search page
├── components/            # React components
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication helpers
│   ├── db.ts             # Database operations
│   └── utils.ts          # General utilities
├── public/               # Static files
│   └── pdfs/             # Uploaded PDF files
├── data/                 # JSON database files
├── types/                # TypeScript type definitions
└── scripts/              # Setup scripts
```

## Database

The application uses JSON files for data storage (easily migratable to MongoDB/PostgreSQL):

- `data/users.json` - User accounts
- `data/pdfs.json` - PDF metadata
- `data/purchases.json` - Purchase records

## Features Implemented

✅ User authentication (login/register)
✅ Admin dashboard
✅ PDF upload and management
✅ Search by subject code
✅ Course and subject browsing
✅ Free and paid PDF support
✅ Download tracking
✅ Analytics dashboard

## Features Pending (Future Enhancements)

- Payment gateway integration (Razorpay/Stripe)
- PDF watermarking
- User purchase history
- Email notifications
- Advanced search filters
- PDF preview
- Bulk upload

## Production Deployment

Before deploying to production:

1. **Change JWT_SECRET** to a strong, random string
2. **Change admin credentials** to secure values
3. **Set up a proper database** (MongoDB/PostgreSQL recommended)
4. **Configure file storage** (AWS S3, Cloudinary, etc.)
5. **Set up payment gateway** (Razorpay/Stripe)
6. **Enable HTTPS**
7. **Set up environment variables** on your hosting platform
8. **Configure domain and DNS**

## Troubleshooting

### Admin user not created
- Make sure you've run `npm run init-admin`
- Check that the `data` directory exists
- Verify environment variables are set correctly

### PDFs not uploading
- Check that `public/pdfs` directory exists
- Verify file permissions
- Check file size limits (default: 50MB)

### Authentication issues
- Clear browser localStorage
- Verify JWT_SECRET is set
- Check that user exists in `data/users.json`

## Support

For issues or questions, please check the README.md file or create an issue in the repository.
