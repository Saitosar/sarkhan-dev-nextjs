import { useEffect, useRef, useState } from 'react';

export default function LikeButton({ postId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(Number(initialLikes) || 0);
  const [liked, setLiked] = useState(false);
  const busy = useRef(false);

  // читаем локальную отметку, лайкал ли этот пост в этом браузере
  useEffect(() => {
    try {
      const v = localStorage.getItem(`liked:${postId}`);
      if (v === '1') setLiked(true);
    } catch {}
  }, [postId]);

  async function handleLike() {
    if (busy.current || liked) return;
    busy.current = true;

    // мгновенная реакция UI
    setLiked(true);
    setLikes((n) => n + 1);

    try {
      const base = process.env.NEXT_PUBLIC_STRAPI_URL;
      const res = await fetch(`${base}/api/posts/${postId}/like`, { method: 'POST' });
      const data = await res.json(); // ждём { id, likes }
      if (typeof data.likes === 'number') setLikes(data.likes);
      localStorage.setItem(`liked:${postId}`, '1');
    } catch (e) {
      // откат при ошибке
      setLiked(false);
      setLikes((n) => Math.max(0, n - 1));
      alert('Не удалось поставить лайк. Попробуйте позже.');
      console.error('Like error:', e);
    } finally {
      busy.current = false;
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || busy.current}
      aria-label="Like"
      title={liked ? 'Уже понравилось' : 'Нравится'}
      style={{
        padding: '8px 12px',
        borderRadius: '9999px',
        border: '1px solid var(--color-primary, #e2e8f0)',
        background: liked ? 'var(--color-primary, #e2e8f0)' : 'transparent',
        transition: 'transform .1s ease',
        cursor: liked ? 'default' : 'pointer',
      }}
      onMouseDown={(e) => !liked && (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      ❤️ {likes}
    </button>
  );
}
