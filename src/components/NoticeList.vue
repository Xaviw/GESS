<template>
  <a-list
    item-layout="horizontal"
    size="large"
    :data-source="listData"
    style="padding: 0 0 20px 0"
  >
    <!-- :pagination="pagination" -->
    <template #renderItem="{ item }">
      <a-badge-ribbon
        text="有新的评论！"
        color="volcano"
        :style="{ display: item.isNewComment ? 'block' : 'none' }"
      >
        <a-list-item
          :key="item.title"
          class="item"
          @click="$router.push('/info/' + item.articleId)"
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
          <a-list-item-meta :title="item.title">
            <template #avatar>
              <a-avatar :src="item.face">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <a-typography-text style="margin-left: 5px"
                >{{ item.userName }}：</a-typography-text
              >
            </template>
          </a-list-item-meta>
          {{ item.brief }}
        </a-list-item>
      </a-badge-ribbon>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { INoticeData } from "@/types/common";
import {
  LikeOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";

import { relTime } from "@utils/index";

defineProps<{ listData: INoticeData[] }>();

// const pagination = reactive({
//   total: 0,
// });
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
:deep(.ant-list-item-meta-avatar) {
  margin-right: 0;
}
</style>
