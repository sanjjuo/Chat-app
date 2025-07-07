# ChatNX

A real-time chat application built with [Next.js](https://nextjs.org), [Firebase](https://firebase.google.com/), [Socket.IO](https://socket.io/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- Real-time messaging with Socket.IO
- User authentication and registration (Firebase Auth)
- User profiles with avatars and descriptions
- Persistent chat history (Firestore)
- Responsive UI with Tailwind CSS
- Avatar selection and profile updates
- Modern UI components (Radix UI, Lucide icons)
- Media sharing (UI only)
- Toast notifications

## Project Structure

```
client/   # Next.js frontend (TypeScript, Tailwind CSS)
  app/    # Next.js app directory
  components/ # Reusable UI and feature components
  hooks/      # Custom React hooks
  lib/        # Utilities and socket connection
  types/      # TypeScript types
  public/     # Static assets
server/   # Express + Socket.IO backend (Node.js)
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/chatnx.git
cd chatnx
```

### 2. Setup Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable **Authentication** (Email/Password)
- Create a **Firestore Database**
- In the `client/.env` file, add your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 3. Install dependencies

```sh
cd client
npm install
cd ../server
npm install
```

### 4. Start the backend server

```sh
cd server
npm run dev
# Server runs on http://localhost:5001
```

### 5. Start the frontend

```sh
cd ../client
npm run dev
# Frontend runs on http://localhost:3000
```

### 6. Open in browser

Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Firebase (Auth, Firestore)](https://firebase.google.com/)
- [Socket.IO](https://socket.io/)
- [Express](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)

## License

MIT

---

**Note:** This project is for learning and demonstration purposes.
