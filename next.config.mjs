/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'friendsbook.pk' },
       { hostname: 'books.google.com.pk' },
    ],
  },
};

export default nextConfig;