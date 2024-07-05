import { User } from 'firebase/auth';

export interface IAuthState {
  user: User | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}