// pages/blog/index.js (НОВЫЙ ФАЙЛ ДЛЯ РЕДИРЕКТА)
const BlogIndex = () => null;

export const getServerSideProps = async ({ res }) => {
  res.writeHead(301, { Location: '/blog/page/1' });
  res.end();
  return { props: {} };
};

export default BlogIndex;