/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Add a function to unoptimize SVG images
    unoptimized: true,
  },
};

export default nextConfig;
