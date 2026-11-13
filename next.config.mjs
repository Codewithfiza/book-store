/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'friendsbook.pk' },
       { hostname: 'books.google.com.pk' },
        { hostname: 'd9z6htgewkjtb.cloudfront.net' },
    ],
  },
};

export default nextConfig;