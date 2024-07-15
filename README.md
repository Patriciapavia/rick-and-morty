# Rick and Morty Character Browser

A web application to browse and search for Rick and Morty characters using React, Apollo Client, GraphQL,Vite, and Chakra UI.

## Features

- **View Characters:** See a list of Rick and Morty characters on the homepage.
- **Search Characters:** Search for characters by name.
- **Character Details:** Click on a character to view more detailed information, such as species, status (Alive, Dead, unknown), and episode appearances.
- **Responsive Design:** Accessible and usable on mobile devices as well as desktops.
- **Pagination:** Navigate through character pages with pagination controls.
- **Loading States:** Enhanced user experience with loading spinners during API calls.
- **Image Optimization:** Optimized image loading with lazy loading.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Setup and Installation

1. run `npm install` or `yarn install` to install the dependencies.
2. run `npm start` or `yarn start` to start the development server.
### Run tests

Run `npm test` or `yarn test` to run the tests.

### Project Structure

src/
├── assets/   
# Images and static assets
│   ├── logo.png
│   ├── react.svg
├── components/         # React components
│   ├── CharacterCard.tsx
│   ├── CharactersList.tsx
│   ├── SearchInput.tsx
│   ├── Spinner.tsx
├── pages/              # Page components
│   ├── CharacterDetail.tsx
│   ├── Home.tsx
├── apollo-client.tsx   # Apollo Client setup
├── App.tsx             # Main app component
├── main.tsx            # Entry point of the application
├── schemas.ts          # Zod schemas for data validation
├── vite-env.d.ts       # Vite environment definitions
└── index.html          # HTML template

### Key Components
- Home.tsx: Main component displaying the character list, search bar, and pagination controls.
- CharacterDetail.tsx: Component for displaying detailed character - - information.
- CharacterCard.tsx: Component for displaying individual character details in the list.
- Spinner.tsx: Custom spinner component for loading states using Chakra UI.
- CharactersList.tsx: Component for displaying the list of characters.
- SearchInput.tsx: Component for the search bar.
- schemas.ts: Zod schemas for validating GraphQL data.

### Usage

1 Viewing Characters:

- On the homepage, a list of characters is displayed.
- Scroll down to load more characters automatically.

2 Searching Characters:

- Use the search bar to filter characters by name.
- The character list updates automatically based on the search term.

3 Character Details:

- Click on a character to view detailed information, including species, status, and episodes.

### Assumptions and Decisions
- Data Validation: Zod schemas are used to validate the structure of the data received from the GraphQL API.
- Styling: Chakra UI is used for consistent and accessible styling.
- State Management: React's useState and useEffect hooks are used for managing state within components.
- Pagination: Pagination controls are implemented to navigate through character pages, showing 5 pages at a time.
- Loading States: Loading spinners are displayed during data fetching to enhance user experience.
- Image Optimization: Images are loaded lazily to improve performance.
- Testing: Vitest is used for unit testing components to ensure they function correctly.
