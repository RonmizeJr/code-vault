// convex/snippets.ts
import { v } from 'convex/values';
import { query, mutation } from './_generated/server'; // Import from _generated/server

// --- Queries ---

/**
 * Fetches all snippets created by the currently authenticated user.
 */
export const getMySnippets = query({
  args: {}, // This query doesn't need any arguments as it relies on the authenticated user.
  handler: async (ctx) => {
    // Check if the user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // If not authenticated, return an empty array or throw an error depending on desired behavior
      return [];
    }

    const userId = identity.subject; // Clerk's user ID is in 'subject'
    if (!userId) {
      throw new Error('User ID not found in identity');
    }

    // Fetch all snippets where the userId matches the authenticated user's ID
    const snippets = await ctx.db
      .query('snippets')
      .withIndex('by_userId', (q) => q.eq('userId', userId)) // Use the index for efficiency
      .order('desc') // Order by creation time, newest first
      .collect();

    return snippets.reverse(); // Return the snippets in reverse order (newest first)
  },
});

/**
 * Fetches a single snippet by its ID.
 * Accessible only to the owner of the snippet.
 */
export const getSnippetById = query({
  args: {
    snippetId: v.id('snippets'), // Expects an Id<'snippets'>
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;
    if (!userId) {
      throw new Error('User ID not found in identity');
    }

    const snippet = await ctx.db.get(args.snippetId);

    // Ensure the snippet exists and belongs to the current user
    if (!snippet || snippet.userId !== userId) {
      throw new Error('Snippet not found or unauthorized');
    }

    return snippet;
  },
});

// --- Mutations ---

/**
 * Creates a new code snippet for the authenticated user.
 */
export const createSnippet = mutation({
  args: {
    title: v.string(),
    code: v.string(),
    language: v.string(),
    tags: v.array(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Ensure the user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject; // Clerk's user ID
    if (!userId) {
      throw new Error('User ID not found in identity');
    }

    const now = Date.now();

    const snippetId = await ctx.db.insert('snippets', {
      userId,
      title: args.title,
      code: args.code,
      language: args.language,
      tags: args.tags,
      description: args.description,
      createdAt: now,
      updatedAt: now,
    });

    return snippetId; // Return the ID of the newly created snippet
  },
});

/**
 * Updates an existing code snippet.
 * Only the owner can update their snippets.
 */
export const updateSnippet = mutation({
  args: {
    snippetId: v.id('snippets'), // The ID of the snippet to update
    title: v.optional(v.string()),
    code: v.optional(v.string()),
    language: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;
    if (!userId) {
      throw new Error('User ID not found in identity');
    }

    // First, verify the snippet exists and belongs to the current user
    const existingSnippet = await ctx.db.get(args.snippetId);
    if (!existingSnippet || existingSnippet.userId !== userId) {
      throw new Error('Snippet not found or unauthorized');
    }

    const { snippetId, ...updatedFields } = args; // Separate ID from update fields

    await ctx.db.patch(snippetId, {
      ...updatedFields,
      updatedAt: Date.now(), // Update the timestamp on modification
    });

    return true; // Indicate successful update
  },
});

/**
 * Deletes a code snippet.
 * Only the owner can delete their snippets.
 */
export const deleteSnippet = mutation({
  args: {
    snippetId: v.id('snippets'), // The ID of the snippet to delete
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;
    if (!userId) {
      throw new Error('User ID not found in identity');
    }

    // Verify the snippet exists and belongs to the current user before deleting
    const existingSnippet = await ctx.db.get(args.snippetId);
    if (!existingSnippet || existingSnippet.userId !== userId) {
      throw new Error('Snippet not found or unauthorized');
    }

    await ctx.db.delete(args.snippetId);

    return true; // Indicate successful deletion
  },
});
