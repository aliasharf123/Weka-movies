/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.themoviedb.org' ,'image.tmdb.org' ,'cdn.pixabay.com' , 'lh3.googleusercontent.com' , 'upload.wikimedia.org'], 
    minimumCacheTTL: 60,
    unoptimized: true 
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
