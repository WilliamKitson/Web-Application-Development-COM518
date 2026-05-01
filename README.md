# Points of Interest Web Application

A full-stack JavaScript web application for viewing and contributing points of interest by region. The app uses an Express backend, a React frontend served through Vite, Leaflet/OpenStreetMap for maps, and SQLite for persistent data.

## Features

- User login, logout, and registration API support
- Session storage backed by SQLite
- Region selector for browsing points of interest
- Interactive Leaflet map showing landmark markers
- Add new landmarks through a form or by clicking the map
- Recommend landmarks
- Submit text reviews for landmarks
- Basic XSS sanitisation on landmark data

## Tech Stack

- Node.js
- Express
- React
- Vite
- Vite Express
- Leaflet
- better-sqlite3
- express-session
- express-session-better-sqlite3
- bcrypt
- xss

## Project Structure

```text
.
├── app.mjs                         # Express app entry point
├── index.html                      # Vite HTML entry point
├── vite.config.mjs                 # Vite configuration
├── package.json                    # Dependencies and npm metadata
├── pointsofinterest.db             # Main SQLite application database
├── session.db                      # SQLite session store
├── controllers/
│   ├── authenticationController.mjs
│   └── landmarkController.mjs
├── dao/
│   ├── authenticationDao.mjs
│   └── landmarkDao.mjs
├── modules/
│   └── databaseModule.mjs
├── routes/
│   ├── authenticationRouter.mjs
│   └── landmarkRouter.mjs
└── src/
    ├── index.jsx
    └── components/
        ├── addLandmark.jsx
        ├── loginPage.jsx
        ├── mapScreen.jsx
        └── regionLandmarks.jsx
```

## Database

The application uses `pointsofinterest.db` as the main SQLite database. It contains these tables:

- `pointsofinterest`: landmark records, including name, type, country, region, longitude, latitude, description, and recommendation count
- `poi_users`: user accounts with usernames and hashed passwords
- `poi_reviews`: text reviews linked to points of interest

Sessions are stored separately in `session.db`.

## Installation

Install dependencies from the project root:

```bash
npm install
```

## Running the Application

Start the Express/Vite server:

```bash
node app.mjs
```

Then open:

```text
http://localhost:3000
```

The backend and frontend are served from the same server. The app redirects `/` to `/index.html`.

## Building the Frontend

The Vite build output is configured to use the `built/` directory:

```bash
npx vite build
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/authentication/register` | Register a new user |
| `POST` | `/authentication/login` | Log in with username and password |
| `GET` | `/authentication/user` | Return the current session user |
| `POST` | `/authentication/logout` | Log out the current user |

Example login body:

```json
{
  "username": "demo",
  "password": "password"
}
```

### Landmarks

Most landmark endpoints require an authenticated session.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/landmark/regions` | List available regions |
| `GET` | `/landmark/:region` | List landmarks for a region |
| `POST` | `/landmark/create` | Create a new landmark |
| `PUT` | `/landmark/recommend/:id` | Increment a landmark recommendation count |
| `POST` | `/landmark/review/:id` | Add a review for a landmark |

Example create-landmark body:

```json
{
  "name": "Example Landmark",
  "type": "Historic Site",
  "country": "United Kingdom",
  "region": "Hampshire",
  "lon": -1.404,
  "lat": 50.909,
  "description": "A short description of the landmark."
}
```

Example review body:

```json
{
  "review": "Worth visiting."
}
```

## Frontend Workflow

1. Log in with an existing account.
2. Choose a region from the region dropdown.
3. View landmarks in the table and on the map.
4. Click a recommendation button to increase a landmark's recommendation count.
5. Submit a review from a map marker popup.
6. Add a new landmark using the form or by clicking a location on the map.

## Notes

- The server listens on port `3000`.
- The main database path is configured in `modules/databaseModule.mjs`.
- The current `package.json` does not define a start script, so use `node app.mjs` directly.
- The default npm test script is a placeholder and does not run automated tests.
