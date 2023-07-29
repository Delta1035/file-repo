import { defineStore } from "pinia";
import { computed, ref } from "vue";

// export const useCounterStore = defineStore("counter", {
//   state: () => ({
//     count: 0,
//     name: "delta",
//   }),
//   getters: {
//     doubbleCount: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++;
//       console.log(this);

//     },
//   },
// });
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("delta");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return {
    count,
    name,
    doubleCount,
    increment,
  };
});
