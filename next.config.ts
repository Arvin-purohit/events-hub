import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  images : {
    remotePatterns : [
      {
        protocol : 'https' ,
        hostname : 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
