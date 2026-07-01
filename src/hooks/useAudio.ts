import { useCallback, useEffect } from 'react';
import OpenSound from '../assets/open.mp3';
import { useAppSelector } from '../store/hooks';

const audioCache: Record<string, HTMLAudioElement> = {};
const path = OpenSound;

export function useAudio() {
  const { volume, isMuted } = useAppSelector((state) => state.system.audio);

  useEffect(() => {
    if (!audioCache[path]) {
      audioCache[path] = new Audio(path);
      audioCache[path].preload = 'auto';
    }

    audioCache[path].volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  const play = useCallback(() => {
    const audio = audioCache[path];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.warn('Navegador bloqueou a reprodução de som.', error);
    });
  }, []);

  return { play };
}
