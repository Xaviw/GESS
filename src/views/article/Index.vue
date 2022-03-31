<template>
  <div class="max-area">
    <div class="flex-between">
      <h2>{{ data?.title }}</h2>
      <div>
        <a-button type="primary" class="mr-10" @click="handleEdit"
          >编辑</a-button
        >
        <a-button
          type="primary"
          danger
          v-if="
            data?.userId == userInfo?.id || userInfo?.type == ROLE.administrator
          "
          @click="handleDelete"
          >删除</a-button
        >
      </div>
    </div>
    <div class="flex-between" style="margin-bottom: 20px">
      <div style="display: flex">
        <span class="flex-between mr-20">
          <Icon icon="ant-design:user-outlined" class="mr-5" />
          {{ data?.userName }}
        </span>
        <a-tag
          v-for="(tag, index) in data?.tags"
          :color="COLOR[index % 7]"
          class="mr-20"
          v-if="!isInfo"
          >{{ tag.name }}</a-tag
        >
        <a-tag :color="COLOR[0]" class="mr-20" v-else>{{
          infoTags[data?.type!]
        }}</a-tag>
      </div>
      <div class="flex-between">
        <span class="flex-between mr-20">
          <Icon icon="ant-design:calendar-outlined" class="mr-5" />
          {{ relTime(data?.createTime || "") }}
        </span>
        <span class="flex-between mr-20">
          <Icon icon="akar-icons:eye" class="mr-5" />
          {{ data?.views }}
        </span>
        <span class="flex-between likes" @click="handleLikes">
          <Icon icon="bx:like" class="mr-5" v-if="!data?.isLikes" />
          <Icon
            icon="ant-design:like-filled"
            color="#f44336"
            class="mr-5"
            v-else
          />
          {{ data?.likes }}
        </span>
      </div>
    </div>
    <Editor :canEdit="false" :data="data?.content" />
    <Enclosure :file="data?.url" :id="data?.articleId" target="blank" />
    <CommentList
      :comments="data?.comment || []"
      :type="isInfo ? 0 : 1"
      @deleteComments="deleteComments"
      @refresh="getValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { IArticleInfo, ROLE } from "@/types/common";
import {
  getArticleDetail,
  likes,
  deleteArticle,
  getNoticeDetail,
} from "@apis/apis";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { COLOR, relTime } from "@/utils";
import { Icon } from "@iconify/vue";
import Editor from "@comps/Editor.vue";
import { myStore } from "@/store";
import CommentList from "@/components/CommentList.vue";

const route = useRoute();
const router = useRouter();
const store = myStore();
const userInfo = computed(() => store.state.userInfo);
const isInfo = computed(() => route.fullPath.includes("info"));

let data = ref<IArticleInfo>();

const infoTags = ["公告信息", "考研资讯", "论坛交流"];

const getValue = () => {
  if (isInfo.value) {
    getNoticeDetail(route.params.id as string).then(([res]) => {
      data.value = res;
    });
  } else {
    getArticleDetail(route.params.id as string).then(([res]) => {
      data.value = res;
    });
  }
};

getValue();

const handleDelete = () => {
  deleteArticle({
    objectId: route.params.id as string,
    type: isInfo.value ? 0 : 1,
  }).then(() => {
    router.replace("/");
  });
};

const handleEdit = () => {
  router.push(`/publish?id=${data.value?.articleId}`);
};

const deleteComments = (id: string) => {
  data.value!.comment =
    data.value?.comment?.filter((item) => item.id !== id) || [];
};

const handleLikes = () => {
  const param = {
    id: route.params.id as string,
    operation: data.value?.isLikes ? 0 : 1,
    type: isInfo.value ? 0 : 1,
  };
  likes(param).then(() => {
    data.value!.isLikes = data.value?.isLikes ? 0 : 1;
    data.value!.likes = data.value?.isLikes
      ? data.value!.likes + 1
      : data.value!.likes - 1;
  });
};
</script>

<style lang="less" scoped>
h2 {
  margin: 20px 0;
}
.likes {
  &:hover {
    color: #1890ff;
    cursor: pointer;
    transform: scale(1.2);
  }
}
</style>
