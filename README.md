# Netclips

A Netflix-style movie browser built with React. It pulls live movie lists from The Movie Database (TMDB), lets you sign up and log in with Firebase Authentication, and saves your favourite titles to your account in Cloud Firestore.

## Features
- Home page with a featured movie and scrolling rows: Popular, Top Rated, Trending, Horror, Upcoming
- Sign up, log in and log out (Firebase Auth); the account page is behind a protected route
- Like a movie to save it to your list (Firestore), and remove it from the account page
- Responsive layout with Tailwind CSS

## Tech stack
React 18 · React Router 6 · Tailwind CSS 3 · Firebase 10 (Auth, Firestore) · Axios · TMDB API · Create React App

## Project layout
```
src/
  Requests.js        TMDB endpoints and auth header
  firebase.js        Firebase app, auth and Firestore setup
  context/           AuthContext (current user, sign up / log in / log out)
  pages/             Home, Login, Signup, Account
  components/        Navbar, Main (featured movie), Row, Movie, SavedShows, ProtectedRoute
```

## Run it locally
1. Install Node 18+ and Yarn.
2. `yarn install`
3. Copy `.env.example` to `.env.local` and fill in:
   - a TMDB API Read Access Token (themoviedb.org > Settings > API)
   - your Firebase web app config (enable Email/Password sign-in and Firestore)
4. `yarn start` and open http://localhost:3000

`yarn build` makes a production build in `build/`.

## Notes
Keys belong in `.env.local`, which git ignores; never commit them.
