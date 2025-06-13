# NextStore

NextStore is a modern e-commerce application built with Next.js, TypeScript, and Prisma. It provides a seamless shopping experience with features like product browsing, cart management, order placement, and user authentication. The application also includes an admin dashboard for managing products, orders, and users.

## Features

- **Product Management**: Browse products, view details, and add items to the cart.
- **Cart and Checkout**: Manage cart items, select shipping addresses, choose payment methods, and place orders.
- **User Authentication**: Sign up, sign in, and manage user profiles.
- **Admin Dashboard**: Manage products, view orders, and handle user accounts.
- **Payment Integration**: Support for PayPal, Stripe, and Cash on Delivery.
- **Email Notifications**: Send purchase receipts using React Email and Resend.
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly interface.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Prisma, Neon Database (Serverless PostgreSQL)
- **Authentication**: NextAuth with credentials provider
- **Payments**: PayPal, Stripe
- **Emails**: React Email, Resend
- **Testing**: Jest
- **Deployment**: Configurable for various platforms

## Project Structure

- **`app/`**: Contains the main application routes and pages.
  - **`(root)/`**: Public routes like homepage, cart, and product pages.
  - **`(auth)/`**: Authentication routes for sign-in and sign-up.
  - **`admin/`**: Admin dashboard routes for managing the store.
  - **`user/`**: User-specific routes like profile and order history.
- **`components/`**: Reusable UI components.
- **`db/`**: Database-related files, including Prisma schema and seed data.
- **`email/`**: Email templates and sending logic.
- **`hooks/`**: Custom React hooks.
- **`lib/`**: Utility functions, constants, and action files.
- **`prisma/`**: Prisma migrations and schema.
- **`tests/`**: Unit tests for the application.
- **`types/`**: TypeScript type definitions.

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/nohahakim/nextstore.git
   cd nextstore
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL="your-neon-database-url"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_URL_INTERNAL="http://localhost:3000"
   PAYPAL_CLIENT_ID="your-paypal-client-id"
   PAYPAL_APP_SECRET="your-paypal-app-secret"
   UPLOADTHING_TOKEN="your-uploadthing-token"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APPID="your-uploadthing-appid"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   RESEND_API_KEY="your-resend-api-key"
   SENDER_EMAIL="your-sender-email"
   ```

   **Note**: You need to set up accounts with Neon, PayPal, Stripe, UploadThing, and Resend to obtain the necessary credentials.

4. **Run Database Migrations**:

   ```bash
   npx prisma migrate dev
   ```

5. **Seed the Database** (Optional):
   To populate the database with sample data, run:

   ```bash
   npx prisma db seed
   ```

6. **Start the Development Server**:

   ```bash
   npm run dev
   ```

7. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Authentication

NextStore uses NextAuth for authentication. Users can sign up and sign in using email and password. The authentication flow is handled by the credentials provider.

## Payment Integrations

- **PayPal**: Integrated using the PayPal JavaScript SDK.
- **Stripe**: Integrated using Stripe.js and React Stripe.
- **Cash on Delivery**: Allows users to pay upon delivery.

## Email Notifications

Purchase receipts are sent to users via email using React Email for templating and Resend for email delivery.

## Testing

Unit tests are written using Jest. To run the tests, use:

```bash
npm run test
```

## Deployment

The application can be deployed to various platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

## License

This project is licensed under the MIT License.

---

For more information, refer to the [Next.js documentation](https://nextjs.org/docs), [Prisma documentation](https://www.prisma.io/docs), and [Shadcn UI documentation](https://ui.shadcn.com/docs).
