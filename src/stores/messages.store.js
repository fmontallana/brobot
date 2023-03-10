import { create } from "zustand"
import { getRequest } from "../api/request"
import { useUserStore } from "./user.store"

const user = useUserStore.getState().getUser()

export const useMessagesStore = create(
    (set, get) => ({
        messages: [],
        setMessages: (messages) => set({ messages }),
        addMessage: (newMessages) => set({ messages: [...get().messages, ...newMessages] }),

        //getters
        getMessages: () => get().messages,
        getSetMessages: () => get().setMessages,
        getFetchMessagesFromServer: () => get().fetchMessagesFromServer,
    })
)
