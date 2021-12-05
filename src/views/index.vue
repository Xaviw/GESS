<script setup lang="ts">
import http from "@/apis/request";
import { useStore } from "@store/index";
import { ref } from "vue";

const msg = ref("");
http.post("/login", {}).then((res) => {
  msg.value = res.data?.msg;
});
const store = useStore();
</script>

<template>
  <h1>Index</h1>
  <h2>{{ store.state.test }}</h2>
  <h2>{{ msg }}</h2>
</template>
