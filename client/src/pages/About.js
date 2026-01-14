import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TerminalPage from '../components/TerminalPage';
import '../styles/About.css';

const About = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backButtonSelected, setBackButtonSelected] = useState(true);
  const itemRefs = useRef([]);

  const links = [
    { label: 'GITHUB', url: 'https://github.com/grantjones-526', type: 'external' },
    { label: 'LINKEDIN', url: 'https://linkedin.com/in/grant-jones-cs', type: 'external' },
  ];

  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (backButtonSelected) {
          setBackButtonSelected(false);
          setSelectedIndex(links.length - 1);
        } else if (selectedIndex > 0) {
          setSelectedIndex(prev => prev - 1);
        } else {
          setBackButtonSelected(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (backButtonSelected) {
          setBackButtonSelected(false);
          setSelectedIndex(0);
        } else if (selectedIndex < links.length - 1) {
          setSelectedIndex(prev => prev + 1);
        } else {
          setBackButtonSelected(true);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (!backButtonSelected) {
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : links.length - 1));
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (!backButtonSelected) {
          setSelectedIndex(prev => (prev < links.length - 1 ? prev + 1 : 0));
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (backButtonSelected) {
          navigate('/');
        } else {
          window.open(links[selectedIndex].url, '_blank');
        }
        break;
      default:
        break;
    }
  }, [selectedIndex, links, backButtonSelected, navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (backButtonSelected) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemRefs.current[selectedIndex]) {
      const el = itemRefs.current[selectedIndex];
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisible) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [selectedIndex, backButtonSelected]);

  const skills = {
    languages: ['JavaScript', 'Python', 'Java', 'C++', 'SQL', 'HTML', 'CSS', 'Bash'],
    frameworks: ['React', 'Node.js', 'Express', 'Django', 'REST APIs'],
    tools: ['Git', 'GitHub', 'PostgreSQL', 'SQLite', 'Docker', 'Linux (Ubuntu)', 'VS Code'],
    concepts: ['Full Stack Development', 'Data Structures', 'Object-Oriented Programming', 'Database Design', 'Security'],
  };

  return (
    <TerminalPage title="ABOUT" backButtonSelected={backButtonSelected}>
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
            {links.map((link, index) => (
              <a
                key={link.label}
                ref={el => itemRefs.current[index] = el}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`terminal-link ${selectedIndex === index && !backButtonSelected ? 'selected' : ''}`}
                onClick={() => { setBackButtonSelected(false); setSelectedIndex(index); }}
              >
                [{link.label}]
              </a>
            ))}
          </div>
        </section>
      </div>
    </TerminalPage>
  );
};

export default About;
