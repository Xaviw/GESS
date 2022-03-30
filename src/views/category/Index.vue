<template>
  <div class="max-area" style="padding: 20px">
    <CascadeMenu />
    <div class="article-area">
      <ArticleCard v-for="item in list" :key="item.id" :data="item" />
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor" id="bottomAnchor"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CascadeMenu from "@/components/CascadeMenu.vue";
import { getArticle } from "@/request/apis";
import { IArticleInfo } from "@/types/common";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

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
let observer: any;
onMounted(() => {
  let observer = new IntersectionObserver(
    (entries) => {
      const ratio = entries[0].intersectionRatio;
      if (ratio > 0 && total === 0) {
        handleSearch();
      } else if (ratio > 0 && list.value.length < total) {
        queryParam.page++;
        handleSearch();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(document.getElementById("bottomAnchor")!);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<style lang="less" scoped>
.article-area {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
