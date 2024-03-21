import {create} from 'zustand';

const useStore = create((set) => ({
  stateAC: "on",
  stateChandelier: "on",
  setStateAC: (new_state) => set({ stateAC: new_state}),
  updateStateAC: () => set((state) => ({ stateAC: state.stateAC === "on" ? "off" : "on" })),
  setStateChandelier: (new_state) => set({ stateChandelier: new_state}),
  updateStateChandelier: () => set((state) => ({ stateChandelier: state.stateChandelier === "on" ? "off" : "on" })),
}));

export default useStore;
