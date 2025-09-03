// pages/api/submit-form.js (ФИНАЛЬНАЯ ВЕРСИЯ С WEBHOOK)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 1. Получаем URL из переменных окружения
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  // 2. Проверяем, что URL вообще задан
  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL is not set in environment variables.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  try {
    const { name, email, message } = req.body;

    // Валидация на сервере
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const payload = {
        name,
        email,
        message,
        receivedAt: new Date().toISOString(),
        source: 'sarkhan.dev-contact-form'
    };

    // 3. Отправляем данные на вебхук n8n
    const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!n8nResponse.ok) {
        // Если n8n вернул ошибку, логируем ее
        const errorBody = await n8nResponse.text();
        console.error('n8n webhook error:', errorBody);
        throw new Error('Failed to send data to n8n.');
    }

    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}