import { useCallback, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import OpenSound from '../assets/open.mp3';

type WebKitFallbackWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

const AudioContextConstructor =
  window.AudioContext || (window as WebKitFallbackWindow).webkitAudioContext;

const audioCtx = AudioContextConstructor ? new AudioContextConstructor() : null;

const bufferCache: Record<string, AudioBuffer> = {};
const path = OpenSound;

const preloadSoundEffect = async (path: string) => {
  if (!audioCtx || bufferCache[path]) return;

  try {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();

    bufferCache[path] = await audioCtx.decodeAudioData(arrayBuffer);
  } catch {
    console.warn('Efeitos sonoros indisponíveis.');
  }
};

preloadSoundEffect(path);

export function useSoundEffect() {
  const { volume, isMuted } = useAppSelector((state) => state.system.audio);

  useEffect(() => {
    if (!audioCtx || audioCtx.state === 'running') return;

    const resumeCtx = () => audioCtx.resume();
    window.addEventListener('click', resumeCtx, { once: true });
    return () => window.removeEventListener('click', resumeCtx);
  }, []);

  const play = useCallback(() => {
    const buffer = bufferCache[path];
    if (!audioCtx || !buffer) return;

    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});

    const player = audioCtx.createBufferSource();
    const volumeControl = audioCtx.createGain();

    player.buffer = buffer;
    volumeControl.gain.value = isMuted ? 0 : volume / 100;

    player.connect(volumeControl);
    volumeControl.connect(audioCtx.destination);

    player.start(0);
  }, [isMuted, volume]);

  return { play };
}
