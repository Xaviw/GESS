<template>
  <component :is="layout"> </component>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import Basic from "@/layouts/basic.vue";
import Blank from "@/layouts/blank.vue";

const layout = ref(null);
const route = useRoute();

watch(
  () => route.meta,
  async (meta) => {
    switch (meta.layout) {
      case "blank":
        layout.value = Blank;
        break;
      default:
        layout.value = Basic;
    }
  },
  { immediate: true }
);
</script>
