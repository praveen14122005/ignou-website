# Banner Image Setup

To use your custom banner image on the homepage:

1. Place your banner image in the `public` folder
2. Name it either:
   - `banner.jpg` (recommended)
   - `banner.png`

3. The banner will automatically appear on the homepage hero section

**Recommended Image Specifications:**
- Format: JPG or PNG
- Dimensions: 1920x500px or larger (will be cropped/resized automatically)
- File size: Under 500KB for best performance

**Current Setup:**
- The homepage hero section will use `/banner.jpg` or `/banner.png` if available
- If no banner image is found, a blue gradient background will be shown as fallback
- An overlay with adjustable transparency (75% opacity) is applied for better text readability

**To adjust transparency:**
Edit `app/page.tsx` and modify the overlay opacity values:
- `from-blue-900/75` - top opacity (currently 75%)
- `via-blue-800/65` - middle opacity (currently 65%)
- `to-blue-900/75` - bottom opacity (currently 75%)

Lower values (e.g., `/50`) = more transparent, banner more visible
Higher values (e.g., `/90`) = less transparent, text more readable
