import React from 'react';
import '../styles/About.css';

const About = () => {
  const skills = {
    languages: ['Python', 'Java', 'C++', 'SQL', 'Bash', 'HTML', 'CSS', 'JavaScript'],
    frameworks: ['Django', 'React', 'Scikit-Learn', 'Pandas', 'NumPy', 'Node.js'],
    tools: ['Git', 'GitHub', 'Linux (Ubuntu)', 'VS Code', 'Docker', 'PostgreSQL', 'SQLite'],
    concepts: ['Machine Learning', 'Data Structures', 'Object-Oriented Programming', 'Security', 'AI/Neural Networks'],
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <div className="terminal-line">
          <span className="terminal-prompt">user@portfolio:~$</span>
          <span className="terminal-command">cat about.md</span>
        </div>
        <h1 className="about-title">About Me</h1>
      </div>

      <section className="about-section">
        <div className="section-header">
          <span className="section-icon">{'>'}</span>
          <h2 className="section-title">Introduction</h2>
        </div>
        <div className="section-content">
          <p>
            I'm Grant Jones, a Computer Science graduate student at Western Kentucky University
            with a passion for artificial intelligence and full-stack development. Currently
            serving as a Graduate Assistant teaching Introduction to Java, I help students
            understand programming concepts and develop problem-solving skills.
          </p>
          <p>
            My academic journey combines computer science expertise with a psychology background,
            giving me unique insights into user experience and human-computer interaction.
            I specialize in building intelligent applications using machine learning,
            with hands-on experience in Django, React, and modern AI frameworks.
          </p>
          <p>
            I'm passionate about creating practical solutions to real-world problems, from
            AI-powered recommendation systems to custom LLM interfaces. When I'm not coding,
            you'll find me exploring new ML models, optimizing algorithms, or mentoring students
            in programming fundamentals.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <span className="section-icon">{'>'}</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>
        <div className="skills-grid">
          <div className="skill-category">
            <h3 className="skill-category-title">
              <span className="category-icon">{'</>'}</span> Languages
            </h3>
            <div className="skill-badges">
              {skills.languages.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">
              <span className="category-icon">⚡</span> Frameworks & Libraries
            </h3>
            <div className="skill-badges">
              {skills.frameworks.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">
              <span className="category-icon">🛠</span> Tools & Technologies
            </h3>
            <div className="skill-badges">
              {skills.tools.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">
              <span className="category-icon">📚</span> Concepts & Practices
            </h3>
            <div className="skill-badges">
              {skills.concepts.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <span className="section-icon">{'>'}</span>
          <h2 className="section-title">Education & Experience</h2>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">
                <span className="date-bracket">{'['}</span>
                Aug 2025 – Present
                <span className="date-bracket">{']'}</span>
              </div>
              <h3 className="timeline-title">Graduate Assistant - Western Kentucky University</h3>
              <p className="timeline-description">
                Teaching CS180: Introduction to Java. Delivering supplemental instruction,
                grading assignments, and holding weekly tutoring hours to support 60+
                undergraduate students in debugging code, understanding OOP concepts,
                and improving problem-solving skills.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">
                <span className="date-bracket">{'['}</span>
                Aug 2025 – May 2027 (Expected)
                <span className="date-bracket">{']'}</span>
              </div>
              <h3 className="timeline-title">Master's in Computer Science - WKU</h3>
              <p className="timeline-description">
                Pursuing Master of Science in Computer Science at Western Kentucky University.
                Coursework includes Operating Systems II, Advanced Databases, Data Structures,
                Computer Architecture, Security in Computing, Artificial Intelligence, and more.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">
                <span className="date-bracket">{'['}</span>
                Jan 2023 – Dec 2023
                <span className="date-bracket">{']'}</span>
              </div>
              <h3 className="timeline-title">Undergraduate Teaching Assistant - UTC</h3>
              <p className="timeline-description">
                Co-led instruction and review sessions for introductory psychology courses
                of 300+ students at University of Tennessee at Chattanooga. Led small group
                sessions to explain statistical and research concepts clearly.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">
                <span className="date-bracket">{'['}</span>
                Aug 2021 – Dec 2023
                <span className="date-bracket">{']'}</span>
              </div>
              <h3 className="timeline-title">B.S. in Psychology - UTC</h3>
              <p className="timeline-description">
                Completed Bachelor of Science in Psychology at University of Tennessee
                at Chattanooga. Gained valuable insights into human behavior, research
                methods, and statistical analysis that complement my CS work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <span className="section-icon">{'>'}</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>
        <div className="section-content">
          <p>
            I'm always interested in new opportunities, collaborations, and
            connecting with fellow developers. Feel free to reach out!
          </p>
          <div className="connect-links">
            <a
              href="https://github.com/grantjones-526"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-link"
            >
              <span className="link-icon">{'<>'}</span> GitHub
            </a>
            <a
              href="https://linkedin.com/in/grant-jones-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-link"
            >
              <span className="link-icon">in</span> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
