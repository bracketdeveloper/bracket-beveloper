import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience as defaultExperience } from '../data/experience';

export default function Experience() {
  const experienceData = defaultExperience;

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
                {item.bullets.map((bullet, bulletIndex) => (
                  <li key={`${bullet}-${bulletIndex}`} className="timeline-bullet-item">
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="timeline-tech-badges">
                {item.tech.map((tech) => (
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