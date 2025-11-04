// components/AudioPlayer.js
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ audioFiles, basePath }) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentFile = audioFiles[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleEnded = () => {
      if (currentTrack < audioFiles.length - 1) {
        setCurrentTrack(currentTrack + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, audioFiles.length]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const playTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const formatDate = (dateStr) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={`${basePath}/${currentFile}`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div className="current-track">
        <h3>Сейчас играет:</h3>
        <p>{currentFile}</p>
        <div className="controls">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="play-pause"
          >
            {isPlaying ? '⏸️ Пауза' : '▶️ Воспроизвести'}
          </button>
        </div>
      </div>

      <div className="playlist">
        <h4>Плейлист:</h4>
        <ul>
          {audioFiles.map((file, index) => (
            <li 
              key={file}
              className={`track-item ${index === currentTrack ? 'active' : ''}`}
              onClick={() => playTrack(index)}
            >
              <span className="track-number">{index + 1}.</span>
              <span className="track-name">{file}</span>
              {index === currentTrack && isPlaying && <span> 🔊</span>}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .audio-player {
          max-width: 600px;
          margin: 20px 0;
        }
        .current-track {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .controls {
          margin-top: 10px;
        }
        .play-pause {
          background: #0070f3;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .playlist ul {
          list-style: none;
          padding: 0;
        }
        .track-item {
          padding: 10px;
          border: 1px solid #ddd;
          margin-bottom: 5px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .track-item:hover {
          background: #f0f0f0;
        }
        .track-item.active {
          background: #e3f2fd;
          border-color: #0070f3;
        }
        .track-number {
          margin-right: 10px;
          font-weight: bold;
        }
        .track-name {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

