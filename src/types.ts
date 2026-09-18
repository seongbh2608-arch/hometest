export interface Reservation {
  id?: string;
  userId: string;
  userEmail?: string;
  parentName: string;
  parentPhone: string;
  childName: string;
  childAge: number;
  branchName: string;
  reservationDate: string; // YYYY-MM-DD
  timeSlot: string; // "10:00", "11:30", "14:00", "15:30", "17:00"
  consultationNote?: string;
  childTraits?: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  content: string;
  defaultLikes: number;
  likesCount?: number;
  likedBy?: string[];
  createdAt?: string;
  isCustom?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  views: string;
  duration: string;
  thumbnail: string;
  youtubeUrl: string;
  description: string;
}
