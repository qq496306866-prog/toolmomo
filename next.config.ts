import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/tools", destination: "/tools", permanent: true },
      { source: "/en/tools/:slug", destination: "/tools/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
