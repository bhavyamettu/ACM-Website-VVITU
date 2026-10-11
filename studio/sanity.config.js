import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';


const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId || projectId === 'your_project_id') {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env (copy studio/.env.example), then restart `npm run dev`.');
}

export default defineConfig({
  name: 'acm-vvitu',
  title: 'ACM VVITU',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
