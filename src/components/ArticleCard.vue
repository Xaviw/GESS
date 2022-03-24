<template>
  <a-card hoverable bordered class="article-card">
    <template #cover>
      <img src="../assets/fmt.jpg" style="border: 1px solid #eee" />
    </template>
    <a-card-meta :title="data.title">
      <template #avatar>
        <div style="text-align: center">
          <a-avatar :src="data.face" />
          <p style="margin-top: 3px">{{ data.userName }}</p>
        </div>
      </template>
      <template #description>
        <div class="flex-between">
          <span class="flex-between"
            ><Icon icon="ant-design:calendar-outlined" />{{
              relTime(data.createTime)
            }}</span
          >
          <span class="flex-between"
            ><Icon icon="akar-icons:eye" />{{ data.views }}</span
          >
          <span class="flex-between"
            ><Icon icon="bx:like" />{{ data.likes }}</span
          >
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script lang="ts" setup>
import { IArticleInfo } from "@/types/common";
import { Icon } from "@iconify/vue";
import { relTime } from "@utils/index";

defineProps<{ data: IArticleInfo }>();
</script>

<style scoped lang="less">
.article-card {
  width: 300px;
  margin: 0 10px 40px 10px;
}

:deep(.ant-card-body) {
  padding: 20px 20px 0 20px;
}
</style>
