const DEFAULT_API_URL = 'https://portfolio-vercel-deployment-nine.vercel.app/api/v1/portfolio';
const isProduction = import.meta.env.MODE === 'production';

function normalizeProductionUrl(envValue, fallbackUrl) {
  const isRelative = typeof envValue === 'string' && envValue.startsWith('/');
  if (isProduction) {
    return envValue && !isRelative ? envValue : fallbackUrl;
  }
  return envValue || '/api/portfolio';
}

const API_URL = normalizeProductionUrl(import.meta.env.VITE_API_URL, DEFAULT_API_URL);
const API_KEY = import.meta.env.VITE_ADMIN_API_KEY;
const SKILLS_API_URL = normalizeProductionUrl(import.meta.env.VITE_SKILLS_API_URL, `${API_URL}/skills`);
const PROJECTS_API_URL = normalizeProductionUrl(import.meta.env.VITE_PROJECTS_API_URL, `${API_URL}/projects`);
const EXPERIENCES_API_URL = normalizeProductionUrl(import.meta.env.VITE_EXPERIENCES_API_URL, `${API_URL}/experiences`);
const CONTACT_API_URL = normalizeProductionUrl(import.meta.env.VITE_CONTACT_API_URL, `${API_URL}/contact`);

function createHeaders(includeAdminKey = true) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAdminKey && import.meta.env.DEV && API_KEY) {
    headers['x-admin-api-key'] = API_KEY;
  }

  return headers;
}

export async function fetchAbout() {
  try {
    const response = await fetch(`${API_URL}/about`, {
      headers: createHeaders(),
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
  try {
    const response = await fetch(SKILLS_API_URL, {
      headers: createHeaders(),
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
  try {
    const response = await fetch(PROJECTS_API_URL, {
      headers: createHeaders(),
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
  try {
    const response = await fetch(EXPERIENCES_API_URL, {
      headers: createHeaders(),
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

function normalizeContactResponse(payload) {
  const data = payload?.data ?? payload;
  if (!data) {
    return null;
  }

  const contact = data.contact ?? data;

  return {
    title: contact.title ?? data.title ?? "Let's Connect",
    description:
      contact.description ?? data.description ??
      'I am currently open to contracting opportunities, senior technical roles, or architectural consultancies. Feel free to shoot over a message.',
    email: contact.email ?? data.email ?? 'mianammarsalar@gmail.com',
    location: contact.location ?? data.location ?? 'Lahore, Pakistan (Remote Friendly)',
    socials: Array.isArray(contact.socials)
      ? contact.socials
      : Array.isArray(data.socials)
      ? data.socials
      : [
          { name: 'GitHub', url: 'https://github.com/bracketdeveloper' },
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mianammarsalar' },
        ],
  };
}

export async function fetchContact() {
  try {
    const response = await fetch(CONTACT_API_URL, {
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    const normalized = normalizeContactResponse(json);
    return normalized || json?.data?.contact || json;
  } catch (error) {
    console.error('Failed to fetch contact data:', error);
    throw error;
  }
}
