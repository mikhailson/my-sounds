// pages/api/audio-directories.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // В production это будет работать только если файлы существуют
  // Для демонстрации возвращаем фиксированный список
  // const audioPath = path.join(process.cwd(), 'public', 'audio');
  const audioPath = path.join(process.cwd(), 'public');
  
  try {
    const items = fs.readdirSync(audioPath);
    const directories = items.filter(item => {
      const itemPath = path.join(audioPath, item);
      return fs.statSync(itemPath).isDirectory() && /^\d{8}$/.test(item);
    }).sort().reverse(); // Сортируем по убыванию (новые первыми)
    
    res.status(200).json({ directories });
  } catch (error) {
    // Если директории не существуют, возвращаем тестовые данные
    res.status(200).json({ 
      directories: ['20251001', '20251002', '20251003'] 
    });
  }
}

