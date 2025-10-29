import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Define the 'snippets' table
  snippets: defineTable({
    // A string representing the ID of the user who created the snippet.
    // This will typically come from Clerk's `userId`.
    userId: v.string(),

    // The main title of the code snippet.
    title: v.string(),

    // The actual code content of the snippet.
    code: v.string(),

    // The programming language of the snippet (e.g., 'typescript', 'javascript', 'python').
    // This helps with syntax highlighting.
    language: v.string(),

    // An array of strings for tags, enabling easy categorization and search.
    tags: v.array(v.string()),

    // An optional longer description for the snippet, explaining its purpose or usage.
    description: v.optional(v.string()),

    // Timestamp when the snippet was created (managed by Convex).
    // `v.number()` is used for timestamps (e.g., `Date.now()`).
    createdAt: v.number(),

    // Timestamp when the snippet was last updated (managed by Convex).
    updatedAt: v.number(),
  }).index('by_userId', ['userId']),
});
