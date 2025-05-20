/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }`, then you will need to uncomment the below.
   * @see https://github.com/t3-oss/create-t3-app/pull/2077
   */
  // experimental: {
  //   transpilePackages: ["@repo/ui"],
  // },

  /**
   * Enable server actions
   */
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default config;
