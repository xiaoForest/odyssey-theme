
<template>
  <div class="pageTitle">
    <h2>广东乡村振兴</h2>
  </div>
  <NavBar
    :subList="subList"
    :name="title || sidebar.channel_name"
    ref="sonRef"
    @childClick2="childClick2"
  />

  <section class="detailWrap">
    <div class="title tc" v-html="detail.title"></div>

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
import { getArticleDetail } from "@/api/api_index";
import dayjs from "dayjs";
const router = useRouter();
const route = useRoute();

import { Toast } from "vant";
const sonRef = ref();
const goToPage = () => {
  Toast("开发中");
};
const detail = ref([]);
const title = ref(route.query.title);
const NewsDetail = async () => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });
  await getArticleDetail(route.query.id, route.query.channel)
    .then((res) => {
      console.log(res);
      detail.value = res.data.data;
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