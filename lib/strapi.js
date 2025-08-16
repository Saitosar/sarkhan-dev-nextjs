const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getPosts(limit = 3, page = 1) {
  const url = `${API_URL}/api/posts?sort=publishedAt:desc&populate=cover&pagination[page]=${page}&pagination[pageSize]=${limit}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getPostBySlug(slug) {
  const url = `${API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=cover`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch post');
  const data = await res.json();
  return data?.data?.[0] || null;
}
