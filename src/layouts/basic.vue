<script setup lang="ts">
import { computed, inject, provide, ref } from "vue";
import { UserOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { getTags } from "@/request/apis";
import type { IFirTag } from "@/types/common";
import { redirectToLogin } from "@utils/index";
import { myStore } from "@/store";
import { handleLogout } from "@/utils";
import { useRouter } from "vue-router";

const appTitle = inject("appTitle");
const store = myStore();
const router = useRouter();

let menu = ref<IFirTag[]>([]);
if (store.state.tags.length) {
  menu.value = store.state.tags;
} else {
  getTags().then(([res]) => {
    menu.value = res;
    store.commit("modify", { tags: res });
  });
}

let userInfo = computed(() => store.state.userInfo);
</script>

<template>
  <div class="body">
    <div class="header">
      <div class="max-area">
        <div class="info">
          <span class="title" @click="router.push('/')">{{ appTitle }}</span>
          <a-menu
            mode="horizontal"
            class="flex-center"
            style="border-bottom: none"
          >
            <template v-for="item in menu" :key="item.id">
              <template v-if="!item.children?.length">
                <a-menu-item :key="item.id">
                  {{ item.name }}
                </a-menu-item>
              </template>
              <template v-else>
                <a-sub-menu :key="item.id">
                  <template #title>{{ item.name }}</template>
                  <a-menu-item v-for="sub in item.children" :key="sub.id">
                    <router-link
                      :to="{ path: '/category', query: { type: sub.id } }"
                      >{{ sub.name }}</router-link
                    >
                  </a-menu-item>
                </a-sub-menu>
              </template>
            </template>
          </a-menu>
        </div>

        <div class="flex-center">
          <search-outlined class="search" />
          <a-divider type="vertical" style="height: 20px" />
          <a-button type="primary" @click="redirectToLogin" v-if="!userInfo"
            ><user-outlined />登录</a-button
          >
          <a-dropdown v-else>
            <div>
              <span style="margin-right: 8px">{{ userInfo.name }}</span>
              <a-avatar :src="userInfo.face">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">上传文章</a>
                </a-menu-item>
                <a-menu-item>
                  <router-link to="/personal">个人中心</router-link>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a @click="handleLogout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer flex-center">- 考研分享平台 -</div>
  </div>
</template>

<style lang="less" scoped>
.body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  line-height: 86px;
  box-shadow: #676b6f 0 0 8px;
  .max-area {
    display: flex;
    justify-content: space-between;
  }
  .info {
    display: flex;
  }
  .title {
    font-size: 1.3rem;
    font-weight: bolder;
    margin-right: 2rem;
    cursor: pointer;
  }
  .search {
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      color: #40a9ff;
    }
  }
}
.content {
  flex: 1 1;
}
.footer {
  padding: 15px;
  background: #25282a;
  color: #676b6f;
}
</style>
