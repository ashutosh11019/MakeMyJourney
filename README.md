# AI Travel Planner

A web application that helps users plan their trips using generative AI. Users can input their destination, duration, budget, number of travelers, and preferred theme to get a customized travel itinerary, including hotel suggestions.

## Features

*   Personalized trip planning using Google's Generative AI.
*   Google Places Autocomplete for easy location selection.
*   User authentication with Google OAuth.
*   Save and view planned trips.
*   Interactive UI to select trip preferences.
*   Modern and responsive design.

## Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS
*   **Routing:** React Router
*   **UI Components:** Radix UI, Sonner (for notifications)
*   **AI:** Google Generative AI
*   **Authentication:** Google OAuth
*   **Database:** Firebase Firestore
*   **APIs:** Google Places API

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn)
*   Firebase account and a new project created.
*   Google Cloud Platform project with the following APIs enabled:
    *   Google Places API
    *   Google Maps JavaScript API
    *   Generative Language API

### Installation

1.  Clone the repository: `git clone <repository-url>`
2.  Navigate to the project directory: `cd ai-travel-planner-web-main`
3.  Install dependencies: `npm install`

### Configuration

Create a `.env` file in the root of the project and add the following environment variables:

```
VITE_GOOGLE_PLACES_API_KEY=<YOUR_GOOGLE_PLACES_API_KEY>
VITE_GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
VITE_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
VITE_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
VITE_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
VITE_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
VITE_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
```

### Running the application

```bash
npm run dev
```

## Available Scripts

*   `npm run dev`: Runs the application in development mode.
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Lints the code using ESLint.
*   `npm run preview`: Previews the production build locally.