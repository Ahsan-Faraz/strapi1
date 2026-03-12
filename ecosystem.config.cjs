/**
 * PM2 ecosystem config for Strapi on VPS
 * Usage: pm2 start ecosystem.config.cjs
 * Reload: pm2 reload strapi
 * Logs: pm2 logs strapi
 */
module.exports = {
  apps: [
    {
      name: 'strapi',
      cwd: __dirname,
      script: 'node_modules/.bin/strapi',
      args: 'start',
      node_args: '--max-old-space-size=2048',
      env: { NODE_ENV: 'production', PORT: 1337, HOST: '0.0.0.0' },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      restart_delay: 3000,
      kill_timeout: 30000,
      listen_timeout: 30000,
    },
  ],
};
