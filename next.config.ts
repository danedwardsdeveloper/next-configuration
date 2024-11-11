/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx'],
  images: {
    // deviceSizes: [640, 750],
    // imageSizes: [16, 32, 64, 128, 256, 384, 512],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            // ToDo
            value: 'www.my-site.co.uk',
          },
        ],
        // ToDo
        destination: 'https://my-site.co.uk//:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
