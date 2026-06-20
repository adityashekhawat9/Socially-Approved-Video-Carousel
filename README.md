# Socially Approved Video Carousel

A MERN stack video carousel inspired by the "Socially Approved" section on driptrip.in. The app fetches video metadata from the backend, shows a responsive dashboard grid, and opens an interactive modal carousel with optimized video playback.

## Features

- Storefront-style horizontal "Socially Approved" carousel with 40+ backend-driven videos.
- Click any card to open the inner video carousel modal.
- Inner carousel supports horizontal scroll, arrow buttons, keyboard arrows, swipe, and dots.
- Only nearby videos mount active players; far-away videos stay as lightweight placeholders.
- Videos pause when out of view and autoplay muted when active.
- Custom video controls: play, pause, mute, volume, fullscreen, progress, and seek.
- Like/unlike with real-time count updates.
- Share tracking with copy link and social platform options.
- Dummy short video clips for fast local testing.
- MongoDB-backed video, like, and share data.

## Tech Stack

- Frontend: React 18, Axios, React Icons, CSS
- Backend: Node.js, Express, Mongoose, CORS
- Database: MongoDB

## Project Structure

```txt
Corusel vedio Assignment/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/api.js
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── server/
│   ├── config/db.js
│   ├── data/videos.json
│   ├── models/
│   ├── routes/
│   ├── scripts/seedDatabase.js
│   ├── .env
│   └── package.json
├── package.json
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB Community installed locally, or a MongoDB Atlas URI
- Homebrew if using the macOS MongoDB commands below

## Environment

Frontend: `client/.env`

```env
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_ENV=development
```

Backend: `server/.env`

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/carousel-videos
```

## Setup

Install all dependencies:

```bash
npm run install:all
```

Start MongoDB:

```bash
brew services start mongodb-community
```

Seed or refresh the database:

```bash
npm run seed
```

Start frontend and backend together:

```bash
npm start
```

Open the app:

```txt
http://localhost:3000
```

Backend API:

```txt
http://localhost:5001/api
```

Health check:

```txt
http://localhost:5001/api/health
```

## Common Commands

Run both apps:

```bash
npm start
```

Run backend only:

```bash
npm run server
```

Run frontend only:

```bash
npm run client
```

Build frontend:

```bash
npm run build
```

Stop project ports on macOS:

```bash
for port in 3000 5001; do
  pid=$(lsof -tiTCP:$port -sTCP:LISTEN)
  [ -n "$pid" ] && kill $pid
done

brew services stop mongodb-community
```

## API Endpoints

Videos:

```txt
GET /api/videos
GET /api/videos/:id
GET /api/videos/paginated?page=1&limit=10
```

Likes:

```txt
POST /api/like
GET  /api/like/:videoId
```

Example like body:

```json
{
  "videoId": "mongo-video-id"
}
```

Shares:

```txt
POST /api/share
GET  /api/share/:videoId
```

Example share body:

```json
{
  "videoId": "mongo-video-id",
  "platform": "copy_link"
}
```

Health:

```txt
GET /api/health
```

## Performance Notes

- Outer carousel uses horizontal snap scrolling and compact reel-style cards.
- Dashboard cards use lazy image loading and async image decoding.
- Inner carousel keeps the scrollable list available but only mounts real video players near the active item.
- Far-away modal items render as lightweight thumbnail placeholders.
- Scroll updates are throttled with `requestAnimationFrame`.
- Video resources are loaded only when needed and paused when out of view.

## Troubleshooting

If the browser shows a CORS/network error for `localhost:5001`, the backend is probably not running.

Check ports:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
lsof -nP -iTCP:5001 -sTCP:LISTEN
lsof -nP -iTCP:27017 -sTCP:LISTEN
```

Start MongoDB and backend:

```bash
brew services start mongodb-community
npm run server
```

If videos do not appear, seed the database:

```bash
npm run seed
```

If thumbnails appear blank, refresh the database or restart the backend. The current dummy data uses inline SVG thumbnails and short test clips.

## Notes

- The sample videos are intentionally short test clips for smoother local testing.
- The project directory name contains spaces, so wrap paths in quotes when using `cd`.
- Main frontend file: `client/src/App.js`
- Main backend file: `server/index.js`
