import { useEffect, useState } from 'react';
import { Cloud, Code, Database, Wrench } from 'lucide-react';
import { fetchSkillsTabs, fetchSkills } from "../services/api";
import {
  skillTabs as defaultTabs,
  skillsByCategory as defaultSkillsByCategory,
} from '../data/skills';

const tabIcons = {
  1: Code,
  2: Database,
  3: Cloud,
  4: Wrench,
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('1');

  const [tabs, setTabs] = useState(defaultTabs);
  const [skillsData, setSkillsData] = useState(defaultSkillsByCategory);

  useEffect(() => {
    let isMounted = true;

    const normalizeTabs = (res) => {
      const data = res?.data ?? res;
      return Array.isArray(data) ? data : null;
    };

    const normalizeSkills = (res) => {
      const data = res?.data ?? res;
      return data && typeof data === 'object' && !Array.isArray(data)
        ? data
        : null;
    };

    const loadData = async () => {
      try {
        const [tabsRes, skillsRes] = await Promise.all([
          fetchSkillsTabs(),
          fetchSkills(),
        ]);

        if (!isMounted) return;

        const apiTabs = normalizeTabs(tabsRes);
        const apiSkills = normalizeSkills(skillsRes);

        if (apiTabs) {
          setTabs(apiTabs);
        }

        if (apiSkills) {
          setSkillsData(apiSkills);
        }
      } catch (err) {
        // keep defaults
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const safeSkills =
    Array.isArray(skillsData?.[activeTab])
      ? skillsData[activeTab]
      : [];

  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title">My Skills Matrix</h2>

      <p className="section-subtitle">
        A deep dive into the technologies and tools I use.
      </p>

      <div className="skills-tabs glass-card">
        {tabs.map((tab) => {
          const Icon = tabIcons[tab.id] ?? Code;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(String(tab.id))}
              className={`tab-btn ${
                activeTab === String(tab.id) ? 'active' : ''
              }`}
            >
              <Icon size={18} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <div className="skills-grid">
        {safeSkills.map((skill) => (
          <div key={skill.name} className="glass-card skill-card">
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">
                {skill.level}%
              </span>
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