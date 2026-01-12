import React from 'react';
import TerminalPage from '../components/TerminalPage';
import '../styles/About.css';

const About = () => {
  const skills = {
    languages: ['JavaScript', 'Python', 'Java', 'C++', 'SQL', 'HTML', 'CSS', 'Bash'],
    frameworks: ['React', 'Node.js', 'Express', 'Django', 'REST APIs'],
    tools: ['Git', 'GitHub', 'PostgreSQL', 'SQLite', 'Docker', 'Linux (Ubuntu)', 'VS Code'],
    concepts: ['Full Stack Development', 'Data Structures', 'Object-Oriented Programming', 'Database Design', 'Security'],
  };

  return (
    <TerminalPage title="ABOUT">
      <div className="about-content">
        <section className="terminal-section">
          <h2 className="section-title">> INTRODUCTION</h2>
          <div className="section-body">
            <p>
              I'm Grant Jones, a Computer Science graduate student at Western Kentucky University
              with a passion for full-stack development. Currently serving as a Graduate Assistant
              teaching Introduction to Java, I help students understand programming concepts and
              develop problem-solving skills.
            </p>
            <p>
              My academic journey combines computer science expertise with a psychology background,
              giving me unique insights into user experience and human-computer interaction.
              I specialize in building web applications using React, Node.js, Django, and
              modern database technologies.
            </p>
            <p>
              I'm passionate about creating practical solutions to real-world problems, from
              responsive frontends to scalable backend APIs. When I'm not coding, you'll find me
              exploring the outdoors, golfing, or binging the newest anime.
            </p>
          </div>
        </section>

        <section className="terminal-section">
          <h2 className="section-title">> EDUCATION & EXPERIENCE</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-date">[Aug 2025 – Present]</span>
              <h3 className="timeline-role">Graduate Assistant - Western Kentucky University</h3>
              <p className="timeline-desc">
                Teaching CS180: Introduction to Java. Supporting 60+ undergraduate students
                in debugging code, understanding OOP concepts, and problem-solving.
              </p>
            </div>

            <div className="timeline-item">
              <span className="timeline-date">[Aug 2025 – May 2027]</span>
              <h3 className="timeline-role">Master's in Computer Science - WKU</h3>
              <p className="timeline-desc">
                Coursework: Operating Systems II, Advanced Databases, Data Structures,
                Computer Architecture, Security in Computing, Artificial Intelligence.
              </p>
            </div>

            <div className="timeline-item">
              <span className="timeline-date">[Jan 2023 – Dec 2023]</span>
              <h3 className="timeline-role">Undergraduate Teaching Assistant - UTC</h3>
              <p className="timeline-desc">
                Co-led instruction for introductory psychology courses of 300+ students.
              </p>
            </div>

            <div className="timeline-item">
              <span className="timeline-date">[Aug 2021 – Dec 2023]</span>
              <h3 className="timeline-role">B.S. in Psychology - UTC</h3>
              <p className="timeline-desc">
                Gained insights into human behavior, research methods, and statistical analysis.
              </p>
            </div>
          </div>
        </section>

        <section className="terminal-section">
          <h2 className="section-title">> TECHNICAL SKILLS</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="skill-label">Languages:</h3>
              <p className="skill-list">{skills.languages.join(' | ')}</p>
            </div>
            <div className="skill-category">
              <h3 className="skill-label">Frameworks:</h3>
              <p className="skill-list">{skills.frameworks.join(' | ')}</p>
            </div>
            <div className="skill-category">
              <h3 className="skill-label">Tools:</h3>
              <p className="skill-list">{skills.tools.join(' | ')}</p>
            </div>
            <div className="skill-category">
              <h3 className="skill-label">Concepts:</h3>
              <p className="skill-list">{skills.concepts.join(' | ')}</p>
            </div>
          </div>
        </section>

        <section className="terminal-section">
          <h2 className="section-title">> CONNECT</h2>
          <div className="connect-links">
            <a href="https://github.com/grantjones-526" target="_blank" rel="noopener noreferrer" className="terminal-link">
              [GITHUB]
            </a>
            <a href="https://linkedin.com/in/grant-jones-cs" target="_blank" rel="noopener noreferrer" className="terminal-link">
              [LINKEDIN]
            </a>
          </div>
        </section>
      </div>
    </TerminalPage>
  );
};

export default About;
