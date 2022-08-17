
<template>
  <div class="pageTitle">
    <h2>广东乡村振兴</h2>
  </div>
  <div class="searchWrap">
    <div class="searchBox">
      <van-icon name="search" />
      <input
        type="text"
        v-model="params.keyword"
        placeholder="关键字"
        @input="changeInput(params.keyword)"
      />
      <div class="text r_case tdu" @click="onSearch(params.keyword)">搜索</div>
    </div>
  </div>
  <van-empty v-if="showEmpty" description="搜索无结果" />
  <div v-show="showSearch">
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
  </div>
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
import { getSearchIndex } from "@/api/api_news.js";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { Toast } from "vant";
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
const params = ref({
  keyword: route.query.keyword,
  page: 0,
  pagesize: 20,
  channel: route.query.channel,
  subcategory: route.query.subcategory,
});
const showEmpty = ref(true);
const showSearch = ref(false);
const appointmentQuery = async () => {
  await getSearchIndex(params.value)
    .then((res) => {
      let arr = res.data.data.data;
      list.value = [...list.value, ...arr];
      loading.value = false;
      showSearch.value = true;
      showEmpty.value = false;

      if (arr.length == 0) {
        finished.value = true;
      } else {
        finished.value = false;
      }
    })
    .catch((err) => {
      Toast("显示信息出错");
      showSearch.value = false;
      finished.value = true;
      console.log(err);
    });
};
onMounted(() => {
  if (route.query.keyword != undefined) {
    showSearch.value = true;
    showEmpty.value = false;
    onSearch();
  }
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
  if (params.value["keyword"] == "" || params.value["keyword"] == undefined) {
    return Toast("请输入关键字");
  }

  router.push({
    path: route.path,
    query: { keyword: params.value["keyword"] },
  });

  showSearch.value = true;
  showEmpty.value = false;
  list.value = [];
  onRefresh();
};
const changeInput = (val) => {};
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  params.value["page"] = 0;
  loading.value = true;
  onLoad();
};

const onChange = () => {
  Toast("开发中");
};
</script>

<style lang="scss">
</style>