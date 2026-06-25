import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ExternalLink,
  Github,
  Lightbulb,
  Target,
  X,
} from 'lucide-react';
import { projects as defaultProjects } from '../data/projects';

const categoryLabels = {
  all: 'Show All',
  fullstack: 'Full Stack',
  frontend: 'Frontend',
  backend: 'Backend',
};

function getProjectFilters(projects) {
  const categories = [...new Set(projects.map((project) =>
    (project.category || 'other').toString().toLowerCase()
  ))];

  const ordered = categories.sort((a, b) => {
    if (a === 'fullstack') return -1;
    if (b === 'fullstack') return 1;
    return a.localeCompare(b);
  });

  return [
    { id: 'all', label: categoryLabels.all },
    ...ordered.map((category) => ({
      id: category,
      label:
        categoryLabels[category] ??
        category.charAt(0).toUpperCase() + category.slice(1),
    })),
  ];
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [modalProject, setModalProject] = useState(null);

  // use default data directly
  const projects = defaultProjects;

  const filters = useMemo(() => getProjectFilters(projects), [projects]);

  const filtered = useMemo(() => {
    const list =
      filter === 'all'
        ? [...projects]
        : projects.filter((p) => p.category === filter);

    return list.sort((a, b) =>
      a.category === 'fullstack' ? -1 : b.category === 'fullstack' ? 1 : 0
    );
  }, [filter, projects]);

  return (
    <section className="section projects-section">
      <h2 className="section-title">Selected Projects</h2>
      <p className="section-subtitle">
        A curated collection of full-stack engineering applications built with
        clean design.
      </p>

      <div className="filter-nav">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`filter-btn ${filter === f.id ? 'active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((project) => (
          <div key={project.id} className="glass-card project-card">
            <div className="project-card-header">
              <span className="project-category-tag">
                {project.category}
              </span>
            </div>

            <div className="project-card-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-tech-list">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-card-actions">
              <button
                type="button"
                onClick={() => setModalProject(project)}
                className="btn btn-secondary card-action-btn"
              >
                <Target size={16} />
                Case Study
              </button>

              <div className="project-links-group">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <Github size={20} />
                </a>

                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-link"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalProject && (
        <div
          className="modal-overlay"
          onClick={() => setModalProject(null)}
        >
          <div
            className="glass-card modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalProject(null)}
              className="modal-close-btn"
            >
              <X size={24} />
            </button>

            <div className="modal-content">
              <span className="modal-category">
                {modalProject.category.toUpperCase()}
              </span>

              <h3 className="modal-title">{modalProject.title}</h3>
              <p className="modal-intro">{modalProject.description}</p>

              <div className="modal-sections">
                <div className="modal-section-block">
                  <div className="section-block-title">
                    <AlertTriangle size={18} />
                    <h4>The Challenge</h4>
                  </div>
                  <p>{modalProject.caseStudy.challenge}</p>
                </div>

                <div className="modal-section-block">
                  <div className="section-block-title">
                    <Lightbulb size={18} />
                    <h4>The Solution</h4>
                  </div>
                  <p>{modalProject.caseStudy.solution}</p>
                </div>

                <div className="modal-section-block">
                  <div className="section-block-title">
                    <Target size={18} />
                    <h4>Technical Metrics</h4>
                  </div>
                  <div className="metrics-box">
                    <strong>{modalProject.caseStudy.metrics}</strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer-actions">
                <a
                  href={modalProject.links.github}
                  className="btn btn-secondary"
                >
                  <Github size={18} />
                  Source Code
                </a>

                {modalProject.links.demo && (
                  <a
                    href={modalProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}