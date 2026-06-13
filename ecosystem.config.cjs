module.exports = {
  apps: [
    {
      name: "toolmomo",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/toolmomo",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
      kill_timeout: 10000,
    },
  ],
};
