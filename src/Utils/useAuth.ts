import {
  getAuthStateFromStorage,
  removeTokenFromStorage,
  syncTokenToStorage,
} from "./auth";
import { create } from "zustand";

interface useAuth {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const initialAuthState = getAuthStateFromStorage();

const useAuth = create<useAuth>((set) => ({
  isLoggedIn: initialAuthState.isLoggedIn,
  userData: null,
  token: initialAuthState.token,
  login: (token) => {
    set({ isLoggedIn: true, token });
    syncTokenToStorage(token);
  },
  logout: () => {
    set({ token: null, isLoggedIn: false });
    removeTokenFromStorage();
  },
}));

export default useAuth;
export type { useAuth };
