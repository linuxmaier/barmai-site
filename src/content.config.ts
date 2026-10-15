import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per entry in content/wedding/. index.md is the landing page; every other
// file is a button on it. A file with `link:` is a button to another site; a file without one
// is a page of its own at /wedding/<file name>/, followed by the entries in the folder of the same
// name, if there is one: as sections down the page, or with `layout: tiles` as a grid of tiles
// that each open the entry's own page at /wedding/<page>/<entry>/. See EDITING.md.
const wedding = defineCollection({
  loader: glob({ base: './content/wedding', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      link: z.url().optional(),
      order: z.number().default(100),
      draft: z.boolean().default(false),
      layout: z.enum(['sections', 'tiles']).default('sections'),
      // Landing page only.
      subtitle: z.string().optional(),
      photo: image().optional(),
      photo_alt: z.string().optional(),
    }),
});

// Entries listed on a wedding page: content/wedding/<page>/*.md shows on /wedding/<page>/,
// for example one file per book in content/wedding/books/.
const entries = defineCollection({
  loader: glob({ base: './content/wedding', pattern: '*/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      byline: z.string().optional(),
      // Short tag shown on the tile and above the title, for example "Table 5".
      label: z.string().optional(),
      order: z.number().default(100),
      draft: z.boolean().default(false),
      // Listed by title and byline under "Honorable mentions" at the bottom of the page,
      // with no tile, section, or page of its own.
      mention: z.boolean().default(false),
      image: image().optional(),
      image_alt: z.string().optional(),
    }),
});

export const collections = { wedding, entries };
