<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { myStore } from "../store";

const store = myStore();
const router = useRouter();
const tags = computed(() => store.state.tags);
const curFir: any = computed(() =>
  tags.value.findIndex(
    (item) =>
      item.children.some((item) => item.id === store.state.currentMenu[0]) || 0
  )
);
const curSec = computed({
  get() {
    return (
      tags.value[curFir.value]?.children.findIndex(
        (item) => item.id === store.state.currentMenu[0]
      ) || 0
    );
  },
  set(value: any) {
    router.replace({ query: { type: value } });
    store.commit("modify", {
      currentMenu: [value],
    });
  },
});
</script>

<template>
  <div>
    <div class="container">
      <div class="box">
        <span
          ><Icon
            class="mr8"
            icon="ant-design:folder-open-outlined"
          />一级分类</span
        >
        <div>
          <a-button
            type="link"
            v-for="(item, index) in tags"
            :key="item.id"
            :class="{ active: index === curFir }"
            @click="curSec = item.children[0].id"
            >{{ item.name }}</a-button
          >
        </div>
      </div>
      <div class="box">
        <span
          ><Icon
            class="mr8"
            icon="ant-design:folder-open-outlined"
          />二级分类</span
        >
        <div>
          <a-button
            type="link"
            v-for="(item, index) in tags[curFir]?.children"
            :key="item.id"
            :class="{ active: index == curSec }"
            @click="curSec = item.id"
            >{{ item.name }}</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .box {
    display: flex;
    align-items: center;
    > span {
      margin-right: 10px;
      background-color: #f6f6f6;
      padding: 0 6px;
      line-height: 30px;
      display: inline-block;
      border-radius: 4px;
      color: #34495e;
    }
    .ant-btn-link {
      color: #000;
      &:hover {
        color: #1890ff;
      }
    }
    &:last-of-type {
      margin-top: 10px;
    }
  }
}
.mr8 {
  margin-right: 8px;
}
.active {
  color: #1890ff !important;
}
</style>
