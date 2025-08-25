// lib/strapi.js
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/**
 * Универсальная функция для получения и обработки постов из Strapi.
 * @param {object} options - Опции для запроса.
 * @param {string} options.locale - Язык ('az', 'en', 'ru').
 * @param {number} [options.page=1] - Номер страницы для пагинации.
 * @param {number} [options.pageSize=10] - Количество постов на странице.
 * @returns {Promise<{posts: Array, pagination: object}>}
 */
export async function getProcessedPosts({ locale, page = 1, pageSize = 10 }) {
  const url = `${API_URL}/api/posts?locale=${locale}&populate=cover&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const response = await res.json();
    const postsData = response.data || [];
    const pagination = response.meta.pagination || {};

    const markdownConverter = new showdown.Converter();

    const processedPosts = postsData.map((post) => {
      const content = post.content || '';
      const rawHtml = markdownConverter.makeHtml(content);

      // Наша "умная" логика для excerpt
      let excerpt = post.excerpt;
      if (!excerpt) {
        const plainText = rawHtml.replace(/<[^>]*>?/gm, '');
        excerpt = plainText.substring(0, 150) + '...';
      }

      return {
        ...post,
        content,
        sanitizedBody: DOMPurify.sanitize(rawHtml),
        excerpt,
      };
    });

    return { posts: processedPosts, pagination };

  } catch (error) {
    console.error("Strapi fetch error:", error);
    return { posts: [], pagination: {} }; // В случае ошибки возвращаем пустые данные
  }
}