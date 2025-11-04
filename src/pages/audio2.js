// pages/audio.js
import { useState, useEffect } from 'react';

export default function AudioPage() {
  const [directories, setDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);

  // Тестовые данные - замените на реальные
  const audioData = {
    '20251001': ['song1.mp3', 'song2.mp3'],
    '20251002': ['track1.mp3', 'track2.mp3', 'track3.mp3'],
    '20251003': ['recording1.mp3'],
    '20251004': ['audio1.mp3', 'audio2.mp3', 'audio3.mp3', 'audio4.mp3']
  };

  useEffect(() => {
    // Имитация загрузки данных
    const dirs = Object.keys(audioData).sort().reverse();
    setDirectories(dirs);
  }, []);

  const handleDirectoryClick = (directory) => {
    setSelectedDirectory(directory);
    setAudioFiles(audioData[directory] || []);
  };

  const formatDate = (dateStr) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="container">
      <h1>🎵 Аудио Архив</h1>
      
      <div className="directories">
        <h2>📁 Директории по датам</h2>
        <div className="directory-grid">
          {directories.map(dir => (
            <div 
              key={dir}
              className={`directory-card ${selectedDirectory === dir ? 'active' : ''}`}
              onClick={() => handleDirectoryClick(dir)}
            >
              <div className="folder-icon">📂</div>
              <div className="date">{formatDate(dir)}</div>
              <div className="file-count">
                {audioData[dir]?.length || 0} файлов
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDirectory && (
        <div className="audio-section">
          <h2>🎧 Аудиофайлы - {formatDate(selectedDirectory)}</h2>
          
          {audioFiles.length > 0 ? (
            <div className="audio-files">
              {audioFiles.map((file, index) => (
                <AudioFileItem 
                  key={file}
                  file={file}
                  directory={selectedDirectory}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p className="no-files">Нет аудиофайлов в этой директории</p>
          )}
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }
        
        h2 {
          color: #555;
          margin-bottom: 20px;
        }
        
        .directory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .directory-card {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }
        
        .directory-card:hover {
          border-color: #2196F3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .directory-card.active {
          border-color: #2196F3;
          background: #e3f2fd;
        }
        
        .folder-icon {
          font-size: 2em;
          margin-bottom: 10px;
        }
        
        .date {
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        
        .file-count {
          font-size: 0.9em;
          color: #666;
        }
        
        .audio-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
        }
        
        .audio-files {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .no-files {
          text-align: center;
          color: #999;
          font-style: italic;
          padding: 40px;
        }
      `}</style>
    </div>
  );
}

// Компонент для отдельного аудиофайла
function AudioFileItem({ file, directory, index }) {
  const audioPath = `/${directory}/${file}`;
  
  return (
    <div className="audio-item">
      <div className="audio-header">
        <span className="track-number">{index + 1}.</span>
        <span className="file-name">{file}</span>
      </div>
      
      <div className="audio-player">
        <audio 
          controls 
          controlsList="nodownload"
          preload="metadata"
          style={{ width: '100%', height: '40px' }}
        >
          <source src={audioPath} type="audio/mpeg" />
          Ваш браузер не поддерживает аудио элементы.
        </audio>
      </div>
      
      <style jsx>{`
        .audio-item {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          background: white;
          transition: border-color 0.3s ease;
        }
        
        .audio-item:hover {
          border-color: #2196F3;
        }
        
        .audio-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .track-number {
          font-weight: bold;
          margin-right: 10px;
          color: #666;
          min-width: 25px;
        }
        
        .file-name {
          color: #333;
          word-break: break-all;
        }
        
        .audio-player {
          width: 100%;
        }
        
        /* Стилизация аудиоплеера */
        .audio-player audio {
          border-radius: 20px;
          background: #f5f5f5;
        }
        
        .audio-player audio::-webkit-media-controls-panel {
          background: #f5f5f5;
        }
        
        .audio-player audio::-webkit-media-controls-play-button {
          background-color: #2196F3;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
