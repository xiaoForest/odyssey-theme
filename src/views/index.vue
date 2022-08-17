
<template>
  <section class="homeWrap">
    <img class="topBanner" :src="getSrc('topBanner.png')" alt="" />
    <NavBarIndex ref="sonRef" />

    <div class="swiperOne">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in slideshow"
          :key="index"
          @click="goToPageChange(item)"
        >
          <img :src="imgUrl + item.image" alt="" />
          <div class="info">
            <span>{{ item.title }}</span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="wrap">
      <HomeList :List="blockList" />

      <div class="swiperThree">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item, index) in bannerOne"
            :key="index"
            @click="goToBannerList(item)"
          >
            <img :src="imgUrl + item.h5image" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="swiperTwo">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item, index) in bannerList"
            :key="index"
            @click="goToBannerList(item)"
          >
            <img :src="imgUrl + item.image" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <HomeList1 :List="blockList1" />
      <HomeList :List="blockList2" />
      <HomeList2 :List="blockList3" />
    </div>
  </section>
  <Footer />
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect, onActivated } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import NavBarIndex from "@/components/NavBarIndex";
import Footer from "@/components/Footer";
import getSrc from "@/utils/getSrc";
import { getIndexList, getBanner, getChannel, imgUrl } from "@/api/api_index";
import HomeList from "./homeList/homeList.vue";
import HomeList1 from "./homeList/homeList1.vue";
import HomeList2 from "./homeList/homeList2.vue";
import { getNewsIndex } from "@/api/api_news.js";

import { Toast } from "vant";
const router = useRouter();
const route = useRoute();

const sonRef = ref();
const slideshow = ref([]);
const blockList = ref([]);
const blockList1 = ref([]);
const blockList2 = ref([]);
const blockList3 = ref([]);
const indexList = async () => {
  await getIndexList()
    .then((res) => {
      slideshow.value = res.data.data.slideshow;
      blockList.value = res.data.data.block["top"]["tap"];
      blockList1.value = res.data.data.block["middle_1"];
      blockList2.value = [
        { ...res.data.data.block["middle_2"]["tap"][0] },
        { ...res.data.data.block["bottom"]["tap"][1] },
      ];
      blockList3.value = [
        { ...res.data.data.block["bottom"]["tap"][2] },
        { ...res.data.data.block["bottom"]["tap"][0] },
      ];
      console.log('BUG',blockList2.value)
    })
    .catch((err) => {
      console.log(err);
    });
};

const bannerOne = ref([]);
const bannerList = ref([]);
const indexBanner = async () => {
  await getBanner()
    .then((res) => {
      bannerOne.value = res.data.data.top.data;
      bannerList.value = res.data.data.banner.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const goToPageChange = (i) => {
  let id = i.link_url.split("=");
  router.push({
    path: "/details",
    query: {
      id: id[1],
      title: i.name,
    },
  });
};
const goToBannerList = (i) => {
  let id = i.link_url.split("=");
  console.log(id[1]);
  router.push({
    path: "/topicList",
    query: {
      id: id[1],
      title: i.name,
    },
  });
};
onMounted(() => {});
onActivated(() => {
  console.log("缓缓");
  indexList();
  indexBanner();
});

onBeforeRouteLeave((to, from) => {
  console.log(111);
});
</script>

 