# VivahConnect - Matrimony Fullstack Template

A professional matrimony project template with:

- React + Tailwind user frontend
- React + Tailwind admin dashboard
- Node.js + Express + MongoDB backend
- JWT auth structure
- CRUD APIs for users, profiles, plans, stories, interests, notifications, reports
- Real image URLs from Unsplash
- Ready folder structure for deployment

## Apps

```bash
frontend/   # User website
admin/      # Admin panel
backend/    # Express API
```

## How to run backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## How to run frontend

```bash
cd frontend
npm install
npm run dev
```

## How to run admin

```bash
cd admin
npm install
npm run dev
```

## Demo login

Seed data is included in backend/src/data/demoData.js. For real login, connect MongoDB and run seed.

## What you mainly change

- Project name: `VivahConnect`
- Logo text in Navbar/Sidebar
- API URL in `.env`
- MongoDB URI in backend `.env`
- Image URLs in frontend/admin data files
- Contact details in Contact page

## Deployment

- Frontend/Admin: Vercel
- Backend: Render
- Database: MongoDB Atlas
