// components/LikeButton.js
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

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
    // Если кнопка уже лайкнута или занята, предотвращаем действие
    if (busy.current) return; // Busy предотвращает параллельные запросы
    if (liked) {
      // Это сообщение будет показано в tooltip'е благодаря title пропсу
      return; 
    }

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
      alert('Не удалось поставить лайк. Попробуйте позже.'); // Оставляем alert для ошибок
      console.error('Like error:', e);
    } finally {
      busy.current = false;
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || busy.current} // Кнопка блокируется, если уже лайкнута или выполняется запрос
      aria-label="Like"
      title={liked ? 'Уже понравилось' : 'Нравится'} // Здесь устанавливается текст для tooltip
      className="like-button" 
      // Вместо inline-стилей, будем использовать CSS классы для состояний
    >
      {/* 2. Заменяем эмодзи на компонент Icon */}
      <Icon name="heart" className="like-icon" />
      <span>{likes}</span>
    </button>
  );
}