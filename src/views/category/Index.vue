<template>
  <div class="max-area" style="padding: 20px">
    <CascadeMenu />
    <div class="article-area">
      <ArticleCard
        v-for="item in list"
        :key="item.id"
        :data="item"
        @click="$router.push(`/article/${item.id}`)"
      />
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
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const queryParam = reactive({
  page: 1,
  pageSize: 20,
  type: route.query.type as string,
});
let total = 0;
let list = ref<IArticleInfo[]>([]);
const handleSearch = (isPush: boolean = true) => {
  getArticle(queryParam).then(([res]) => {
    if (isPush) {
      list.value.push(...res.data);
    } else {
      list.value = res.data;
    }
    if (res.total !== total) {
      total = res.total;
    }
  });
};

watch(
  () => route.query.type,
  (v) => {
    queryParam.page = 1;
    queryParam.type = v as string;
    handleSearch(false);
  }
);

let observer: any;
onMounted(() => {
  let observer = new IntersectionObserver(
    (entries) => {
      const ratio = entries[0].intersectionRatio;
      if (ratio > 0 && total === 0) {
        handleSearch(false);
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
  observer?.disconnect();
});
</script>

<style lang="less" scoped>
.article-area {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
