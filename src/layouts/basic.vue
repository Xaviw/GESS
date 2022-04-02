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
            v-model:selectedKeys="selectedKeys"
            v-if="menu?.length"
          >
            <template v-for="item in menu" :key="item.id">
              <template v-if="!item.children">
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
          <template v-if="alreadyLogin">
            <a-popover title="" v-if="checked">
              <template #content>
                <span style="font-weight: bold"
                  >您已连续签到{{ checkInDays }}天，继续努力吧！</span
                >
              </template>
              <img src="@/assets/checked.png" class="check-in" />
            </a-popover>
            <a-popover title="" v-else>
              <template #content>点击签到！</template>
              <img
                src="@/assets/checkIn.png"
                alt="点击签到"
                class="check-in"
                style="cursor: pointer"
                @click="handleCheckIn"
              />
            </a-popover>
          </template>

          <a-menu mode="horizontal ">
            <a-menu-item key="forum" @click="gotoForum">学习圈</a-menu-item>
            <a-menu-item key="publish" @click="publish">发布文章</a-menu-item>
          </a-menu>
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
                  <router-link to="/personal">个人中心</router-link>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <router-link
                    to="/edit-menu"
                    v-if="
                      userInfo.type == ROLE.administrator ||
                      store.state.role == ROLE.super
                    "
                    >菜单编辑</router-link
                  >
                </a-menu-item>
                <a-menu-item>
                  <router-link
                    to="/sensitive-manage"
                    v-if="userInfo.type == ROLE.super"
                    >敏感词编辑</router-link
                  >
                </a-menu-item>
                <a-menu-divider
                  v-if="
                    userInfo.type == ROLE.administrator ||
                    store.state.role == ROLE.super
                  "
                />
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

<script setup lang="ts">
import { computed, inject } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { getTags, checkIn } from "@/request/apis";
import { redirectToLogin } from "@utils/index";
import { myStore } from "@/store";
import { handleLogout } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { ROLE } from "@/types/common";

const appTitle = inject("appTitle");
const store = myStore();
const router = useRouter();
const route = useRoute();

const alreadyLogin = computed(() => store.state.alreadyLogin);
const checked = computed(() => store.state.userInfo?.isSign);
const checkInDays = computed(() => store.state.userInfo?.continuesDays);
const handleCheckIn = () => {
  checkIn(store.state.userInfo?.account as string).then(() => {
    store.commit("modify", {
      userInfo: {
        ...store.state.userInfo,
        isSign: true,
        continuesDays: (store.state.userInfo?.continuesDays || 0) + 1,
      },
    });
  });
};

if (!store.state.tags?.length) {
  getTags().then(([res]) => {
    if (route.path == "/category") {
      let param: any = { data: res };
      if (route.query.type) {
        param.target = route.query.type;
      }
      store.commit("initTags", param);
    } else {
      store.commit("modify", { tags: res });
    }
  });
}

let menu = computed(() => store.state.tags);

let userInfo = computed(() => store.state.userInfo);

let selectedKeys = computed({
  get() {
    return store.state.currentMenu;
  },
  set(value) {
    store.commit("modify", { currentMenu: value });
  },
});

const publish = () => {
  router.push("/publish");
};

const gotoForum = () => {
  router.push("/forum");
};
</script>

<style lang="less" scoped>
:deep(.ant-menu-horizontal) {
  border-bottom: none;
  margin-right: 32px;
}
:deep(.ant-menu-item-selected) {
  border: none;
}
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
.check-in {
  height: 55px;
}
</style>
