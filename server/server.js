const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
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
      githubUrl: 'https://github.com/grantjones-526/Machine-Learning-Web-Platform',
      liveUrl: '',
      image: ''
    },
    {
      id: 2,
      title: 'Golf Club Recommendation App',
      description: 'Web application that registers golf shots and recommends clubs based on environmental factors. Implements K-Nearest Neighbor algorithm to accurately predict which club to use based on weighted variables (Distance, Lie, Fade/Draw).',
      techStack: ['Python', 'Django', 'PostgreSQL', 'Scikit-Learn', 'K-NN'],
      githubUrl: 'https://github.com/grantjones-526/Ai-Caddy',
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

    const excludedRepos = ['grantjones-526.github.io', 'Ai-Caddy', 'Machine-Learning-Web-Platform'];
    const inProgressRepos = ['GymBros'];

    const repos = response.data
      .filter(repo => !excludedRepos.includes(repo.name))
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        status: inProgressRepos.includes(repo.name) ? 'In Progress' : null
      }));

    res.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
});

// Email transporter for Outlook
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    console.log('Contact email sent successfully from:', email);
    res.json({ success: true, message: 'Message sent! I\'ll get back to you soon.' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
