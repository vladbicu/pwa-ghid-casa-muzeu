import React from 'react';
import { asset } from '../../utils/asset';

interface LocalVideoPlayerProps {
  url: string;
  thumbnail?: string;
  caption?: string;
}

export function LocalVideoPlayer({ url, thumbnail, caption }: LocalVideoPlayerProps) {
  return (
    <div>
      <video
        src={asset(url)}
        poster={thumbnail ? asset(thumbnail) : undefined}
        controls
        preload="metadata"
        className="w-full rounded-xl aspect-video"
        style={{ maxHeight: 400 }}
      />
      {caption && (
        <p className="text-sm text-museum-walnut/60 italic mt-2 px-1">{caption}</p>
      )}
    </div>
  );
}
