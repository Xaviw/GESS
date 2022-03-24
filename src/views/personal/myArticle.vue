<template>
  <a-table :columns="columns" :data-source="list">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'title'">
        <router-link :to="`/article/${record.id}`">{{
          record.title
        }}</router-link>
      </template>
      <template v-else-if="column.key === 'status'">
        {{
          record["status"]
            ? `${ArticleStatus[record["status"]]}（${record.reason}）`
            : ArticleStatus[record["status"]]
        }}
      </template>
      <template v-else-if="column.key === 'downLoad'">
        <a-button type="primary">下载</a-button>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { IArticle, ArticleStatus } from "@/types/common";
import { ref } from "vue";
import { getMyArticle } from "@apis/apis";

const list = ref<IArticle[]>([]);
const pageQuery = {
  page: 1,
  pageSize: 9999,
};
const columns = [
  { title: "标题", dataIndex: "title", key: "title" },
  { title: "创建时间", dataIndex: "createTime", key: "createTime" },
  { title: "状态", dataIndex: "status", key: "status" },
  { title: "浏览量", dataIndex: "views", key: "views" },
  { title: "点赞数", dataIndex: "likes", key: "likes" },
  { title: "下载", dataIndex: "downLoad", key: "downLoad" },
];

getMyArticle(pageQuery).then(([res]) => {
  list.value = res.data;
});
</script>

<style scoped lang="less"></style>
