import {create} from 'zustand';

const useStore = create((set) => ({
  stateAC: "on",
  stateChandelier: "on",
  setStateAC: () => set((state) => ({ stateAC: state.stateAC === "on" ? "off" : "on" })),
  setStateChandelier: () => set((state) => ({ stateChandelier: state.stateChandelier === "on" ? "off" : "on" })),
}));

export default useStore;
