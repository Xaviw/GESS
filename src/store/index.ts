import { InjectionKey } from "@vue/runtime-dom";
import { createStore, Store, useStore as vuexStore } from "vuex";

interface State {
  test: string;
}

export default createStore<State>({
  state: {
    test: "test",
  },
});

export const key: InjectionKey<Store<State>> = Symbol("vuex");

export function useStore() {
  return vuexStore(key);
}
