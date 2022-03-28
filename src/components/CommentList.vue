<template>
  <div class="flex-between">
    <h3>评论：</h3>
    <div class="flex-between">
      <a-button type="primary" @click="reply('')">发表评论</a-button>
      <a-input
        v-model:value="replyContent"
        placeholder="请输入回复内容"
        v-show="'' == replyId"
        style="margin-left: 10px"
      />
      <a-button
        style="margin-left: 10px"
        v-show="'' == replyId"
        @click="handleReply"
        >发表</a-button
      >
    </div>
  </div>
  <a-comment v-for="item in comments" :key="item.id">
    <template #actions>
      <span key="comment-basic-reply-to" class="flex-between">
        <span class="mr-10" style="width: 4em" @click="reply(item.id)"
          >回复</span
        >
        <a-input
          v-model:value="replyContent"
          placeholder="请输入回复内容"
          size="small"
          v-show="item.id == replyId"
        />
        <a-button
          size="small"
          style="margin-left: 10px"
          v-show="item.id == replyId"
          @click="handleReply"
          >回复</a-button
        >
      </span>
    </template>
    <template #author
      ><a
        >{{ item.userName
        }}{{ item.parentName ? "  回复  " + item.parentName : "" }}</a
      ></template
    >
    <template #avatar>
      <a-avatar :src="item.face">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </template>
    <template #content>
      <p>
        {{ item.comment }}
      </p>
    </template>
    <template #datetime>
      <a-tooltip title="">
        <span>{{ relTime(item.createTime) }}</span>
      </a-tooltip>
    </template>
  </a-comment>
</template>

<script lang="ts" setup>
import { myStore } from "@/store";
import { relTime } from "@/utils";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { comment } from "@apis/apis";

defineProps<{
  comments: {
    id: string;
    userId: string;
    userName: string;
    createTime: string;
    comment: string;
    parentName?: string;
    face?: string;
  }[];
}>();

const router = useRouter();
const route = useRoute();
const store = myStore();

let replyId = ref("");
let replyContent = ref("");

const reply = (id: string) => {
  replyId.value = id;
  // if (store.state.alreadyLogin) {
  // } else {
  //   message.warn("请先登录！");
  //   router.push(`/login?redirect=${route.fullPath}`);
  // }
};

const handleReply = () => {
  comment({
    objectId: route.params.id as string,
    parentId: replyContent.value,
    comment: replyContent.value,
    type: 1,
  });
};
</script>

<style lang="less" scoped>
h3 {
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
