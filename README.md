# Zoya Belle E-commerce Platform
Admin: admin@zoyabelle.com.au / Admin@123
Customer: testuser@zoya.com / Test@123

A full-stack, elegant e-commerce website for Zoya Belle, an Australian beauty and fashion brand.

## Features

### Frontend (Customer Website)
- **Hero Section**: Full-width lifestyle image with "BEYOND SHOPPING, IT'S A LIFESTYLE" headline
- **Featured Collections**: New Arrivals, Best Sellers, Nazish's Picks
- **Product Catalog**: Grid layout with filters (category, price), sale badges
- **Shopping Cart**: Add/remove items, quantity management, persistent storage
- **User Authentication**: Sign up/sign in with secure authentication
- **Checkout System**: Multi-step checkout with Stripe and PayPal integration
- **Reviews System**: Customer reviews with star ratings
- **WhatsApp Integration**: Direct chat button (+61411632317)
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Backend & Database
- **Supabase Backend**: PostgreSQL database with Row Level Security
- **Product Management**: Products, categories, images, discounts
- **Order System**: Complete order processing and tracking
- **User Management**: Customer and admin accounts
- **Review System**: Product reviews with moderation
- **Store Information**: Configurable store details

### Payment Integration
- **Stripe**: Credit card payments with secure processing
- **PayPal**: PayPal payment integration
- **Multi-currency**: Support for AUD (Australian Dollar)
- **Order Management**: Complete order tracking and status updates

### Admin Dashboard
- **Product Management**: Add/edit/delete products, manage images and discounts
- **Order Management**: View and update order status
- **Review Moderation**: Approve/reject customer reviews
- **Store Settings**: Update contact information and store details
- **User Management**: Admin and customer account management

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Payments**: Stripe, PayPal
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account
- Stripe account (for payments)
- PayPal developer account (for PayPal payments)

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL Database**
   - Create a PostgreSQL database on your cPanel hosting
   - Run the database schema in `database/schema.sql`
   - Note down your database connection details

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```
   VITE_DB_HOST=your_cpanel_host
   VITE_DB_PORT=5432
   VITE_DB_NAME=your_database_name
   VITE_DB_USER=your_username
   VITE_DB_PASSWORD=your_password
   VITE_DB_SSL=true
   VITE_JWT_SECRET=your_jwt_secret_key_min_32_characters
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Set up Payment Processing**
   - Configure Stripe webhooks if needed
   - Set up PayPal developer account

5. **Start development server**
   ```bash
   npm run dev
   ```

## Demo Accounts

### Admin Account
- **Email**: admin@zoyabelle.com.au
- **Password**: Admin@123

### Customer Account  
- **Email**: testuser@zoya.com
- **Password**: Test@123

## Payment Testing

### Stripe Test Cards
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- Use any future expiry date and any 3-digit CVC

### PayPal
- Use PayPal sandbox credentials for testing

## Database Schema

### Core Tables
- **products**: Product information, pricing, inventory
- **categories**: Product categories and organization
- **product_images**: Product image management
- **orders**: Customer orders and status tracking
- **order_items**: Individual items within orders
- **profiles**: User profiles and admin permissions
- **reviews**: Product reviews and ratings
- **store_info**: Store contact and business information
- **homepage_content**: CMS content for homepage

### Security
- JWT-based authentication system
- Bcrypt password hashing
- Database connection security with SSL
- Input validation and sanitization

## Deployment

### Frontend Deployment
The application can be deployed to any static hosting service:
- Netlify
- Vercel  
- AWS S3 + CloudFront
- GitHub Pages

### Backend
- PostgreSQL database hosted on cPanel
- JWT-based authentication
- RESTful API pattern with direct database queries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email hello@zoyabelle.com.au or contact us through WhatsApp at +61411632317.