<template>
  <a-back-top />
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import { useRoute } from "vue-router";
import { initUserState } from "./utils";

const appTitle = import.meta.env.VITE_APP_TITLE;
provide("appTitle", appTitle);

const modules = import.meta.globEager("./layouts/*.vue");

const route = useRoute();

let layout = computed(() => {
  return modules[`./layouts/${route.meta.layout}.vue`]?.default;
});

initUserState();
</script>
