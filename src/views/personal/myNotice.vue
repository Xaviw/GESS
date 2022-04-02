<template>
  <NoticeList :list-data="listData" />
</template>

<script setup lang="ts">
import NoticeList from "@/components/NoticeList.vue";
import { getOwnNotice } from "@/request/apis";
import { INoticeData } from "@/types/common";
import { ref } from "vue";

let listData = ref<INoticeData[]>([]);
getOwnNotice({ page: 1, pageSize: 99999 }).then(([res]) => {
  listData.value = res.data;
});
</script>

<style scoped lang="less"></style>
