// lander.config.js — Lander Engine project configuration
// https://github.com/your-org/lander-engine#plugin-api

export default {
  // Directory containing JSON campaign configurations (default: 'json_configs')
  jsonConfigsDir: 'json_configs',

  // Directory containing UI components auto-registered for use in JSON (default: 'components')
  componentsDir: 'components',

  // Directory containing custom action handlers (default: 'actions')
  actionsDir: 'actions',

  // Static output directory produced by `lander build` (default: 'dist')
  outputDir: 'dist',

  // Directory for static assets like images, fonts, etc.
  assetsDir: 'public/assets',

  errorPages: {
    "404": {
      component: "Custom404",
      props: {
        message: "The page you are looking for has been moved or does not exist."
      }
    }
  },

  plugins: [
    // Example plugin — uncomment to enable
    // {
    //   name: 'analytics',
    //   onBeforeBuild: async (config) => {
    //     console.log('Building campaign from:', config.projectRoot);
    //   },
    //   onAfterBuild: async (config) => {
    //     console.log('Static output written to:', config.outputDir);
    //   },
    // Register additional components programmatically
    //   registerComponents: () => ({
    //     ThirdPartyWidget: () => import('./vendor/Widget'),
    //   }),
    // Register additional action handlers programmatically
    //   registerActions: () => ({
    //     sendToHubspot: async (payload) => { /* ... */ },
    //   }),
    // },
  ],
};
