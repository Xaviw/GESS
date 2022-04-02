<template>
  <div class="max-area">
    <div class="flex-between">
      <h2 style="font-weight: bold; margin: 20px 0 0 0">学习圈</h2>
      <a-button type="primary" @click="$router.push('/publish/info')"
        >发布信息</a-button
      >
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="0" tab="公告信息"></a-tab-pane>
      <a-tab-pane key="2" tab="交流论坛"></a-tab-pane>
    </a-tabs>
    <NoticeList :list-data="listData" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { getNotice } from "@apis/apis";
import { INoticeData } from "@/types/common";
import NoticeList from "@/components/NoticeList.vue";

let listData = ref<INoticeData[]>([]);

let activeKey = ref(0);

watchEffect(() => {
  getNotice({
    type: activeKey.value,
    page: 1,
    pageSize: 99999,
  }).then(([res]) => {
    listData.value = res.data;
  });
});
</script>
