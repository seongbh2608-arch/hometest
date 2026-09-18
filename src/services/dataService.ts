import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInAnonymously, 
  signOut,
  collection, 
  doc, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  increment,
  arrayUnion,
  arrayRemove
} from '../lib/firebase';
import { Reservation, TestimonialItem } from '../types';

export const dataService = {
  // --- AUTH METHODS ---
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      // If popup blocked or failed, allow guest sign-in fallback
      throw err;
    }
  },

  async signInAsGuest(displayName?: string) {
    const cred = await signInAnonymously(auth);
    return cred.user;
  },

  async logout() {
    await signOut(auth);
  },

  // --- RESERVATION METHODS (REAL-TIME SYNC) ---
  subscribeAllReservations(callback: (reservations: Reservation[]) => void) {
    try {
      const q = collection(db, 'reservations');
      return onSnapshot(q, (snapshot) => {
        const list: Reservation[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<Reservation, 'id'>) });
        });
        callback(list);
      }, (err) => {
        console.warn('Real-time reservations listener notice:', err);
        // Fallback to local storage if needed
        const local = localStorage.getItem('jarada_reservations');
        if (local) {
          try { callback(JSON.parse(local)); } catch (e) {}
        }
      });
    } catch (e) {
      console.warn('subscribeAllReservations init error:', e);
      return () => {};
    }
  },

  async createReservation(reservation: Omit<Reservation, 'id' | 'createdAt'>): Promise<string> {
    const newDoc: Omit<Reservation, 'id'> = {
      ...reservation,
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, 'reservations'), newDoc);
      // Also cache locally for immediate responsiveness
      const local = localStorage.getItem('jarada_reservations');
      const list: Reservation[] = local ? JSON.parse(local) : [];
      list.unshift({ id: docRef.id, ...newDoc });
      localStorage.setItem('jarada_reservations', JSON.stringify(list));
      return docRef.id;
    } catch (err) {
      console.warn('Firestore write failed, saving to local cache:', err);
      const tempId = 'local-' + Date.now();
      const local = localStorage.getItem('jarada_reservations');
      const list: Reservation[] = local ? JSON.parse(local) : [];
      list.unshift({ id: tempId, ...newDoc });
      localStorage.setItem('jarada_reservations', JSON.stringify(list));
      return tempId;
    }
  },

  async cancelReservation(id: string) {
    try {
      const docRef = doc(db, 'reservations', id);
      await updateDoc(docRef, { status: 'cancelled' });
    } catch (err) {
      console.warn('Firestore cancel failed, updating local cache:', err);
      const local = localStorage.getItem('jarada_reservations');
      if (local) {
        try {
          const list: Reservation[] = JSON.parse(local);
          const updated = list.map(r => r.id === id ? { ...r, status: 'cancelled' as const } : r);
          localStorage.setItem('jarada_reservations', JSON.stringify(updated));
        } catch (e) {}
      }
    }
  },

  // --- TESTIMONIAL REACTIONS (REAL-TIME LIKES) ---
  subscribeReactions(callback: (reactions: Record<string, { likesCount: number; likedBy: string[] }>) => void) {
    try {
      const colRef = collection(db, 'testimonialReactions');
      return onSnapshot(colRef, (snapshot) => {
        const reactions: Record<string, { likesCount: number; likedBy: string[] }> = {};
        snapshot.forEach((docSnap) => {
          reactions[docSnap.id] = docSnap.data() as { likesCount: number; likedBy: string[] };
        });
        callback(reactions);
      }, (err) => {
        console.warn('Reactions subscription notice:', err);
      });
    } catch (e) {
      return () => {};
    }
  },

  async toggleTestimonialLike(testimonialId: string, currentLiked: boolean, userId: string, initialLikes: number = 0) {
    try {
      const docRef = doc(db, 'testimonialReactions', testimonialId);
      if (currentLiked) {
        await updateDoc(docRef, {
          likesCount: increment(-1),
          likedBy: arrayRemove(userId)
        });
      } else {
        await setDoc(docRef, {
          testimonialId,
          likesCount: increment(1),
          likedBy: arrayUnion(userId)
        }, { merge: true });
      }
    } catch (err) {
      console.warn('Real-time like toggle failed:', err);
    }
  },

  // --- USER CREATED COMMENTS / INQUIRIES (REAL-TIME) ---
  subscribeComments(callback: (comments: TestimonialItem[]) => void) {
    try {
      const colRef = collection(db, 'userComments');
      return onSnapshot(colRef, (snapshot) => {
        const list: TestimonialItem[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<TestimonialItem, 'id'>) });
        });
        callback(list);
      }, (err) => {
        console.warn('Comments subscription notice:', err);
      });
    } catch (e) {
      return () => {};
    }
  },

  async addComment(author: string, content: string): Promise<void> {
    try {
      await addDoc(collection(db, 'userComments'), {
        author,
        content,
        defaultLikes: 1,
        createdAt: new Date().toISOString(),
        isCustom: true
      });
    } catch (err) {
      console.warn('Comment write notice:', err);
    }
  }
};
