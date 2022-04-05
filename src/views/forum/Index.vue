<template>
  <div class="max-area">
    <div class="container">
      <div class="forum">
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
      <div class="frame">
        <iframe
          src="https://m.juyingonline.com/school"
          frameborder="0"
          style="width: 100%; height: calc(100vh - 72px)"
        ></iframe>
      </div>
    </div>
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

<style scoped lang="less">
.container {
  display: flex;
  position: relative;
  .forum {
    flex-grow: 1;
  }
  .frame {
    width: 450px;
    height: calc(100vh - 126px);
    margin: 20px 0 0 20px;
    position: sticky;
    top: 20px;
    overflow: hidden;
  }
}
</style>
