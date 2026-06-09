import { useEffect, useState } from 'react';
import { Briefcase, Calendar, Download, Users, Wrench } from 'lucide-react';
import { fetchAbout } from '../utils/api';

const iconMap = {
  Calendar,
  Briefcase,
  Users,
  Wrench,
};

function buildStats(data) {
  if (!data) {
    return [];
  }

  if (Array.isArray(data.stats) && data.stats.length > 0) {
    return data.stats.map((stat) => ({
      label: stat.label ?? stat.name ?? 'Stat',
      value: `${stat.value ?? stat.count ?? ''}`,
      icon: stat.icon ?? stat.iconName ?? 'Briefcase',
    }));
  }

  return [
    { label: 'Years Experience', value: `${data.experienceYears ?? ''}`, icon: 'Calendar' },
    { label: 'Projects Built', value: `${data.projectsBuilt ?? ''}`, icon: 'Briefcase' },
    { label: 'Happy Clients', value: `${data.happyClients ?? ''}`, icon: 'Users' },
    { label: 'Core Stack Techs', value: `${data.coreStack ?? ''}`, icon: 'Wrench' },
  ].filter((stat) => stat.value);
}

function buildParagraphs(description) {
  if (!description) {
    return [];
  }

  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function About() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        const result = await fetchAbout();
        setData(result?.data ?? result ?? null);
        setError(null);
      } catch (err) {
        setError(err.message || 'Unable to load about section.');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  const stats = buildStats(data);
  const paragraphs = buildParagraphs(data?.description);
  const profileImage = data?.profileImage;
  const subtitle = data?.subtitle;
  const heading = data?.heading ?? data?.title ?? 'About Me';
  const ctaText = data?.ctaText ?? data?.primaryAction?.text;
  const ctaHref = data?.ctaHref ?? data?.primaryAction?.href ?? '#contact';
  const downloadText = data?.downloadText ?? data?.secondaryAction?.text;
  const downloadHref = data?.downloadHref ?? data?.secondaryAction?.href;

  if (loading) {
    return (
      <section id="about" className="section about-section">
        <h2 className="section-title">{heading}</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading about content...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id="about" className="section about-section">
        <h2 className="section-title">{heading}</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          {error ?? 'No about data available.'}
        </p>
      </section>
    );
  }

  return (
    <section id="about" className="section about-section">
      <h2 className="section-title">{heading}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}

      <div className="about-grid">
        {stats.length > 0 && (
          <div className="about-stats-panel">
            {stats.map((stat) => {
              const IconComponent = typeof stat.icon === 'string' ? iconMap[stat.icon] ?? Briefcase : stat.icon;
              return (
                <div key={`${stat.label}-${stat.value}`} className="glass-card stat-card">
                  <div className="stat-icon-wrapper">
                    <IconComponent size={22} />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        )}

        <div className="glass-card about-narrative-panel">
          {data?.sectionHeading && (
            <h3 className="narrative-heading">
              {data.sectionHeading}
            </h3>
          )}

          <div className="about-narrative-content">
            {profileImage && (
              <div className="profile-img-container">
                <img src={profileImage} alt="Profile" className="profile-img" />
              </div>
            )}
            {paragraphs.length > 0 && paragraphs.map((paragraph, index) => (
              <p key={index} className="narrative-paragraph">
                {paragraph}
              </p>
            ))}
            <div className="narrative-clearfix" />
          </div>

          <div className="narrative-actions">
            {ctaText && ctaHref && (
              <a href={ctaHref} className="btn btn-primary">
                {ctaText}
              </a>
            )}
            {downloadText && downloadHref && (
              <a
                href={downloadHref}
                download
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <Download size={18} />
                {downloadText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
