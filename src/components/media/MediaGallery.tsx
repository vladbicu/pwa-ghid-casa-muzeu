import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StopMedia, Lang } from '../../types';
import { YouTubePlayer } from './YouTubePlayer';
import { LocalVideoPlayer } from './LocalVideoPlayer';
import { getUI } from '../../i18n/ui';
import { asset } from '../../utils/asset';

interface MediaGalleryProps {
  media?: StopMedia[];
  lang: Lang;
  fallbackImage?: string;
  videoEnabled?: boolean;
}

function getCaption(item: StopMedia, lang: Lang): string | undefined {
  return item.caption?.[lang] ?? item.caption?.ro;
}

function getThumbnail(item: StopMedia): string | undefined {
  return item.thumbnail;
}

function MediaItem({
  item,
  lang,
  videoEnabled,
  ui,
}: {
  item: StopMedia;
  lang: Lang;
  videoEnabled: boolean;
  ui: ReturnType<typeof getUI>;
}) {
  const caption = getCaption(item, lang);

  if (item.type === 'youtube' && videoEnabled) {
    return (
      <YouTubePlayer
        videoId={item.url}
        thumbnail={getThumbnail(item)}
        caption={caption}
        watchVideoLabel={ui.watchVideo}
        offlineLabel={ui.videoUnavailableOffline}
      />
    );
  }

  if (item.type === 'video-local' && videoEnabled) {
    return (
      <LocalVideoPlayer
        url={item.url}
        thumbnail={getThumbnail(item)}
        caption={caption}
      />
    );
  }

  // image (or video filtered out)
  if (item.type === 'image') {
    return (
      <div>
        <img
          src={asset(item.url)}
          alt={caption ?? ''}
          className="w-full rounded-xl object-cover"
          style={{ maxHeight: 320 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {caption && (
          <p className="text-sm text-museum-walnut/60 italic mt-2 px-1">{caption}</p>
        )}
      </div>
    );
  }

  return null;
}

export function MediaGallery({
  media,
  lang,
  fallbackImage,
  videoEnabled = true,
}: MediaGalleryProps) {
  const ui = getUI(lang);

  const effectiveMedia = videoEnabled
    ? (media ?? [])
    : (media ?? []).filter((m) => m.type === 'image');

  if (effectiveMedia.length === 0) {
    if (!fallbackImage) return null;
    return (
      <img
        src={asset(fallbackImage)}
        alt=""
        className="w-full h-full object-cover"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
    );
  }

  if (effectiveMedia.length === 1) {
    return (
      <MediaItem
        item={effectiveMedia[0]}
        lang={lang}
        videoEnabled={videoEnabled}
        ui={ui}
      />
    );
  }

  return <MultiMediaGallery items={effectiveMedia} lang={lang} videoEnabled={videoEnabled} ui={ui} />;
}

function MultiMediaGallery({
  items,
  lang,
  videoEnabled,
  ui,
}: {
  items: StopMedia[];
  lang: Lang;
  videoEnabled: boolean;
  ui: ReturnType<typeof getUI>;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div>
      {/* Hero */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <MediaItem
            item={items[activeIdx]}
            lang={lang}
            videoEnabled={videoEnabled}
            ui={ui}
          />
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail carousel */}
      <div className="flex gap-2 mt-2 overflow-x-auto scroll-snap-x pb-1">
        {items.map((item, idx) => {
          const thumb =
            item.thumbnail ??
            (item.type === 'image' ? item.url : undefined);
          const isActive = idx === activeIdx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden scroll-snap-start border-2 transition-all ${
                isActive ? 'border-museum-moss' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              {thumb ? (
                <img
                  src={asset(thumb)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-museum-sand flex items-center justify-center text-museum-walnut/40 text-xs">
                  ▶
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
