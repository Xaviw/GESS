<template>
  <ArticleList :listData="list" timeText="创建时间" />
</template>

<script lang="ts" setup>
import { IArticle } from "@/types/common";
import { ref } from "vue";
import { getMyArticle } from "@apis/apis";
import ArticleList from "@comps/ArticleList.vue";

const list = ref<IArticle[]>([]);
const pageQuery = {
  page: 1,
  pageSize: 9999,
};

getMyArticle(pageQuery).then(([res]) => {
  list.value = res?.data;
});
</script>

<style scoped lang="less"></style>
