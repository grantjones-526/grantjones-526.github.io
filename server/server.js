const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Get projects (for now, returns static data)
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Interactive portfolio showcasing my CS projects',
      techStack: ['React', 'Node.js', 'Express'],
      githubUrl: 'https://github.com/grantjones-526/grantjones-526.github.io',
      liveUrl: '',
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
