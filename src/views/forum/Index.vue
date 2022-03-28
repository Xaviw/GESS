<template>
  <div class="max-area">
    <h2 style="font-weight: bold; margin: 20px 0">论坛</h2>
    <a-list
      item-layout="horizontal"
      size="large"
      :pagination="pagination"
      :data-source="listData"
      style="padding: 0 0 20px 0"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
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
            <template #avatar
              ><a-avatar :src="item.face">
                <template #icon>
                  <UserOutlined />
                </template> </a-avatar
            ></template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import { LikeOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { getNotice } from "@apis/apis";
import { INoticeData } from "@/types/common";

let listData = ref<INoticeData[]>([]);

getNotice({
  type: 1,
  page: 1,
  pageSize: 99999,
}).then(([res]) => {
  if (pagination.total !== res.total) {
    pagination.total = res.total;
  }
  listData.value = res.data;
});

const pagination = reactive({
  total: 0,
});
</script>

<style scoped lang="less"></style>
