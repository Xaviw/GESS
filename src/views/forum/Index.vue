<template>
  <div class="max-area">
    <div class="flex-between">
      <h2 style="font-weight: bold; margin: 20px 0 0 0">论坛</h2>
      <a-button type="primary" @click="router.push('/publish/info')"
        >发布信息</a-button
      >
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="0" tab="公告信息"></a-tab-pane>
      <a-tab-pane key="1" tab="考研咨询"></a-tab-pane>
      <a-tab-pane key="2" tab="论坛交流"></a-tab-pane>
    </a-tabs>
    <a-list
      item-layout="horizontal"
      size="large"
      :pagination="pagination"
      :data-source="listData"
      style="padding: 0 0 20px 0"
    >
      <template #renderItem="{ item }">
        <a-list-item
          :key="item.title"
          class="item"
          @click="router.push('/info/' + item.articleId)"
        >
          <template #actions>
            <span>
              <CalendarOutlined style="margin-right: 8px" />
              {{ relTime(item.createTime) }}
            </span>
            <span>
              <EyeOutlined style="margin-right: 8px" />
              {{ item.views }}
            </span>
            <span>
              <LikeOutlined style="margin-right: 8px" />
              {{ item.likes }}
            </span>
          </template>
          <a-list-item-meta :title="item.userName">
            <template #avatar
              ><a-avatar :src="item.face">
                <template #icon>
                  <UserOutlined />
                </template> </a-avatar
            ></template>
          </a-list-item-meta>
          {{ item.title }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import {
  LikeOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref, watchEffect } from "vue";
import { getNotice } from "@apis/apis";
import { INoticeData } from "@/types/common";
import { relTime } from "@utils/index";
import { useRouter } from "vue-router";

let listData = ref<INoticeData[]>([]);
const router = useRouter();

let activeKey = ref(0);

watchEffect(() => {
  getNotice({
    type: activeKey.value,
    page: 1,
    pageSize: 99999,
  }).then(([res]) => {
    if (pagination.total !== res.total) {
      pagination.total = res.total;
    }
    listData.value = res.data;
  });
});

const pagination = reactive({
  total: 0,
});
</script>

<style scoped lang="less">
.item {
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
}
:deep(.ant-list-item) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:deep(.ant-list-item-meta) {
  align-items: center;
  margin-bottom: 10px;
}
:deep(.ant-list-item-action) {
  margin-top: 10px;
}
</style>
