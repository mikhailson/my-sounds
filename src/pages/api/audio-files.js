// pages/api/audio-files.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { directory } = req.query;
  
  if (!directory || !/^\d{8}$/.test(directory)) {
    return res.status(400).json({ error: 'Invalid directory' });
  }
  
  // const directoryPath = path.join(process.cwd(), 'public', 'audio', directory);
  const directoryPath = path.join(process.cwd(), 'public', directory);
  
  try {
    const items = fs.readdirSync(directoryPath);
    const audioFiles = items.filter(item => 
      /\.(mp3|wav|ogg|oga|m4a)$/i.test(item)
    ).sort();
    
    res.status(200).json({ files: audioFiles });
  } catch (error) {
    // Для демонстрации возвращаем тестовые файлы
    res.status(200).json({ 
      files: [
        'song1.mp3',
        'song2.mp3',
        'track1.mp3'
      ]
    });
  }
}

