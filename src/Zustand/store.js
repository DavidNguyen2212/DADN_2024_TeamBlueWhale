import {create} from 'zustand';

const lvroomInfo = {
    commandAssistant: false,
    autoMode: false,
    temperature: "", 
    humidity: "", 
    lux: "",
    AC: "0", 
    tempAC: 0,
    chandeliers: "OFF", 
    light1: "off", 
    light2: "off",
    updated_at: ""
}

const useStore = create((set) => ({
  ...lvroomInfo,
  setNew: (key, newState) => set((state) => ({ ...state, [key]: newState })),
  setToggleState: (key) => set((state) => ({ [key]: state[key] === "ON" ? "OFF" : "ON" })),
}));

// useStore.subscribe()
export default useStore;
// setStateAC: () => set((state) => ({ stateAC: state.stateAC === "on" ? "off" : "on" })),
// setStateChandelier: () => set((state) => ({ stateChandelier: state.stateChandelier === "on" ? "off" : "on" })),
