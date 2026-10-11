import { getCollection } from 'astro:content';

// The entries listed on a wedding page: content/wedding/<page>/*.md, in order.
export async function entriesFor(page: string) {
  const prefix = `${page}/`;
  const listed = await getCollection(
    'entries',
    (e) => e.id.startsWith(prefix) && !e.data.draft,
  );
  return listed
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
    .map((entry) => ({ entry, slug: entry.id.slice(prefix.length) }));
}
