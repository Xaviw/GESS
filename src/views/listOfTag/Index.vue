<template>
  <div class="max-area container">
    <CascadeMenu />
    <div class="article-area">
      <ArticleCard v-for="item in list" :key="item.id" :data="item" />
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CascadeMenu from "@/components/CascadeMenu.vue";
import { getArticle } from "@/request/apis";
import { IArticleInfo } from "@/types/common";
import { ref, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
console.log("route: ", toRaw(route));
let type = route.query.type as string;
if (!type) {
  useRouter().back();
}

const queryParam = {
  page: 1,
  pageSize: 999,
  type,
};
let list = ref<IArticleInfo[]>([]);
const handleSearch = () => {
  getArticle(queryParam).then(([res]) => {
    list.value = res.data;
  });
};
handleSearch();
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
