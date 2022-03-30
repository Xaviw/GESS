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
            <a-input v-model:value="item.name" placeholder="请输入" />
            <a-button
              type="primary"
              class="mr-10"
              style="margin-left: 20px"
              @click="handleUpdate(item.name, item.id)"
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
        <a-button style="width: 100%; margin-top: 20px" @click="handleAdd(true)"
          >新增</a-button
        >
      </div>
      <div class="box">
        <div class="container">
          <div
            class="item"
            v-for="(item, index) in tags[currentTag]?.children"
            :class="{ active: currentSub == index }"
            @click="currentSub = index"
          >
            <a-input v-model:value="item.name" placeholder="请输入" />
            <a-button
              type="primary"
              class="mr-10"
              style="margin-left: 20px"
              @click="handleUpdate(item.name, item.id)"
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
        <a-button
          style="width: 100%; margin-top: 20px"
          @click="handleAdd(false)"
          >新增</a-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { myStore } from "@/store";
import { computed, onBeforeUnmount, ref, watchEffect } from "vue";
import { addTag, deleteTag, editTag, getTags } from "@apis/apis";
import deepClone from "@utils/deepClone";
import { IFirTag } from "@/types/common";
import { useRoute } from "vue-router";

const store = myStore();
let tags = ref<IFirTag[]>([]);
let currentTag = ref(0);
let currentSub = ref(0);

watchEffect(() => {
  if (!tags.value.length && store.state.tags?.length) {
    tags.value = deepClone(store.state.tags);
  }
});

let handleDelete = (id: string, index: number, isParent: number) => {
  deleteTag({ id, isParent }).then(() => {
    if (isParent) {
      tags.value.splice(index, 1);
      currentTag.value = currentSub.value = 0;
    } else {
      tags.value[currentTag.value].children.splice(index, 1);
      currentSub.value = 0;
    }
  });
};

let handleUpdate = (name: string, tagId: string) => {
  editTag({ name, tagId });
};

let handleAdd = (flag: boolean) => {
  let param: any = { name: "新增" };
  if (!flag) {
    param.parentId = tags.value[currentTag.value].id;
  }
  addTag(param).then(([res]) => {
    if (flag) {
      tags.value.push({ id: res, name: "新增", children: [] });
    } else {
      tags.value[currentTag.value].children.push({ id: res, name: "新增" });
    }
  });
};

const route = useRoute();

onBeforeUnmount(() => {
  getTags().then(([res]) => {
    store.commit("modify", { tags: [] });
    setTimeout(() => {
      store.commit("modify", { tags: res });
    });
  });
});
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
