import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.kaldn5j4,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
