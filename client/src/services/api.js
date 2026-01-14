// GitHub API - no backend needed

const GITHUB_USERNAME = 'grantjones-526';

// Add repo names here to exclude them from the portfolio
const EXCLUDED_REPOS = [
  'grantjones-526.github.io',
];

export const getGitHubRepos = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch repos');
    }
    const repos = await response.json();
    return repos.filter(repo =>
      !repo.fork && !EXCLUDED_REPOS.includes(repo.name)
    );
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw error;
  }
};

// Featured projects - hardcoded since no backend
export const getProjects = async () => {
  return [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Personal portfolio with terminal-style UI built with React',
      techStack: ['React', 'Node.js', 'CSS'],
      githubUrl: 'https://github.com/grantjones-526/grantjones-526.github.io',
      status: 'Active',
    },
  ];
};
