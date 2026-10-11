# Editing the site

You can edit everything on the site from GitHub in a browser. You don't need to install anything. When you save a change, it's live at [barmai.us/wedding](https://barmai.us/wedding/) about 5–10 minutes later.

All the wedding content is in the [`content/wedding`](content/wedding/) folder. Each file is one button on the wedding page:

| File | Page |
|---|---|
| `index.md` | The wedding page itself: your names, the line under them, the welcome text, and the optional photo |
| `books.md`, plus one file per book in the `books` folder | The books on the tables, as a grid of covers |
| `readings.md`, plus one file per reading in the `readings` folder | Readings & vows |
| `thanks.md` | Thank yous |
| `photos.md` | The button to the shared photo album (hidden until the album exists) |

## Change a page

1. Open [`content/wedding`](content/wedding/) and click the file, for example `brunch.md`.
2. Click the pencil icon (**Edit this file**) at the top right.
3. Make your changes. The **Preview** tab shows roughly how the text will look.
4. Click **Commit changes…**, write a few words about what you changed, and click **Commit changes** again.

## Add a page

1. In [`content/wedding`](content/wedding/), click **Add file → Create new file**.
2. Name it something short with dashes instead of spaces, ending in `.md`, for example `hotel-info.md`. The name becomes the address: `barmai.us/wedding/hotel-info/`.
3. Start it with this block, then write the page below it:

   ```markdown
   ---
   title: Hotel info
   description: The short line under the button
   order: 50
   ---

   The page text goes here.
   ```

4. Commit it, as above.

## The books

Each book is one file in the [`books`](content/wedding/books/) folder, already set up for all 13 tables. On the books page, each book is a tile showing its cover. Tapping a tile opens the book's own page with your note.

To write a note, open the book's file, click the pencil, and replace `[Why we chose this book.]`.

To add a cover:

1. In the [`books`](content/wedding/books/) folder, click **Add file → Upload files** and upload the image, named like the book's file: `matilda.jpg` for `matilda.md`. A photo of your own copy works too; it's cropped to a book's proportions (2 wide by 3 tall).
2. Edit the book's file and remove the `#` at the start of the `image:` and `image_alt:` lines.

Until a book has a cover, its tile shows the title and author on navy.

The block at the top of a book's file:

```markdown
---
title: The Left Hand of Darkness
byline: Ursula K. Le Guin
label: Table 5
order: 5
---
```

`byline:` is the author, `label:` is the small line above the title, and `order:` sets its place in the grid.

## Add a reading

Each reading is one file in the [`readings`](content/wedding/readings/) folder, shown one after another on the readings page:

1. Open the [`readings`](content/wedding/readings/) folder and click **Add file → Create new file**.
2. Name it with dashes instead of spaces, for example `sonnet-116.md`.
3. Start it with this block, then paste the reading below it:

   ```markdown
   ---
   title: Sonnet 116
   byline: William Shakespeare · read by Jenny
   order: 2
   ---

   Let me not to the marriage of true minds
   Admit impediments.
   ```

The example reading is a placeholder, so delete it once you've added real ones. To delete a file, open it, click the **⋯** menu at the top right, and choose **Delete file**.

## Add a button that goes to another site

For example, the shared photo album. Make a new file the same way, with a `link:` line and nothing below the block:

```markdown
---
title: Share your photos
description: Add the pictures you took to our shared album
link: https://example.com/the-album
order: 10
---
```

## The block at the top of each file

The lines between the two `---` lines set up the button:

| Line | What it does |
|---|---|
| `title:` | The button's name, and the page's heading. Required. |
| `description:` | The smaller line under the button. Optional. |
| `order:` | Where the button goes. Lower numbers go first. |
| `link:` | Makes the button open another site instead of a page here. |
| `draft: true` | Hides the button and its page until you change it to `false` or delete the line. Works on a book or reading too. |
| `layout: tiles` | Shows the page's entries as a grid of tiles that each open a page, like the books. Without it, they're listed down the page, like the readings. |

If a title, description, or byline contains a colon (`:`), put it in quotes: `title: "Brunch: the sequel"`.

## Writing the text

The text uses Markdown:

| You type | You get |
|---|---|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `## Heading` | A section heading |
| `- item` | A bulleted list |
| `[words](https://example.com)` | A link |

Each line you type stays its own line on the site, so poems and vows keep their shape. A blank line starts a new paragraph (or stanza).

## Add the photo at the top

1. In [`content/wedding`](content/wedding/), click **Add file → Upload files** and upload the photo as `photo.jpg`. A large photo is fine; the site shrinks it.
2. Edit `index.md` and remove the `#` at the start of the `photo:` and `photo_alt:` lines. Describe the photo in `photo_alt:` for people using screen readers.

## If something goes wrong

If a change breaks the site (for example, a typo in the block at the top), the site keeps showing the last version that worked, and GitHub emails you that the **Release** run failed. Its log usually names the file and the problem. To undo a change, open the file's **History**, or ask Andrew.

Everything here is public. Anyone with the link can read it, so leave out home addresses and anything else you wouldn't post publicly.
