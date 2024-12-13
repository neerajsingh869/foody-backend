# 🍽️ Foodie Backend

The robust backend service powering [Foodie](https://foody-frontend-27vz.onrender.com/) app, a modern food ordering platform. Built with Node.js, Express, and MongoDB to handle restaurant management, orders, and user interactions.

## 🚀 Live Demo
- [Live Demo](https://foody-backend-n6qk.onrender.com/)

## 🌟 Core Features

- ### Authentication & User Management
  - Auth0 integration for secure authentication
  - User profile management

- ### Restaurant Management
  - CRUD operations for restaurants
  - Menu item management
  - Image upload with Cloudinary integration
  - Restaurant search and filtering

- ### Order Processing
  - Secure payment processing with Stripe
  - Order status management
  - Real-time order updates

- ### Security
  - JWT token validation
  - Input validation and sanitization
  - Secure environment configuration

## 🛠️ Tech Stack

- **Runtime & Framework**
  - Node.js
  - Express.js
  - TypeScript

- **Database**
  - MongoDB
  - Mongoose ODM

- **Authentication**
  - Auth0
  - JWT

- **Cloud Services**
  - Cloudinary (Image Management)
  - Stripe (Payments)

- **Development Tools**
  - nodemon
  - ESLint
  - Prettier

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/neerajsingh869/foody-backend.git
   cd foodie-backend
   ```

2. **Install dependencies**

    ```bash
    npm install
    ```
    
3. **Environment Setup**

    Go [here](#-environment-variables) for Envrironment setup
    
4. **Start development server**
    
    ```bash
    npm run dev
    ```

## 🔌 API Endpoints

- ### User Routes

    ```plaintext
    GET    /api/my/user            # Get current user
    POST   /api/my/user            # Create new user
    PUT    /api/my/user            # Update current user profile
    ```

- ### Restaurant Routes
  - For current user
    ```plaintext
    GET    /api/my/restaurant               # Get current user's restaurant
    POST   /api/my/restaurant               # Create current user's restaurant
    PUT    /api/my/restaurant               # Update current user's restaurant
    ```
  - General
    ```plaintext
    GET    /api/restaurant/:restaurantId    # Get specific restaurant
    GET    /api/restaurant/search/:city     # Get restaurants of specific city
    ```

-  ### Order Routes

  - For current user
    ```plaintext
    GET    /api/order                                # Get current user's orders
    GET    /api/my/restaurant/orders                 # Get all orders of current user's restaurant
    PATCH  /api/my/restaurant/order/:orderId/status  # Update order status of current user's restaurant
    ```

  - General
    ```plaintext
    POST   /api/order/checkout/webhook                   # Webhook for order payment status
    POST   /api/order/checkout/create-checkout-session   # Create checkout session for order payment
    ```

## 🔒 Environment Variables

  ```env
  MONGODB_CONNECTION_URL=your_mongodb_connection_url

  AUTH0_AUDIENCE=your_auth0_audience
  AUTH0_ISSUER_BASE_URL=your_auth0_issuer_base_url
  AUTH0_TOKEN_SIGNING_ALGORITHM=your_auth0_token_signing_algorithm

  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret

  STRIPE_API_KEY=your_stripe_api_key
  FRONTEND_URL=http://localhost:5173
  STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
  ```

## 🚀 Deployment

This backend is deployed on [Render](https://render.com/). For deployment:

1. Push your changes to GitHub
2. Connect your Render account to GitHub
3. Configure environment variables
4. Deploy!

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repo, develop, and make code changes.
2. Make sure that your commit messages clearly describe the changes.
3. Send a pull request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.