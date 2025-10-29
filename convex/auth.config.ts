// convex/auth.config.ts
import { AuthConfig } from 'convex/server';

export default {
  providers: [
    {
      // Replace with your own Clerk Issuer URL from your "convex" JWT template.
      // or with `process.env.CLERK_JWT_ISSUER_DOMAIN`
      // and configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard.
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!, // Using an environment variable
      applicationID: 'convex', // Or your specific application ID
    },
  ],
} satisfies AuthConfig;
