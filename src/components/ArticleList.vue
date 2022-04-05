<template>
  <a-table :columns="columns" :data-source="listData">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'title'">
        <a-badge :dot="record?.isNewComment">
          <router-link :to="`/article/${record.id}`">{{
            record.title
          }}</router-link>
        </a-badge>
      </template>
      <template v-else-if="column.key === 'downLoad'">
        <a-button
          type="primary"
          :href="record.url"
          target="blank"
          @click="downloadArticle(record.id)"
          >下载</a-button
        >
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { IArticle } from "@/types/common";
import { downloadArticle } from "@apis/apis";

const props = defineProps<{ listData: IArticle[]; timeText: string }>();

const columns = [
  { title: "标题", dataIndex: "title", key: "title" },
  { title: props.timeText, dataIndex: "createTime", key: "createTime" },
  { title: "浏览量", dataIndex: "views", key: "views" },
  { title: "点赞数", dataIndex: "likes", key: "likes" },
  { title: "下载", dataIndex: "downLoad", key: "downLoad" },
];
</script>

<style scoped lang="less"></style>
