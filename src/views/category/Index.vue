<template>
  <div class="max-area container">
    <CascadeMenu />
    <div class="article-area">
      <ArticleCard v-for="item in list" :key="item.id" :data="item" />
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor" ref="target"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import CascadeMenu from "@/components/CascadeMenu.vue";
import { getArticle } from "@/request/apis";
import { myStore } from "@/store";
import { IArticleInfo } from "@/types/common";
import { onUnmounted, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

const store = myStore();
const route = useRoute();

const target = ref<HTMLElement | null>(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
});

const queryParam = {
  page: 1,
  pageSize: 20,
  type: route.query.type as string,
};
let total = 0;
let list = ref<IArticleInfo[]>([]);
const handleSearch = () => {
  getArticle(queryParam).then(([res]) => {
    list.value.push(...res.data);
    if (res.total !== total) {
      total = res.total;
    }
  });
};
handleSearch();
watch(
  () => route.query.type,
  () => {
    queryParam.page = 1;
    queryParam.type = route.query.type as string;
    list.value = [];
    total = 0;
    handleSearch();
  }
);
watch(targetIsVisible, () => {
  if (targetIsVisible.value && list.value.length < total) {
    queryParam.page++;
    handleSearch();
  }
});

onUnmounted(() => {
  stop();
});
</script>

<style lang="less" scoped>
.container {
  margin: 20px;
}
.article-area {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
