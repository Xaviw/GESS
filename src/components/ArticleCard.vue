<template>
  <a-card hoverable bordered class="article-card">
    <div class="tag">
      <a-tag v-for="(tag, index) in data.tags" :color="COLOR[index % 7]">{{
        tag.name
      }}</a-tag>
    </div>
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
        <div class="flex-around">
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

const COLOR = ["pink", "red", "orange", "green", "cyan", "blue", "purple"];
</script>

<style scoped lang="less">
.article-card {
  width: 300px;
  margin: 0 10px 40px 10px;
  position: relative;
  .tag {
    position: absolute;
    top: 3px;
    right: -5px;
  }
}

:deep(.ant-card-body) {
  padding: 20px 20px 0 20px;
}
:deep(.ant-card-meta-detail) {
  text-align: center;
}
</style>
