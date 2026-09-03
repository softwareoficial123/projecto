/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Configuración dinámica para despliegues en subrutas o dominios variables
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
