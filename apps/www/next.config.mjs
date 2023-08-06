import { createContentlayerPlugin } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  experimental : {  
    serverActions: true,
  },
  redirects() {
    return [
      {
        source: "/components",
        destination: "/shadcn/docs/components/accordion",
        permanent: true,
      },
      {
        source: "/shadcn/docs/components",
        destination: "/shadcn/docs/components/accordion",
        permanent: true,
      },
      {
        source: "/examples",
        destination: "/shadcn/examples/dashboard",
        permanent: false,
      },
      {
        source: "/shadcn/docs/primitives/:path*",
        destination: "/shadcn/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/figma",
        destination: "/shadcn/docs/figma",
        permanent: true,
      },
      {
        source: "/shadcn/docs/forms",
        destination: "/shadcn/docs/components/form",
        permanent: false,
      },
      {
        source: "/shadcn/docs/forms/react-hook-form",
        destination: "/shadcn/docs/components/form",
        permanent: false,
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
