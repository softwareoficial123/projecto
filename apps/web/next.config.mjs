/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración dinámica para despliegues en subrutas o dominios variables
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api/:path*` : 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
