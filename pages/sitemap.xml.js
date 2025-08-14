// This file should be created at pages/sitemap.xml.js

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${SITE_URL}</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${SITE_URL}/#blog`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // This function is intentionally empty because we are handling
  // everything in getServerSideProps.
}

export async function getServerSideProps({ res }) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const request = await fetch(`${strapiUrl}/api/articles`);
  const response = await request.json();
  const posts = response.data || [];

  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
