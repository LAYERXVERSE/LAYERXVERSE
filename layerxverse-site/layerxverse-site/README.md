# LAYERXVERSE Website

Your site, split into a normal web project instead of one giant file.

## Folder structure

```
layerxverse-site/
├── index.html          the page
├── css/
│   └── style.css       all styling
├── js/
│   └── script.js       cursor, scroll reveals, product filter, contact form, etc.
├── images/
│   └── crown-logo.png  your crown mark (already local)
└── localize-images.sh  optional: pulls the 18 product photos down locally
```

## The 18 product/lifestyle photos

Right now `index.html` and `js/script.js` link to those photos on Higgsfield's
CDN (`https://d8j0ntlcm91z4.cloudfront.net/...`). That works fine as-is — the
links are stable, public, and need no login — so you can upload this folder
to any host today and the site will look complete.

If you'd rather have your own local copies (e.g. so the site has zero
dependency on Higgsfield staying up, or so you can edit/replace individual
photos later), run this once from a computer with internet access:

```bash
bash localize-images.sh
```

It downloads all 18 images into `images/` and rewrites every reference in
`index.html` and `js/script.js` to point at the local files. After that,
the whole folder is 100% self-contained.

## Deploying

This is a static site — no build step, no server required. Any of these work:

- **Netlify / Vercel**: drag the whole `layerxverse-site` folder onto their
  dashboard, or connect it to a git repo.
- **GitHub Pages**: push the folder to a repo, enable Pages on the `main`
  branch.
- **Any regular web host / cPanel**: upload the folder's contents into
  `public_html` (or your site root) via FTP/File Manager.

Either way, `index.html` is the entry point — make sure `css/`, `js/`, and
`images/` stay in the same relative locations next to it.

## Contact & ordering

- Order form and "Start a project" buttons open **WhatsApp**
  (+90 534 414 98 31) with the order details pre-filled — this is what
  notifies your phone the moment someone orders.
- Email fallback: layerxverse@gmail.com
- Update the WhatsApp number in two places if it ever changes:
  `js/script.js` (search for `WHATSAPP_NUMBER`) and the `wa.me` links in
  `index.html`.
