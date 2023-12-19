/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ui"],
  compiler: {
    styledComponents: true,
    emotion: true,
  },
};

module.exports = nextConfig;
