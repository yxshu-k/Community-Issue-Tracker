# Community Issue Tracker

A full-stack MERN application for citizens to report local issues and track their resolution by authorities.

## Features

- User registration and authentication (Citizens and Authorities)
- Issue reporting with categories (potholes, garbage, streetlights, water leaks, etc.)
- Real-time issue tracking and status updates
- Dashboard for authorities to manage issues
- Responsive design with modern UI/UX

## Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS
- Axios for API calls
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yxshu-k/Community-Issue-Tracker.git
cd community-issue-tracker
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Set up environment variables

Create `.env` file in server directory:
```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

5. Start MongoDB (if running locally)

6. Start the backend server
```bash
cd server
npm run dev
```

7. Start the frontend (in new terminal)
```bash
cd client
npm run dev
```

The app will be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Backend (Render)
1. Create new Web Service on Render
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Issues
- GET /api/issues (all issues)
- POST /api/issues (create issue - protected)
- GET /api/issues/myissues (user's issues - protected)
- GET /api/issues/:id (single issue)
- PUT /api/issues/:id (update status - protected, authorities only)
- DELETE /api/issues/:id (delete issue - protected)

## Usage

1. Register as a citizen or authority
2. Citizens can report issues and track their status
3. Authorities can view all issues and update statuses
4. Use the dashboard to manage community issues

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License