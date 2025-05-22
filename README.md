# Municipal Art Gallery of Westfield (MAGW)

A comprehensive web-based information system for the Municipal Art Gallery of Westfield, designed to improve visitor experience, streamline administrative processes, and enhance the gallery's digital presence.

## Project Overview

This project implements a modern, responsive web application for the Municipal Art Gallery of Westfield, addressing key information management needs across all stakeholders. The system integrates exhibition management, ticketing, collection browsing, and administrative tools in a cohesive platform.

### Core Features

- **Exhibition Discovery and Ticketing**: Browse current and upcoming exhibitions, view details, and purchase tickets online
- **Collection Management**: Search and explore the gallery's permanent collection
- **Administrative Dashboard**: Tools for curators, educators, and staff to manage exhibitions, programs, and content
- **Program Registration**: Online registration and management for educational programs and events
- **User Authentication**: Secure login and registration with role-based access control

## Tech Stack

- **Frontend**: React.js with Next.js framework
- **Styling**: Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: File-based JSON storage (for development, to be replaced with PostgreSQL in production)
- **Authentication**: JWT-based authentication with bcrypt password hashing

## Project Structure

```
magw/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app routes
│   │   ├── exhibitions/ # Exhibition-related pages
│   │   ├── login/       # Authentication pages
│   │   └── ...          # Other pages
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Generic components (buttons, forms, etc.)
│   │   └── layout/      # Layout components (navbar, footer, etc.)
│   ├── data/            # Mock data (to be replaced with API)
│   └── services/        # Frontend service layers
│       └── api.js       # API integration service
├── server/              # Backend API server
│   ├── data/            # JSON data files
│   ├── middleware/      # Express middleware
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── validation/      # Request validation
│   └── server.js        # Entry point
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18.18.0 or newer)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/magw.git
   cd magw
   ```

2. Install frontend dependencies:

   ```
   npm install
   # or
   yarn
   ```

3. Install backend dependencies:

   ```
   cd server
   npm install
   # or
   yarn
   ```

4. Create a `.env` file in the server directory:
   ```
   PORT=3001
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

### Running the Application

1. Start the backend server:

   ```
   cd server
   npm run dev
   # or
   yarn dev
   ```

2. In a separate terminal, start the frontend development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
   The API server will be running at [http://localhost:3001](http://localhost:3001).

### Default Users

The system comes with three default users for testing:

1. Admin:

   - Email: admin@magw.org
   - Password: password123

2. Staff:

   - Email: curator@magw.org
   - Password: password123

3. Visitor:
   - Email: visitor@example.com
   - Password: password123

## API Documentation

The API uses a RESTful design with the following main endpoints:

- **Authentication**:

  - POST /api/v1/auth/register - Register a new user
  - POST /api/v1/auth/login - Login and get JWT token

- **Exhibitions**:

  - GET /api/v1/exhibitions - Get all exhibitions
  - GET /api/v1/exhibitions/:id - Get exhibition by ID
  - POST /api/v1/exhibitions - Create a new exhibition (protected)
  - PUT /api/v1/exhibitions/:id - Update an exhibition (protected)
  - DELETE /api/v1/exhibitions/:id - Delete an exhibition (protected)

- **Artworks**:
  - GET /api/v1/artworks - Get all artworks
  - GET /api/v1/artworks/:id - Get artwork by ID
  - POST /api/v1/artworks - Create a new artwork (protected)
  - PUT /api/v1/artworks/:id - Update an artwork (protected)
  - DELETE /api/v1/artworks/:id - Delete an artwork (protected)

For full API documentation, see the OpenAPI specification in the `api-contract.yaml` file.

## Testing

You can test the API endpoints using the included Postman collection:

1. Import the `MAGW_API.postman_collection.json` file into Postman
2. Set up an environment with a `token` variable to store the JWT token after login
3. Run the collection tests to verify API functionality

## Future Enhancements

- Implement a PostgreSQL database for persistent storage
- Add image upload functionality for exhibitions and artworks
- Implement a ticket purchasing system
- Add event management features
- Enhance the admin dashboard with analytics and reporting
- Implement user profiles and favorites

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI/UX design inspired by best practices in museum digital experiences

## Dashboard Implementation

### Metrics Chosen

- **Monthly Records:** Shows the number of records per month (mock data).
- **User Distribution:** Shows the distribution of users by type (mock data).

### Chart Library

- **Chart.js** with **react-chartjs-2** wrapper for rendering bar and pie charts.

### Export Approach

- **CSV Export:** Clicking the 'Download CSV' button on the dashboard exports both chart datasets as a CSV file.

### Notes

- All data is currently mock data for demonstration.
- The dashboard is accessible from the main navigation.
