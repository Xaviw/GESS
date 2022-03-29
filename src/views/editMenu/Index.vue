<template>
  <div class="max-area">
    <h2 style="margin-top: 20px; font-weight: bold">编辑菜单</h2>
    <div class="flex-center">
      <div class="box">
        <div class="container">
          <div
            class="item"
            v-for="(item, index) in tags"
            :class="{ active: currentTag == index }"
            @click="
              currentTag = index;
              currentSub = 0;
            "
          >
            <a-input :value="item.name" placeholder="请输入" />
            <a-button type="primary" class="mr-10" style="margin-left: 20px"
              >修改</a-button
            >
            <a-button
              type="primary"
              danger
              @click="handleDelete(item.id, index, 1)"
              >删除</a-button
            >
          </div>
        </div>
        <a-button style="width: 100%; margin-top: 20px">新增</a-button>
      </div>
      <div class="box">
        <div class="container">
          <div
            class="item"
            v-for="(item, index) in tags[currentTag]?.children"
            :class="{ active: currentSub == index }"
            @click="currentSub = index"
          >
            <a-input :value="item.name" placeholder="请输入" />
            <a-button type="primary" class="mr-10" style="margin-left: 20px"
              >修改</a-button
            >
            <a-button
              type="primary"
              danger
              @click="handleDelete(item.id, index, 0)"
              >删除</a-button
            >
          </div>
        </div>
        <a-button style="width: 100%; margin-top: 20px">新增</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { myStore } from "@/store";
import { computed, ref } from "vue";
import { deleteTag } from "@apis/apis";
import deepClone from "@utils/deepClone";
import { IFirTag } from "@/types/common";

const store = myStore();
let tags = computed<IFirTag[]>(() => store.state.tags);
let currentTag = ref(0);
let currentSub = ref(0);

let handleDelete = (id: string, index: number, isParent: number) => {
  deleteTag({ id, isParent }).then(() => {
    let cloneTags = deepClone(store.state.tags);
    if (isParent) {
      cloneTags.splice(index, 1);
    } else {
      cloneTags[currentTag.value].children.splice(index, 1);
    }
    store.commit("modify", { tags: cloneTags });
    currentTag.value = currentSub.value = 0;
  });
};
</script>

<style scoped lang="less">
.box {
  margin: 20px;
  width: 40%;
}
.container {
  height: 60vh;
  overflow: auto;
  border: 1px solid #000;
}
.item {
  display: flex;
  align-items: center;
  margin: 10px;
  border: 1px solid #eee;
  padding: 10px;
  cursor: pointer;
  &:hover {
    border: 1px solid #1890ff;
  }
}
.active {
  background-color: #a4d3ff;
}
</style>
