# Grant Jones - Portfolio Website

A modern, interactive portfolio website featuring a sci-fi terminal aesthetic. Built with React and Node.js to showcase my computer science projects, skills, and experience.

## 🚀 Features

- **Sci-Fi Terminal Design**: Moody blacks and greys with vibrant terminal green, purple, and brown accents
- **Project Showcase**: Display featured projects and automatically fetch GitHub repositories
- **GitHub Integration**: Real-time integration with GitHub API to display repositories
- **Contact Form**: Functional contact form with validation
- **Responsive Design**: Mobile-first approach that works on all devices
- **Smooth Animations**: Terminal-style typing effects and smooth transitions

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Axios** - GitHub API integration
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
grantjones-526.github.io/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProjectCard.js
│   │   │   └── ContactForm.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── Projects.js
│   │   │   ├── About.js
│   │   │   └── Contact.js
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── styles/        # CSS files
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── server.js          # Express server
│   ├── .env               # Environment variables
│   ├── .gitignore
│   └── package.json
├── .gitignore
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/grantjones-526/grantjones-526.github.io.git
   cd grantjones-526.github.io
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   ```
   PORT=5000
   GITHUB_USERNAME=grantjones-526
   ```

### Running the Application

You need to run both the backend and frontend servers:

1. **Start the backend server** (from the `server` directory):
   ```bash
   cd server
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend** (from the `client` directory):
   ```bash
   cd client
   npm start
   ```
   Frontend will run on `http://localhost:3000`

The React app will automatically proxy API requests to the backend server.

## 🎨 Color Scheme

The website uses a custom sci-fi terminal color palette:

- **Backgrounds**: Deep blacks (#0a0a0a, #121212) and moody greys
- **Primary Accent (Terminal Green)**: #00ff41 - Used for headings, accents, and interactive elements
- **Secondary Accent (Purple)**: #b388ff, #9c27b0 - For subheadings and links
- **Tertiary Accent (Orange/Brown)**: #d4a574, #ff9800 - For highlights and warnings
- **Text**: Light greys (#e0e0e0, #b0b0b0) for body content

## 📦 API Endpoints

### Backend API

- `GET /api` - Health check
- `GET /api/projects` - Get featured projects
- `GET /api/github/repos` - Fetch GitHub repositories
- `POST /api/contact` - Submit contact form

## 🌐 Deployment

### GitHub Pages (Frontend)

1. Update `package.json` in the client folder to add homepage:
   ```json
   "homepage": "https://grantjones-526.github.io"
   ```

2. Build and deploy:
   ```bash
   cd client
   npm run build
   # Deploy the build folder to GitHub Pages
   ```

### Backend Deployment

The backend needs to be deployed separately. Recommended platforms:
- **Vercel** - Easy Node.js deployment
- **Railway** - Free tier for small projects
- **Render** - Free tier with persistent storage
- **Heroku** - Popular platform-as-a-service

Update the API base URL in `client/src/services/api.js` to point to your deployed backend.

## 🔧 Customization

### Update Personal Information

1. **Contact Information**: Edit `client/src/pages/Contact.js`
2. **About Page**: Edit `client/src/pages/About.js`
3. **Projects**: Edit `server/server.js` - Update the projects array
4. **GitHub Username**: Edit `server/.env`

### Modify Colors

Edit CSS variables in `client/src/styles/App.css`:
```css
:root {
  --accent-green: #00ff41;
  --accent-purple: #b388ff;
  /* ... other colors */
}
```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

Grant Jones
- Email: grantjones526@outlook.com
- LinkedIn: [linkedin.com/in/grant-jones-cs](https://linkedin.com/in/grant-jones-cs)
- GitHub: [github.com/grantjones-526](https://github.com/grantjones-526)

---

**Built with ❤️ and lots of ☕ by Grant Jones**