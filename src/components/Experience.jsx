import { useEffect, useState } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience as defaultExperience } from '../data/experience';
import { fetchExperience } from '../services/api';

export default function Experience() {
  const [experienceData, setExperienceData] = useState(defaultExperience);

  useEffect(() => {
    let isMounted = true;

    const loadExperience = async () => {
      try {
        const res = await fetchExperience();

        const apiData =
          res?.data || res || [];

        if (!Array.isArray(apiData)) return;

        const merged = defaultExperience.map((defItem) => {
          const apiItem = apiData.find(
            (item) =>
              item.company === defItem.company ||
              item.role === defItem.role
          );

          if (!apiItem) return defItem;

          return {
            role: apiItem.role || defItem.role,
            company: apiItem.company || defItem.company,
            location: apiItem.location || defItem.location,
            period: apiItem.period || defItem.period,
            bullets: Array.isArray(apiItem.bullets) && apiItem.bullets.length
              ? apiItem.bullets
              : defItem.bullets,
            tech_array: Array.isArray(apiItem.tech_array) && apiItem.tech_array.length
              ? apiItem.tech_array
              : defItem.tech_array,
          };
        });

        if (isMounted) {
          setExperienceData(merged);
        }
      } catch (err) {
        console.log('Experience API failed, using default data');
      }
    };

    loadExperience();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="experience" className="section experience-section">
      <h2 className="section-title">Professional Journey</h2>
      <p className="section-subtitle">
        A chronological overview of my professional engineering milestones,
        organizational achievements, and technical contributions.
      </p>

      <div className="timeline-container">
        <div className="timeline-center-line" />

        {experienceData.map((item, index) => (
          <div
            key={item.id ?? item.company ?? item.role ?? index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-node">
              <Briefcase size={16} />
            </div>

            <div className="glass-card timeline-card">
              <div className="timeline-card-header">
                <span className="timeline-period">
                  <Calendar size={14} />
                  {item.period}
                </span>

                <span className="timeline-location">
                  <MapPin size={14} />
                  {item.location}
                </span>
              </div>

              <h3 className="timeline-role">{item.role}</h3>
              <h4 className="timeline-company">{item.company}</h4>

              <ul className="timeline-bullet-list">
                {(item.bullets || []).map((bullet, bulletIndex) => (
                  <li
                    key={`${bullet}-${bulletIndex}`}
                    className="timeline-bullet-item"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="timeline-tech-badges">
                {(item.tech_array || []).map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}