import { getCollection } from 'astro:content';

// The entries listed on a wedding page: content/wedding/<page>/*.md, in order.
// With `mentions`, the honorable mentions (`mention: true`) instead of the main entries.
export async function entriesFor(page: string, { mentions = false } = {}) {
  const prefix = `${page}/`;
  const listed = await getCollection(
    'entries',
    (e) => e.id.startsWith(prefix) && !e.data.draft && e.data.mention === mentions,
  );
  return listed
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
    .map((entry) => ({ entry, slug: entry.id.slice(prefix.length) }));
}
