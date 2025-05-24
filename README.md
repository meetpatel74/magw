# Municipal Art Gallery of Westfield (MAGW)

A modern web-based information system for the Municipal Art Gallery of Westfield, designed to enhance visitor experience, streamline administration, and strengthen the gallery's digital presence.

## Table of Contents

- [Project Overview](#project-overview)
- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Default Users](#default-users)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Dashboard Features](#dashboard-features)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

=
## Project Overview

This system integrates exhibition management, ticketing, collection browsing, and administrative tools into a cohesive platform for all stakeholders.

### Core Features

- **Exhibition Discovery & Ticketing:** Browse exhibitions and purchase tickets online.
- **Collection Management:** Search and explore the gallery's permanent collection.
- **Admin Dashboard:** Manage exhibitions, programs, and content.
- **Program Registration:** Register for educational programs and events.
- **User Authentication:** Secure login with role-based access.

## Monorepo Structure

This repository uses npm workspaces to manage both the Next.js frontend and Express backend.

```
magw/
├── apps/
│   ├── web/        # Next.js frontend
│   └── api/        # Express backend
├── packages/
│   └── shared/     # Shared code (utilities, types, etc.)
├── node_modules/
├── package.json    # Root config (workspaces)
└── ... (config files)
```

## Tech Stack

- **Frontend:** React.js (Next.js)
- **Styling:** Tailwind CSS
- **Backend:** Node.js (Express)
- **Database:** JSON (dev), PostgreSQL (planned)
- **Authentication:** JWT, bcrypt

## Getting Started

### Prerequisites

- Node.js (v18.18.0+)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/meetpatel74/magw.git
   cd magw
   ```

2. **Install all dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables for the backend:**
   - Create a `.env` file in `apps/api/server/`:
     ```
     PORT=3001
     JWT_SECRET=your_secret_key
     NODE_ENV=development
     ```

### Running the Application

- **Start both frontend and backend:**

  ```sh
  npm run dev
  ```

  - Frontend: [http://localhost:3000](http://localhost:3000)
  - API: [http://localhost:3001](http://localhost:3001)

- **Run only frontend:**

  ```sh
  npm run dev:web
  ```

- **Run only backend:**
  ```sh
  npm run dev:api
  ```

## API Documentation

The API follows RESTful conventions. Main endpoints include:

- **Authentication:** `/api/v1/auth/register`, `/api/v1/auth/login`
- **Exhibitions:** `/api/v1/exhibitions`, `/api/v1/exhibitions/:id`
- **Artworks:** `/api/v1/artworks`, `/api/v1/artworks/:id`

See the OpenAPI spec (`api-contract.yaml`) for full details.

## Testing

- Import `MAGW_API.postman_collection.json` into Postman.
- Set up a `token` environment variable for JWT.
- Run the collection to verify API functionality.

## Dashboard Features

- **Metrics:** Monthly records, user distribution (mock data).
- **Charts:** Bar and pie charts via Chart.js (`react-chartjs-2`).
- **CSV Export:** Download chart data as CSV.
- **Note:** All dashboard data is currently mock/demo data.

---

## Future Enhancements

- PostgreSQL integration
- Image uploads for exhibitions/artworks
- Ticket purchasing system
- Event management
- Enhanced admin analytics
- User profiles and favorites

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit and push your changes
4. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- UI/UX inspired by best practices in museum digital experiences.