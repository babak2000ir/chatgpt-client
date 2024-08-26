import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
    //sample zustand store
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
}));


//Debug
window.useGlobalStore = useGlobalStore;