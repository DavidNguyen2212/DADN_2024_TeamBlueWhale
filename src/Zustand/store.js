import {create} from 'zustand';
import { produce } from 'immer';
import { createSelectors } from './create-selector.ts';

const lvroomInfo = {
  value: {
    autoMode: false,
    temperature: 32, 
    humidity: 80, 
    lux: 600,
    AC: "off", 
    tempAC: 26,
    chandeliers: "off", 
    light1: "off", 
    light2: "off",
    updated_at: ""
  }
}

export const useStore = create((set) => ({
  ...lvroomInfo,

  setTemperature: (new_temp) => set(
    produce((state) => {state.value.temperature = new_temp})),
  setHumidity: (new_humidity) => set(
    produce((state) => {state.value.humidity = new_humidity})),
  setLux: (new_temp) => set(
    produce((state) => {state.value.lux = new_temp})),

  setAutoMode: (new_temp) => set(
    produce((state) => {state.value.autoMode = new_temp})),
  setAC: (new_temp) => set(
    produce((state) => {state.value.AC = new_temp})),
  setTempAC: (new_temp) => set(
    produce((state) => {state.value.tempAC = new_temp})),

  setChandeliers: (new_state) => set(
    produce((state) => {state.value.chandeliers = new_state})),
  setLight1: (new_state) => set(
    produce((state) => {state.value.light1 = new_state})),
  setLight2: (new_state) => set(
    produce((state) => {state.value.light2 = new_state})),

  setUpdated_at: (new_state) => set(
    produce((state) => {state.value.updated_at = new_state})),
  
  // setTemperature: (new_state) => set({ temperature: new_state}),
  // setHumidity: (new_state) => set({ humidity: new_state}),
  // setLux: (new_state) => set({ lux: new_state}),
  
  // setAutoMode: (new_state) => set({ autoMode: new_state}),
  // updateAutoMode: () => set((state) => ({ autoMode: state.autoMode === "on" ? "off" : "on" })),
  
  // setAC: (new_state) => set({ AC: new_state}),
  // setTempAC: (new_state) => set({ tempAC: new_state}),

  // setChandeliers: (new_state) => set({ chandeliers: new_state}),
  // updateChandeliers: () => set((state) => ({ chandeliers: state.chandeliers === "on" ? "off" : "on" })),
  
  // setLight1: (new_state) => set({ light1: new_state}),
  // updateLight1: () => set((state) => ({ light1: state.light1 === "on" ? "off" : "on" })),

  // setLight2: (new_state) => set({ light2: new_state}),
  // updateLight2: () => set((state) => ({ light2: state.light1 === "on" ? "off" : "on" })),
  // toggleState: (key) => set((state) => ({ key: state[key] === "on" ? "off" : "on" })),

}))

export const useStoreSelector = createSelectors(useStore);
export default useStore;

// const useStore = create((set) => ({
//   autoMode: "off", AC: "off", numAC: 26,
//   chandeliers: "off", light1: "off", light2: "off",

//   setAutoMode: (new_state) => set({ autoMode: new_state}),
//   updateAutoMode: () => set((state) => ({ autoMode: state.autoMode === "on" ? "off" : "on" })),

//   setAC: (new_state) => set({ AC: new_state}),
//   updateStateAC: () => set((state) => ({ AC: state.AC === "on" ? "off" : "on" })),
//   setNumAC: (new_state) => set({ numAC: new_state}),

//   setChandeliers: (new_state) => set({ chandeliers: new_state}),
//   updateChandeliers: () => set((state) => ({ chandeliers: state.chandeliers === "on" ? "off" : "on" })),
  
//   setLight1: (new_state) => set({ light1: new_state}),
//   updateLight1: () => set((state) => ({ light1: state.light1 === "on" ? "off" : "on" })),

//   setLight2: (new_state) => set({ light2: new_state}),
//   updateLight2: () => set((state) => ({ light2: state.light1 === "on" ? "off" : "on" })),
// }));

// export default useStore;
