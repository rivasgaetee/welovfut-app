import { Timestamp } from 'firebase/firestore';

export type UserProfile = {
  email: string;
  username: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  googleId: string | null;
  facebookId: string | null;
  authProvider: string;
  dateJoined: Timestamp;
  lastLogin: Timestamp;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  displayName: string;
  photoURL: string | null;
};