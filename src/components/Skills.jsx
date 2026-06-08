import { useEffect, useState } from 'react';
import { Cloud, Code, Database, Wrench } from 'lucide-react';
import { skillTabs as defaultTabs, skillsByCategory as defaultSkillsByCategory } from '../data/skills';
import { fetchSkills } from '../utils/api';

const tabIcons = {
  frontend: Code,
  backend: Database,
  cloud: Cloud,
  tools: Wrench,
};

function buildSkillTabsFromCategoryKeys(skillsByCategory) {
  return Object.keys(skillsByCategory).map((key) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
  }));
}

function normalizeSkillsData(payload) {
  if (!payload) {
    return {
      skillTabs: defaultTabs,
      skillsByCategory: defaultSkillsByCategory,
    };
  }

  const data = payload?.data ?? payload;

  const skillsByCategory =
    data.skillsByCategory ||
    (Array.isArray(data.categories)
      ? data.categories.reduce((acc, category) => {
          const id = (category.tabId || category.name || 'frontend')
            .toString()
            .toLowerCase();
          acc[id] = (category.skills || []).map((skill) => ({
            name: skill.name || 'Unknown Skill',
            level: Number(skill.level ?? skill.proficiency ?? 0),
          }));
          return acc;
        }, {})
      : Array.isArray(data)
      ? data.reduce((acc, skill) => {
          const category = (skill.category || 'frontend').toLowerCase();
          acc[category] = acc[category] ?? [];
          acc[category].push({
            name: skill.name || skill.skill || 'Unknown Skill',
            level: Number(skill.level ?? skill.proficiency ?? 0),
          });
          return acc;
        }, {})
      : null);

  const skillTabs =
    data.skillTabs ||
    (Array.isArray(data.categories)
      ? data.categories.map((category) => ({
          id: (category.tabId || category.name || 'frontend')
            .toString()
            .toLowerCase(),
          name: category.name || category.tabId || 'Skill',
        }))
      : skillsByCategory
      ? buildSkillTabsFromCategoryKeys(skillsByCategory)
      : null);

  return {
    skillTabs: skillTabs && skillTabs.length ? skillTabs : defaultTabs,
    skillsByCategory: skillsByCategory || defaultSkillsByCategory,
  };
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [skillTabs, setSkillTabs] = useState(defaultTabs);
  const [skillsData, setSkillsData] = useState(defaultSkillsByCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const result = await fetchSkills();
        const normalized = normalizeSkillsData(result);
        setSkillTabs(normalized.skillTabs);
        setSkillsData(normalized.skillsByCategory);
        setActiveTab((current) =>
          normalized.skillsByCategory[current]
            ? current
            : normalized.skillTabs[0]?.id || 'frontend'
        );
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const skills = skillsData[activeTab] ?? [];

  if (loading) {
    return (
      <section id="skills" className="section skills-section">
        <h2 className="section-title">My Skills Matrix</h2>
        <p className="section-subtitle">
          A deep dive into the technologies, framework suites, and system tools that
          form my operational stack.
        </p>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading skills...</p>
      </section>
    );
  }

  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title">My Skills Matrix</h2>
      <p className="section-subtitle">
        A deep dive into the technologies, framework suites, and system tools that
        form my operational stack.
      </p>

      {error && (
        <p style={{ textAlign: 'center', color: 'var(--danger)', marginBottom: '1rem' }}>
          Could not load skills from the API. Showing default skills.
        </p>
      )}

      <div className="skills-tabs glass-card">
        {skillTabs.map((tab) => {
          const Icon = tabIcons[tab.id] ?? Code;
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
