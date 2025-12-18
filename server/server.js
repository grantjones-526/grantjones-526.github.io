const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Configure CORS for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://grantjones-526.github.io'
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Get projects (featured projects from resume)
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'AI Model Interface',
      description: 'Web interface utilizing multiple machine learning algorithms including linear regression, decision trees, bagging, boosting, random forests, support vector machines, and deep neural networks. Users can upload data and evaluate models using metrics such as accuracy, precision, recall, and ROC curves.',
      techStack: ['Python', 'Django', 'Scikit-Learn', 'Pandas', 'Machine Learning'],
      githubUrl: '',
      liveUrl: '',
      image: ''
    },
    {
      id: 2,
      title: 'Golf Club Recommendation App',
      description: 'Web application that registers golf shots and recommends clubs based on environmental factors. Implements K-Nearest Neighbor algorithm to accurately predict which club to use based on weighted variables (Distance, Lie, Fade/Draw).',
      techStack: ['Python', 'Django', 'PostgreSQL', 'Scikit-Learn', 'K-NN'],
      githubUrl: '',
      liveUrl: '',
      image: ''
    },
    {
      id: 3,
      title: 'LLM Interface',
      description: 'Custom LLM interface allowing users to upload any file type or website as context. Features custom CSS terminal-style design and detects client-side GPU availability to determine whether to use lighter or more robust models for efficiency.',
      techStack: ['Python', 'React', 'SQLite', 'Ollama', 'LLM'],
      githubUrl: '',
      liveUrl: '',
      image: ''
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Interactive portfolio showcasing CS projects with sci-fi terminal aesthetic. Built with React frontend and Node.js backend, featuring project showcase, GitHub integration, and contact form.',
      techStack: ['React', 'Node.js', 'Express', 'CSS'],
      githubUrl: 'https://github.com/grantjones-526/grantjones-526.github.io',
      liveUrl: 'https://grantjones-526.github.io',
      image: ''
    }
  ];
  res.json(projects);
});

// Get GitHub repositories
app.get('/api/github/repos', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || 'grantjones-526';
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 10
      }
    });

    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at
    }));

    res.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // TODO: Implement email sending logic (e.g., using nodemailer)
  console.log('Contact form submission:', { name, email, message });

  res.json({ success: true, message: 'Message received! I\'ll get back to you soon.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
