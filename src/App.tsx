import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, onAuthStateChanged } from './lib/firebase';
import { dataService } from './services/dataService';
import { Reservation, VideoItem, TestimonialItem } from './types';

// Components
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { SatisfactionSection } from './components/SatisfactionSection';
import { MothersConcernsSection } from './components/MothersConcernsSection';
import { TeacherSystemSection } from './components/TeacherSystemSection';
import { MediaCommunitySection } from './components/MediaCommunitySection';
import { MustReadBookSection } from './components/MustReadBookSection';
import { EvaluationSection } from './components/EvaluationSection';
import { FranchiseSection } from './components/FranchiseSection';
import { Footer } from './components/Footer';

// Modals
import { ReservationModal } from './components/ReservationModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { AuthModal } from './components/AuthModal';
import { VideoModal } from './components/VideoModal';

// Icons
import { Calendar, ArrowUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [guestId, setGuestId] = useState<string>('');

  // Real-time collections state
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [reactions, setReactions] = useState<Record<string, { likesCount: number; likedBy: string[] }>>({});
  const [userComments, setUserComments] = useState<TestimonialItem[]>([]);

  // Modals state
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [myReservationsModalOpen, setMyReservationsModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [targetBranchForBooking, setTargetBranchForBooking] = useState<string | undefined>();

  // Floating scroll button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize guest ID or retrieve from localStorage
  useEffect(() => {
    let gid = localStorage.getItem('jarada_guest_uid');
    if (!gid) {
      gid = 'guest_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('jarada_guest_uid', gid);
    }
    setGuestId(gid);
  }, []);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore subscriptions
  useEffect(() => {
    const unsubReservations = dataService.subscribeAllReservations((list) => {
      setAllReservations(list);
    });

    const unsubReactions = dataService.subscribeReactions((reactionMap) => {
      setReactions(reactionMap);
    });

    const unsubComments = dataService.subscribeComments((commentsList) => {
      setUserComments(commentsList);
    });

    return () => {
      unsubReservations();
      unsubReactions();
      unsubComments();
    };
  }, []);

  // Scroll listener for floating action
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter reservations for current user or guest session
  const currentUserReservations = allReservations.filter((r) => {
    if (user && r.userId === user.uid) return true;
    if (user && r.userEmail && r.userEmail === user.email) return true;
    if (!user && r.userId === guestId) return true;
    return false;
  });

  const handleOpenReservation = (branchName?: string) => {
    setTargetBranchForBooking(branchName);
    setReservationModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const effectiveUserId = user ? user.uid : guestId;

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Sticky Navigation Header */}
      <Header
        user={user}
        reservationsCount={currentUserReservations.length}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={async () => {
          await dataService.logout();
        }}
        onOpenReservation={() => handleOpenReservation()}
        onOpenMyReservations={() => setMyReservationsModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Carousel Slider */}
        <HeroSlider onOpenReservation={() => handleOpenReservation()} />

        {/* 2. Satisfaction & Survey Section */}
        <SatisfactionSection />

        {/* 3. Mothers' Real Concerns Section */}
        <MothersConcernsSection />

        {/* 4. Teacher Certification System Section */}
        <TeacherSystemSection />

        {/* 5. Media & Real-time Community Section */}
        <MediaCommunitySection
          userId={effectiveUserId}
          reactions={reactions}
          userComments={userComments}
          onOpenVideo={(video) => setSelectedVideo(video)}
        />

        {/* 6. Must-Read Book Section ("교육의 본질") */}
        <MustReadBookSection onOpenReservation={() => handleOpenReservation()} />

        {/* 7. Diagnostic Class & Consultation Section */}
        <EvaluationSection
          onOpenReservation={() => handleOpenReservation()}
          totalReservationsCount={allReservations.length}
        />

        {/* 8. Nationwide Franchises & Branch Network */}
        <FranchiseSection
          onSelectBranchForBooking={(branch) => handleOpenReservation(branch)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick CTA Bar for Mobile & Floating Action */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-90 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating Quick Booking Pill */}
        <button
          onClick={() => handleOpenReservation()}
          className="btn-shimmer pulse-glow-amber bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-amber-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
          </span>
          <span className="text-xs md:text-sm">성향파악 실시간 신청</span>
          <Calendar className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Modals */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        allReservations={allReservations}
        initialBranch={targetBranchForBooking}
        onReservationSuccess={(res) => {
          // If guest, store ID in localStorage list
          const localList = JSON.parse(localStorage.getItem('jarada_reservations') || '[]');
          localList.unshift(res);
          localStorage.setItem('jarada_reservations', JSON.stringify(localList));
        }}
      />

      <MyReservationsModal
        isOpen={myReservationsModalOpen}
        onClose={() => setMyReservationsModalOpen(false)}
        reservations={currentUserReservations}
        onOpenNewReservation={() => handleOpenReservation()}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={() => {
          setAuthModalOpen(false);
        }}
      />

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
