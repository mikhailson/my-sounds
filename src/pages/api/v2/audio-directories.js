import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const directories = [];
    
    // Читаем содержимое папки public
    const items = fs.readdirSync(publicDir, { withFileTypes: true });
    
    // Фильтруем только директории с названием в формате YYYYMMDD
    const dateDirs = items.filter(item => 
      item.isDirectory() && /^\d{8}$/.test(item.name)
    );
    
    // Для каждой директории находим аудиофайлы
    dateDirs.forEach(dir => {
      const dirPath = path.join(publicDir, dir.name);
      const files = fs.readdirSync(dirPath);
      
      // Фильтруем аудиофайлы по расширению
      const audioFiles = files
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.mp3', '.wav', '.ogg', '.oga', '.m4a', '.aac'].includes(ext);
        })
        .map(file => ({
          name: file,
          // Можно добавить получение длительности файла если нужно
          // duration: getAudioDuration(path.join(dirPath, file))
        }));
      
      if (audioFiles.length > 0) {
        directories.push({
          name: dir.name,
          files: audioFiles
        });
      }
    });
    
    // Сортируем директории по дате (новые сначала)
    directories.sort((a, b) => b.name.localeCompare(a.name));
    
    res.status(200).json({ directories });
    
  } catch (error) {
    console.error('Error reading directories:', error);
    res.status(500).json({ error: 'Failed to read audio directories' });
  }
}
