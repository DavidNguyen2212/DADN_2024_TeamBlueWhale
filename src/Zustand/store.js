import {create} from 'zustand';

const lvroomInfo = {
    commandAssistant: false,
    autoMode: false,
    temperature: "", 
    humidity: "", 
    lux: "",
    AC: "off", 
    tempAC: 0,
    chandeliers: "off", 
    light1: "off", 
    light2: "off",
    updated_at: ""
}

const useStore = create((set) => ({
  ...lvroomInfo,
  setNew: (key, newState) => set((state) => ({ ...state, [key]: newState })),
  setToggleState: (key) => set((state) => ({ [key]: state[key] === "on" ? "off" : "on" })),
}));

// useStore.subscribe()
export default useStore;
// setStateAC: () => set((state) => ({ stateAC: state.stateAC === "on" ? "off" : "on" })),
// setStateChandelier: () => set((state) => ({ stateChandelier: state.stateChandelier === "on" ? "off" : "on" })),
