const API_BASE_URL = "https://portfolio-api-wine-seven.vercel.app/api";

export const fetchAbout = async () => {
  const response = await fetch(`${API_BASE_URL}/about`);
  if (!response.ok) {
    throw new Error("Failed to fetch about data");
  }
  return await response.json();
};

export const fetchContact = async () => {
  const response = await fetch(`${API_BASE_URL}/contact`);
  if (!response.ok) {
    throw new Error("Failed to fetch contact data");
  }
  return await response.json();
};
export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await response.json();
};

export const fetchExperience = async () => {
  const response = await fetch(`${API_BASE_URL}/experiences`);
  if (!response.ok) {
    throw new Error("Failed to fetch experience data");
  }
  return await response.json();
};

export const fetchSkillsTabs = async () => {
  const response = await fetch(`${API_BASE_URL}/skill-categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch skill categories");
  }
  return await response.json();
};
export const fetchSkills = async () => {
  const response = await fetch(`${API_BASE_URL}/skills`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await response.json();
};
