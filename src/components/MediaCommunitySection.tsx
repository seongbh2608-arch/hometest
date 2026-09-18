import React, { useState } from 'react';
import { VideoItem, TestimonialItem } from '../types';
import { YOUTUBE_VIDEOS, INITIAL_TESTIMONIALS } from '../data/mockData';
import { dataService } from '../services/dataService';
import { MessageSquare, Send, Heart, ThumbsUp, Play } from 'lucide-react';

interface MediaCommunitySectionProps {
  userId: string;
  reactions: Record<string, { likesCount: number; likedBy: string[] }>;
  userComments: TestimonialItem[];
  onOpenVideo: (video: VideoItem) => void;
}

export const MediaCommunitySection: React.FC<MediaCommunitySectionProps> = ({
  userId,
  reactions,
  userComments,
  onOpenVideo
}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Combine initial testimonials with user-submitted comments
  const allTestimonials = [...INITIAL_TESTIMONIALS, ...userComments];

  const handleLikeToggle = async (item: TestimonialItem) => {
    const currentReaction = reactions[item.id];
    const isLiked = currentReaction?.likedBy?.includes(userId) ?? false;
    await dataService.toggleTestimonialLike(item.id, isLiked, userId, item.defaultLikes);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setIsSubmitting(true);
    try {
      const name = authorName.trim() || '학부모 회원';
      await dataService.addComment(name, newCommentText.trim());
      setNewCommentText('');
      setShowCommentForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        {/* Media Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            최민준의 아들 TV
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-2">
            87만 구독자로 인증받은 교육기관,
            <br className="sm:hidden" /> 자라다 유튜브 채널에서 실제 수업 사례와 효과를 공유합니다.
          </p>
        </div>

        {/* YouTube Video Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {YOUTUBE_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => onOpenVideo(video)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
                <img
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  src={video.thumbnail}
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 flex items-center justify-center transition-colors">
                  <span className="relative flex items-center justify-center w-11 h-11">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 group-hover:animate-ping"></span>
                    <span className="relative w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </span>
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <h3 className="text-xs md:text-sm font-bold text-slate-900 mt-2.5 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
                {video.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                최민준의 아들 TV · {video.views}
              </p>
            </div>
          ))}
        </div>

        {/* Verified Parent Testimonials List (Real-time Firestore Sync) */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>학부모 실시간 생생 반응</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                실시간 동기화
              </span>
            </h3>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showCommentForm ? '작성 닫기' : '의견 남기기'}</span>
            </button>
          </div>

          {/* Optional Comment Input Box */}
          {showCommentForm && (
            <form
              onSubmit={handleCommentSubmit}
              className="p-4 bg-slate-50 border border-amber-200 rounded-xl space-y-3 animate-in fade-in duration-200"
            >
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="작성자 닉네임 (예: 7세 남아맘)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-md w-48 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <span className="text-[11px] text-slate-400">자라다 수업 및 아들TV 시청 소감을 남겨주세요.</span>
              </div>
              <div className="flex gap-2">
                <textarea
                  placeholder="아이와 함께하며 느낀 변화나 응원의 한마디를 적어주세요..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-3 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newCommentText.trim()}
                  className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-bold px-4 rounded-md text-xs flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Testimonial Cards */}
          {allTestimonials.map((item) => {
            const reaction = reactions[item.id];
            const isLiked = reaction?.likedBy?.includes(userId) ?? false;
            const currentLikes =
              reaction?.likesCount !== undefined
                ? item.defaultLikes + reaction.likesCount
                : item.defaultLikes;

            return (
              <div
                key={item.id}
                className="bg-slate-50 hover:bg-slate-100/90 border border-slate-200 rounded-xl p-4 text-xs md:text-sm text-slate-700 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-300 text-[10px] text-slate-700 inline-flex items-center justify-center font-bold">
                      @
                    </span>
                    <span>{item.author}</span>
                    {item.isCustom && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-medium">
                        최근 등록
                      </span>
                    )}
                  </span>

                  {/* Real-time Interactive Like Button */}
                  <button
                    onClick={() => handleLikeToggle(item)}
                    className={`text-xs flex items-center gap-1.5 border rounded-full px-3 py-1 active:scale-95 transition-all duration-200 cursor-pointer ${
                      isLiked
                        ? 'bg-amber-100 border-amber-300 text-amber-700 font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600'
                    }`}
                  >
                    <span>{isLiked ? '❤️' : '👍'}</span>
                    <span className="font-semibold">{Math.max(0, currentLikes)}</span>
                  </button>
                </div>
                <p className="leading-relaxed text-slate-700">{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
