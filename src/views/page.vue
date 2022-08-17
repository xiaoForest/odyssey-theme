
<template>
  <div class="pageTitle">
    <h2>广东乡村振兴</h2>
  </div>
  <NavBar
    :subList="subList"
    :name="title"
    :channel_name="channelName"
    :subcategory_name="subcategoryName"
    ref="sonRef"
    @childClick="childClick"
    @childClick2="childClick2"
  />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="newsUlWrap">
        <li
          class="items"
          v-for="(item, index) in list"
          :key="index"
          @click="goToPage(item)"
        >
          <span class="title">{{ item.title }}</span>
          <span class="time">{{ item.updatetime }}</span>
        </li>
      </ul>
    </van-list>
  </van-pull-refresh>
</template>
<script setup>
import {
  reactive,
  ref,
  onMounted,
  watchEffect,
  onActivated,
  onDeactivated,
} from "vue";
import { getNewsBlock, getNewsIndex } from "@/api/api_news.js";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  Currently: {
    type: Number,
    default: 1,
  },
  List: {
    type: Array,
    default: [],
  },
});
const title = ref(route.query.title);
watchEffect(() => {
  title.value = route.query.title;
});
const params = ref({
  keyword: "",
  page: -1,
  pagesize: 20,
  channel: route.query.channel,
  subcategory: route.query.subcategory,
});
const channelName = ref("");
const subcategoryName = ref("");
const subList = ref([]);
const appointmentQuery = async () => {
  await getNewsIndex(params.value)
    .then((res) => {
      let items = res.data.data.list.data;
      list.value = [...list.value, ...items];
      subList.value = res.data.data.sidebar.subcategory_arr;
      loading.value = false;
      console.log("哈哈：", res.data.data);
      channelName.value = res.data.data.sidebar.channel_name;
      subcategoryName.value = res.data.data.sidebar.subcategory_name;
      if (items.length == 0) {
        finished.value = true;
      } else {
        finished.value = false;
      }
    })
    .catch((err) => {
      Toast("显示信息出错");
      console.log(err);
    });
};

onMounted(() => {
  window.addEventListener(
    "popstate",
    function () {
      location.reload();
    },
    false
  );
});

const goToPage = (i) => {
  let urlID = i.id;
  if (i.link_url != undefined) {
    urlID = i.link_url.split("=")[1];
  }
  if (i.link_url == "") {
    urlID = i.id;
  }
  router.push({
    path: "/details",
    query: {
      id: urlID,
      channel: route.query.channel,
      subcategory: route.query.subcategory,
      title: route.query.title,
      index: route.query.index,
    },
  });
};
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  params.value["page"] += 1;
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    appointmentQuery(params.value, true);
  }, 1000);
};

const onSearch = (val) => {
  list.value = [];
  onRefresh();
};
const changeInput = (val) => {};
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  params.value["page"] = -1;
  loading.value = true;
  onLoad();
};
const childClick = (i) => {
  list.value = [];
  params.value["channel"] = i.id;
  params.value["subcategory"] = "";

  onRefresh();
};
const childClick2 = (i) => {
  list.value = [];
  params.value["channel"] = i.channel;
  params.value["subcategory"] = i.id;
  onRefresh();
};
onActivated(() => {
  // onLoad();
});
const changeRouterKeepAlive = (name, keepAlive) => {
  router.options.routes.map((item) => {
    if (item.name === name) {
      item.meta.keepAlive = keepAlive;
    }
  });
};

onDeactivated(() => {});

const onChange = () => {
  Toast("开发中");
};
</script>

<style lang="scss">
</style>