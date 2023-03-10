//create zustand store for user

import { create } from "zustand";

export const useUserStore = create(
    (set, get) => ({
        user: null,
        setUser: (user) => set({ user }),

        //getters
        getUser: () => get().user,
    })
);
