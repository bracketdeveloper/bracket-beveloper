const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_ADMIN_API_KEY;

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
