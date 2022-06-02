import { Session } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    account?: {
      id: number;
      email: string;
      pwHash: string;
      nickname: string;
    },
    signup?: {
      email?: string;
      pw?: string;
      nickname?: string;
      certSerial?: string;
    },
  }
}
