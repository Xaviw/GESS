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
import { myStore } from "@/store";
import { IArticleInfo } from "@/types/common";
import { ref, watchEffect } from "vue";

const store = myStore();

let list = ref<IArticleInfo[]>([]);
const handleSearch = (param: any) => {
  getArticle(param).then(([res]) => {
    list.value = res.data;
  });
};
watchEffect(() => {
  const queryParam = {
    page: 1,
    pageSize: 999,
    type: store.state.currentMenu[0],
  };
  handleSearch(queryParam);
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
