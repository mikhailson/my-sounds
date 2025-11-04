// pages/audio.js
import { useState, useEffect } from 'react';
import { getAudioDirectories, getAudioFiles } from '../lib/audioUtils';
import AudioPlayer from '../components/AudioPlayer';

export default function AudioPage() {
  const [directories, setDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDirectories();
  }, []);

  const loadDirectories = async () => {
    try {
      const dirs = await getAudioDirectories();
      setDirectories(dirs);
    } catch (error) {
      console.error('Error loading directories:', error);
    }
  };

  const handleDirectoryClick = async (directory) => {
    setLoading(true);
    setSelectedDirectory(directory);
    
    try {
      const files = await getAudioFiles(directory);
      setAudioFiles(files);
    } catch (error) {
      console.error('Error loading audio files:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="container">
      <h1>Аудио архив</h1>
      
      <div className="directories">
        <h2>Директории по датам</h2>
        {directories.length === 0 ? (
          <p>Загрузка директорий...</p>
        ) : (
          <div className="directory-list">
            {directories.map(dir => (
              <div 
                key={dir}
                className={`directory-item ${selectedDirectory === dir ? 'active' : ''}`}
                onClick={() => handleDirectoryClick(dir)}
              >
                <span className="date">{formatDate(dir)}</span>
                <span className="folder-name">({dir})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && <p>Загрузка аудиофайлов...</p>}

      {selectedDirectory && audioFiles.length > 0 && !loading && (
        <div className="audio-section">
          <h2>Аудиофайлы из директории {formatDate(selectedDirectory)}</h2>
          <AudioPlayer 
            audioFiles={audioFiles}
            basePath={`/${selectedDirectory}`}
          />
        </div>
      )}

      {selectedDirectory && audioFiles.length === 0 && !loading && (
        <p>В этой директории нет аудиофайлов</p>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .directories {
          margin-bottom: 30px;
        }
        .directory-list {
          display: grid;
          gap: 10px;
        }
        .directory-item {
          padding: 15px;
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .directory-item:hover {
          border-color: #0070f3;
          background: #f8f9fa;
        }
        .directory-item.active {
          border-color: #0070f3;
          background: #e3f2fd;
        }
        .date {
          font-weight: bold;
          margin-right: 10px;
        }
        .folder-name {
          color: #666;
          font-size: 0.9em;
        }
        .audio-section {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
}

