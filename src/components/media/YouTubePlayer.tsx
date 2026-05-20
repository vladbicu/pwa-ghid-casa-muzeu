import React, { useState, useEffect } from 'react';
import { Play, WifiOff } from 'lucide-react';
import { asset } from '../../utils/asset';

interface YouTubePlayerProps {
  videoId: string;
  thumbnail?: string;
  caption?: string;
  watchVideoLabel: string;
  offlineLabel: string;
}

export function YouTubePlayer({
  videoId,
  thumbnail,
  caption,
  watchVideoLabel,
  offlineLabel,
}: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (playing) {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 'none' }}
        />
        {caption && (
          <p className="text-sm text-museum-walnut/60 italic mt-2 px-1">{caption}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative w-full rounded-xl overflow-hidden bg-museum-sand cursor-pointer group"
        style={{ aspectRatio: '16/9' }}
        onClick={() => !offline && setPlaying(true)}
        role="button"
        aria-label={watchVideoLabel}
      >
        {thumbnail ? (
          <img
            src={asset(thumbnail)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-museum-sand" />
        )}

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

        {offline ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40">
            <WifiOff size={28} className="text-museum-cream/70" />
            <span className="text-museum-cream/80 text-sm font-medium">{offlineLabel}</span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-museum-walnut/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={28} fill="currentColor" className="text-museum-cream ml-1" />
            </div>
          </div>
        )}
      </div>
      {caption && (
        <p className="text-sm text-museum-walnut/60 italic mt-2 px-1">{caption}</p>
      )}
    </div>
  );
}
