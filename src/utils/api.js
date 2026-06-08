const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_ADMIN_API_KEY;
const SKILLS_API_URL = import.meta.env.VITE_SKILLS_API_URL || 'https://portfolio-bice-gamma-80.vercel.app/api/v1/portfolio/skills';
const PROJECTS_API_URL = import.meta.env.VITE_PROJECTS_API_URL || 'https://portfolio-bice-gamma-80.vercel.app/api/v1/portfolio/projects';
const EXPERIENCES_API_URL = import.meta.env.VITE_EXPERIENCES_API_URL || 'https://portfolio-bice-gamma-80.vercel.app/api/v1/portfolio/experiences';

export async function fetchAbout() {
  try {
    const response = await fetch(`${API_URL}/about`, {
      headers: {
        'x-admin-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch about data:', error);
    throw error;
  }
}

function normalizeSkillsResponse(payload) {
  const data = payload?.data ?? payload?.skills ?? payload?.skillsByCategory ?? payload;
  if (!data) {
    return null;
  }

  if (Array.isArray(data)) {
    return data.reduce((acc, item) => {
      const category = (item.category || 'frontend').toLowerCase();
      const name = item.name || item.skill || 'Unknown Skill';
      const level = Number(item.level ?? item.proficiency ?? 0);

      acc[category] = acc[category] ?? [];
      acc[category].push({ name, level });
      return acc;
    }, {});
  }

  return data;
}

export async function fetchSkills() {
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) {
    headers['x-admin-api-key'] = API_KEY;
  }

  try {
    const response = await fetch(SKILLS_API_URL, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const normalized = normalizeSkillsResponse(json);
    return normalized || json;
  } catch (error) {
    console.error('Failed to fetch skills data:', error);
    throw error;
  }
}

function normalizeProjectsResponse(payload) {
  const data = payload?.data ?? payload;
  const rawProjects = data?.projects ?? data;

  if (!Array.isArray(rawProjects)) {
    return null;
  }

  return rawProjects.map((project) => {
    const category = (project.category || project.type || 'fullstack').toString().toLowerCase();
    const tech = Array.isArray(project.tech)
      ? project.tech
      : Array.isArray(project.technologies)
      ? project.technologies
      : [];

    const links = {
      github: project.links?.github ?? project.github ?? '',
      demo: project.links?.demo ?? project.demo ?? '',
    };

    const caseStudy = {
      challenge: project.caseStudy?.challenge ?? project.challenge ?? '',
      solution: project.caseStudy?.solution ?? project.solution ?? '',
      metrics: project.caseStudy?.metrics ?? project.metrics ?? '',
    };

    return {
      id: project._id ?? project.id ?? project.title ?? `${category}-${Math.random()}`,
      title: project.title ?? 'Untitled Project',
      category,
      description: project.description ?? project.summary ?? '',
      tech,
      links,
      caseStudy,
    };
  });
}

export async function fetchProjects() {
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) {
    headers['x-admin-api-key'] = API_KEY;
  }

  try {
    const response = await fetch(PROJECTS_API_URL, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const normalized = normalizeProjectsResponse(json);
    return normalized || json?.data?.projects || json;
  } catch (error) {
    console.error('Failed to fetch projects data:', error);
    throw error;
  }
}

function normalizeExperienceResponse(payload) {
  const data = payload?.data ?? payload;
  const rawExperiences = data?.experiences ?? data?.experience ?? data;

  if (!Array.isArray(rawExperiences)) {
    return null;
  }

  return rawExperiences.map((item) => ({
    id: item._id ?? item.id ?? `${item.company ?? item.role ?? 'experience'}-${Math.random()}`,
    role: item.role ?? item.position ?? 'Unknown Role',
    company: item.company ?? item.organization ?? 'Unknown Company',
    location: item.location ?? item.place ?? '',
    period: item.period ?? item.duration ?? '',
    bullets: Array.isArray(item.bullets)
      ? item.bullets
      : Array.isArray(item.responsibilities)
      ? item.responsibilities
      : item.summary
      ? [item.summary]
      : [],
    tech: Array.isArray(item.tech)
      ? item.tech
      : Array.isArray(item.technologies)
      ? item.technologies
      : [],
  }));
}

export async function fetchExperiences() {
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) {
    headers['x-admin-api-key'] = API_KEY;
  }

  try {
    const response = await fetch(EXPERIENCES_API_URL, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const normalized = normalizeExperienceResponse(json);
    return normalized || json?.data?.experiences || json?.data?.experience || json;
  } catch (error) {
    console.error('Failed to fetch experiences data:', error);
    throw error;
  }
}
