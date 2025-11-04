// lib/audioUtils.js
export async function getAudioDirectories() {
  // В Next.js мы можем использовать require.context для сборки,
  // но для клиентской части используем API роут
  
  const response = await fetch('/api/audio-directories');
  const data = await response.json();
  return data.directories;
}

export async function getAudioFiles(directory) {
  const response = await fetch(`/api/audio-files?directory=${directory}`);
  const data = await response.json();
  return data.files;
}

