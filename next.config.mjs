import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "loremflickr.com",
      "picsum.photos",
    ],
  },
};

export default nextConfig;
