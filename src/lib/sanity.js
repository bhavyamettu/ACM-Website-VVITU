import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

if (!projectId || projectId === 'your_project_id')
  console.warn('[Sanity] VITE_SANITY_PROJECT_ID is not set – create a .env file (copy .env.example) and restart `npm run dev`. Showing built-in content.');

export const sanityConfigured = Boolean(projectId) && projectId !== 'your_project_id';

// Read-only public client – no token is ever used in the frontend.
export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true })
  : null;

const builder = client ? imageUrlBuilder(client) : null;
export const urlFor = (src) => (builder && src ? builder.image(src) : null);
