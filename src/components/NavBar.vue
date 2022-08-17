
<template>
  <van-sticky>
    <div class="navList">
      <div
        class="item"
        v-for="(item, index) in navList"
        :key="index"
        @click="goToPage(item)"
      >
        {{ item.name }}
      </div>
      <van-icon name="search" @click="onSearchPage" />
    </div>
    <div class="crumbs" v-if="showCrumbs">
      <div class="boxes">
        <van-icon name="location-o" />
        <span @click="goHome">首页</span>
        <van-icon name="arrow" />
        <span>{{ channel_name }}</span>
        <van-icon
          v-if="channel_name != '' && subcategory_name != ''"
          name="arrow"
        />
        <span>{{ subcategory_name }}</span>
      </div>
      <div class="boxes" v-if="subList.length != 0 && subList != true">
        <van-icon
          name="arrow-down"
          :class="showSub == true ? 'on' : ''"
          @click="onSub"
        />
      </div>
    </div>
    <div class="subWrap" v-show="showSub">
      <div class="item">{{ name }}</div>
      <div
        class="item"
        :class="{ on: subcategory_name == i.name || channel_name == i.name }"
        v-for="(i, index) in subList"
        :key="index"
        @click="goToPageSub(i, index)"
      >
        {{ i.name }}
      </div>
    </div>
  </van-sticky>
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
  subList: {
    type: Object,
    default: true,
  },
  channel_name: {
    type: String,
    default: "",
  },
  subcategory_name: {
    type: String,
    default: "",
  },
});

const showSub = ref(false);
const onSub = () => {
  showSub.value = !showSub.value;
};
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
const active = ref(0);
const goToPageSub = (i, index) => {
  active.value = index;
  showSub.value = false;
  emit("childClick2", i);
  router.push({
    path: "/page",
    query: {
      channel: i.channel,
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
    showSub.value = false;
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