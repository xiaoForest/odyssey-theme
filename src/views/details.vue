
<template>
  <div class="pageTitle">
    <h2>广东乡村振兴</h2>
  </div>
  <NavBar
    :subList="subList"
    :name="title || sidebar.channel_name"
    :channel_name="channelName"
    :subcategory_name="subcategoryName"
    ref="sonRef"
  />

  <section class="detailWrap">
    <div class="title" v-html="detail.title"></div>
    <div class="info">
      {{detail.updatetime}}
      <!-- {{ dayjs(detail.createtime * 1000).format("YYYY-MM-DD HH:mm:ss") }} -->
       来源：{{detail.source}}
    </div>
    <div class="detailsBox" v-html="detail.content"></div>
  </section>
  <Footer />
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import getSrc from "@/utils/getSrc";
import { getNewsDetail } from "@/api/api_news";
import dayjs from "dayjs";

import { Toast } from "vant";
const router = useRouter();
const route = useRoute();

const sonRef = ref();
const title = ref(route.query.title);
watchEffect(() => {
  title.value = route.query.title;
});
const goToPage = () => {
  Toast("开发中");
};
const detail = ref([]);
const subList = ref([]);
const sidebar = ref([]);
const channelName = ref("");
const subcategoryName = ref("");
const NewsDetail = async () => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });
  await getNewsDetail(route.query.id)
    .then((res) => {
      console.log(res);
      detail.value = res.data.data.detail;
      subList.value = res.data.data.sidebar.subcategory_arr;
      sidebar.value = res.data.data.sidebar;
      channelName.value = res.data.data.sidebar.channel_name;
      subcategoryName.value = res.data.data.sidebar.subcategory_name;
    })
    .catch((err) => {
      Toast("显示信息出错");
      console.log(err);
    });
};
onMounted(() => {
  NewsDetail();
});
</script>

<style lang="scss">
.detailsBox {
  strong {
    font-weight: bold;
  }
}
</style>