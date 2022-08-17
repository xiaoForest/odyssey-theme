
<template>
  <NavBar title="政策法规" ref="sonRef" goBack="/" />

  <Footer />
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import getSrc from "@/utils/getSrc";
import { getIndexList, getBanner, imgUrl } from "@/api/api_index";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import { Toast } from "vant";
const sonRef = ref();

onMounted(() => {});
</script>

<style lang="scss">
</style>