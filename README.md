# Municipal Art Gallery of Westfield (MAGW)

A comprehensive web-based information system for the Municipal Art Gallery of Westfield, designed to improve visitor experience, streamline administrative processes, and enhance the gallery's digital presence.

## Project Overview

This project implements a modern, responsive web application for the Municipal Art Gallery of Westfield, addressing key information management needs across all stakeholders. The system integrates exhibition management, ticketing, collection browsing, and administrative tools in a cohesive platform.

### Core Features

- **Exhibition Discovery and Ticketing**: Browse current and upcoming exhibitions, view details, and purchase tickets online
- **Collection Management**: Search and explore the gallery's permanent collection
- **Administrative Dashboard**: Tools for curators, educators, and staff to manage exhibitions, programs, and content
- **Program Registration**: Online registration and management for educational programs and events

## Tech Stack

- **Frontend**: React.js with Next.js framework
- **Styling**: Tailwind CSS
- **Backend**: Node.js (planned for future implementation)
- **Database**: PostgreSQL (planned for future implementation)

## Project Structure

```
magw/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app routes
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Generic components (buttons, forms, etc.)
│   │   └── layout/      # Layout components (navbar, footer, etc.)
│   └── data/            # Mock data (to be replaced with API)
├── .gitignore           # Git ignore file
├── jsconfig.json        # JavaScript configuration
├── next.config.mjs      # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.mjs   # PostCSS configuration
└── tailwind.config.js   # Tailwind CSS configuration
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

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## User Flows

The application currently implements several key user flows:

### 1. Exhibition Discovery and Ticketing (Visitor)
- Browse current and upcoming exhibitions
- View detailed exhibition information
- Select date and time for visit
- Purchase tickets online
- Receive digital tickets

### 2. Exhibition Planning (Curator)
- Create and manage exhibitions
- Select artworks from the collection
- Organize exhibition layout
- Collaborate with team members

### 3. Program Management (Education Coordinator)
- Create educational programs
- Manage registrations
- Track attendance
- Collect feedback

## Component Architecture

The application follows a modular component architecture:

- **Layout Components**: Provide structure for different sections
- **Common Components**: Reusable UI elements like buttons, forms, cards
- **Page Components**: Content specific to each route
- **Navigation Components**: Navbar and footer for user navigation

## Development Roadmap

### Phase 1: Foundation (Current)
- Core UI components
- Exhibition browsing functionality
- User interface prototypes

### Phase 2: Public Engagement (Next)
- Online ticketing system
- Membership management
- Program registration

### Phase 3: Advanced Operations (Future)
- Exhibition planning tools
- Donor management
- Financial integration


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
