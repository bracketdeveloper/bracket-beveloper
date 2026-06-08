import { useState } from 'react';
import { Cloud, Code, Database, Wrench } from 'lucide-react';
import { skillTabs, skillsByCategory } from '../data/skills';

const tabIcons = {
  frontend: Code,
  backend: Database,
  cloud: Cloud,
  tools: Wrench,
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const skills = skillsByCategory[activeTab];

  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title">My Skills Matrix</h2>
      <p className="section-subtitle">
        A deep dive into the technologies, framework suites, and system tools that
        form my operational stack.
      </p>

      <div className="skills-tabs glass-card">
        {skillTabs.map((tab) => {
          const Icon = tabIcons[tab.id];
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="glass-card skill-card">
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-progress-bar-track">
              <div
                className="skill-progress-bar-fill"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
