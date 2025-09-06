import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      fileName: true,
      meaninglessFileNames: ["index", "styles"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;