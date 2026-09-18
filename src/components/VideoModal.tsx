import React from 'react';
import { VideoItem } from '../types';
import { X, ExternalLink, Play, Eye, Clock } from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Thumbnail / Preview Header */}
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-center justify-center">
            <a
              href="https://www.youtube.com/@jarada"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
            >
              <Play className="w-7 h-7 fill-white ml-1" />
            </a>
          </div>
          <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">
            {video.duration}
          </span>
        </div>

        {/* Video Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="text-red-400 font-bold">최민준의 아들 TV</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {video.views}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
            {video.title}
          </h3>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {video.description}
          </p>

          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <span className="text-[11px] text-slate-400">유튜브 공식 채널에서 전체 영상 시청</span>
            <a
              href="https://www.youtube.com/@jarada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <span>YouTube에서 시청하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
