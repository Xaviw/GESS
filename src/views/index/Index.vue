<template>
  <div class="container flex-center">
    <p class="main-title">搜索本站精品学习资料</p>
    <p class="sub-title">找资料真轻松</p>
    <div>
      <a-input-search
        v-model:value="keyWord"
        placeholder="输入关键字搜索"
        size="large"
        @search="handleSearch"
      >
        <template #enterButton>
          <a-button type="primary">
            <template #icon><SearchOutlined /></template>
            搜索
          </a-button>
        </template>
      </a-input-search>
    </div>
  </div>
  <div class="max-area decorate">
    <p>你的前景，远超我们想象</p>
    <em class="divider"></em>
    <div class="article-area">
      <ArticleCard
        v-for="item in list"
        :key="item.id"
        :data="item"
        @click="gotoDetail(item.id)"
      />
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor"></div>
      <div class="anchor" id="bottomAnchor"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import ArticleCard from "@/components/ArticleCard.vue";
import { getArticle } from "@/request/apis";
import { IArticleInfo } from "@/types/common";
import { useRouter } from "vue-router";
import { SearchOutlined } from "@ant-design/icons-vue";

let keyWord = ref("");
let currentKey = "";

const router = useRouter();
const gotoDetail = (id: string) => {
  router.push(`/article/${id}`);
};

const queryParam = {
  page: 1,
  pageSize: 20,
  type: "0",
  keyword: currentKey,
};
let total = 0;
let list = ref<IArticleInfo[]>([]);
const handleSearch = () => {
  if (keyWord.value !== currentKey) {
    queryParam.page = 1;
    total = 0;
    currentKey = keyWord.value;
    list.value = [];
  }
  getArticle(queryParam).then(([res]) => {
    list.value.push(...res.data);
    if (res.total !== total) {
      total = res.total;
    }
  });
};

let observer: any;
onMounted(() => {
  observer = new IntersectionObserver(
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

<style scoped lang="less">
.container {
  background-image: url(@/assets/top.jpg);
  background-position: center;
  background-size: cover;
  height: 460px;
  flex-direction: column;
}
.main-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 25px;
  letter-spacing: 5px;
  margin-bottom: 10px;
}
.sub-title {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  margin-bottom: 40px;
  letter-spacing: 2px;
}
:deep(.ant-input) {
  width: 650px !important;
  height: 49px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 15px;
}
:deep(.ant-input::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}
:deep(.ant-btn-lg) {
  height: 49px;
}
.decorate {
  text-align: center;
  > p {
    font-size: 26px;
    color: #333;
    height: 32px;
    line-height: 32px;
    font-weight: 500;
    margin: 20px 0 0 0;
    padding: 0 80px;
    position: relative;
    display: inline-block;
    &::before {
      content: "";
      width: 61px;
      height: 10px;
      position: absolute;
      top: 10px;
      left: 0;
      background: url(@/assets/decorate.png) center no-repeat;
    }
    &::after {
      content: "";
      width: 61px;
      height: 10px;
      position: absolute;
      top: 10px;
      right: 0;
      background: url(@/assets/decorate.png) center no-repeat;
      transform: rotate(180deg);
    }
  }
}

.divider {
  line-height: 1.5;
  list-style: none;
  text-align: center;
  display: block;
  border-bottom: 1px solid #006eff;
  width: 50px;
  margin: 20px auto;
}

.article-area {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
