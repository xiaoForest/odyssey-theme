
<template>
  <van-sticky>
    <div class="navList">
      <div
        class="item"
        v-for="(item, index) in navList"
        :key="index"
        @click="goToPageIndex(item, index)"
      >
        {{ item.name }}
      </div>
      <van-icon name="search" @click="onSearchPage" />
    </div>

    <div class="subWrap" :class="{ show: showSub != true }" ref="subDemo">
      <div class="item" @click="goToPage(subcategory)">
        {{ subcategory.name }}
      </div>
      <div
        class="item"
        v-for="(i, index) in subcategory.subcategory"
        :key="index"
        @click="goToPageSub(i, index, navList)"
      >
        {{ i.name }}
      </div>
    </div>
  </van-sticky>
  <!-- <div class="emptyNavbar"></div> -->
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { getChannel } from "@/api/api_index";

const router = useRouter();
const route = useRoute();
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  showCrumbs: {
    type: Boolean,
    default: true,
  },
});

const showSub = ref(true);

const navList = ref([]);
const navChannel = async () => {
  await getChannel()
    .then((res) => {
      navList.value = res.data.data.top;
    })
    .catch((err) => {
      Toast("显示信息出错");
      console.log(err);
    });
};
const onSearchPage = () => {
  router.push({
    path: "/searchPage",
    query: {},
  });
};
const emit = defineEmits(["childClick"]);
const subcategory = ref([]);
const goToPage = (i) => {
  showSub.value = false;
  emit("childClick", i);
  router.push({
    path: "/page",
    query: {
      channel: i.id,
      title: i.name,
    },
  });
};
const subPage = ref(0);
const subDemo = ref(null);
const goToPageIndex = (i, index) => {
  if ((index + 1 == subPage.value) == false) {
    showSub.value = false;
  } else {
    showSub.value = !showSub.value;
  }
  subPage.value = i.id;
  subcategory.value = i;
};
const active = ref(0);

const goToPageSub = (i, index, info) => {
  active.value = index;
  showSub.value = true;
  router.push({
    path: "/page",
    query: {
      channel: subPage.value,
      subcategory: i.id,
      title: i.name,
      index: index,
    },
  });
};
const goHome = (i) => {
  router.push({
    path: "/",
  });
};
onMounted(() => {
  active.value = route.query.index;
  navChannel();
  window.onscroll = function () {
    showSub.value = true;
  };
});
</script>


<style lang="scss" scoped>
.emptyNavbar {
  height: 90px;
}
.crumbs {
  background: #fff;
  position: relative;
  padding: 40px 14px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 12px #ebedf0;
  justify-content: space-between;
  z-index: 10;
  .boxes {
    display: flex;
    align-items: center;
    &:nth-child(1) {
      .van-icon {
        font-size: 28px;
        margin: 0 6px;
      }
    }
    .van-icon {
      font-size: 32px;
      transition: 0.3s all ease;
      &.on {
        transform: rotate(180deg);
      }
    }
    span {
      font-size: 28px;
    }
  }
}
.subWrap {
  background: #fff;
  margin: 0 20px 20px;
  border-radius: 10px;
  box-shadow: 0 8px 12px #ebedf0;
  display: none;
  &.show {
    display: block;
  }
  .item {
    padding: 30px 0;
    margin: 0 20px;
    font-size: 28px;
    border-bottom: 1px solid #e4e4e4;
    &.on {
      color: #c10b0b;
      font-weight: bold;
    }
    &:first-child {
      font-size: 36px;
      color: #c10b0b;
      font-weight: bold;
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>