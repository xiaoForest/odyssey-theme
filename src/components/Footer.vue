
<template>
  <div class="footerMain">
    <div class="item" v-if="info.length">
      <span @click="goToPage(1, info[0].name)">{{ info[0].name }}</span>
    </div>
    <div class="item">
      <span>友情链接</span>
    </div>
    <ul class="list">
      <li v-for="(i, index) in WeblinkVal" :key="index" @click="onWebLink(i)">
        <span>{{ i.name }}</span>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>

  <div class="footerInfo" v-if="info.length">
    <p>
      <strong @click="goToPage(1, info[1].name)">{{ info[1].name }}</strong> |
      <strong @click="goToPage(2, info[2].name)">{{ info[2].name }}</strong>
    </p>
    <p v-for="(i, index) in ConfigVal" :key="index">
      {{ i.name }}：{{ i.value }}
    </p>
    <a href="https://beian.miit.gov.cn ">粤ICP备2021045362号</a>
    <a
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602010079"
    >
      <img :src="getSrc('registerSystemInfo.png')" alt="" />
      <span>粤公网安备 44010602010079号</span>
    </a>
  </div>

  <van-popup
    v-model:show="showLink"
    position="bottom"
    :style="{ height: '45%' }"
  >
    <div class="popupHead">
      <span class="title">请选择</span>
      <div class="popupCross">
        <van-icon name="cross" @click="showLink = false" />
      </div>
    </div>
    <div class="popupMain">
      <ul class="popupLinkUl">
        <li
          v-for="(i, index) in showLinkList"
          :key="index"
          @click="onGoUrl(i.link_url)"
        >
          <a :href="i.link_url" target="_blank">
            <span>{{ i.title }}</span>
            <van-icon name="arrow" />
          </a>
        </li>
      </ul>
    </div>
  </van-popup>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import getSrc from "@/utils/getSrc";
import { getWebConfig, getWeblink, getChannel } from "@/api/api_index";
const router = useRouter();
const route = useRoute();

onMounted(() => {
  WebConfig();
  Weblink();
  infoChannel();
});
const ConfigVal = ref([]);
const WebConfig = async () => {
  await getWebConfig()
    .then((res) => {
      ConfigVal.value = res.data.data.bottom;
    })
    .catch((err) => {
      console.log(err);
    });
};
const WeblinkVal = ref([]);
const Weblink = async () => {
  await getWeblink()
    .then((res) => {
      WeblinkVal.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const info = ref([]);
const infoChannel = async () => {
  await getChannel()
    .then((res) => {
      console.log(res.data.data.bottom);
      info.value = res.data.data.bottom;
    })
    .catch((err) => {
      console.log(err);
    });
};

const goToPage = (i, name) => {
  console.log(i);
  router.push({
    path: "/articleDetails",
    query: {
      id: i,
      channel: 0,
      title: name,
    },
  });
};

const showLink = ref(false);
const showLinkList = ref([]);
const onWebLink = (i) => {
  showLink.value = true;
  showLinkList.value = i.list;
  console.log(i.list);
};
</script>


<style lang="scss">
.footerInfo {
  padding: 20px 0 30px;
  font-size: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 15px;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 33px;
  }
  a {
    margin-top: 15px;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 33px;
    img {
      width: 23px;
      height: 24px;
    }
    span {
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 33px;
    }
  }
}
.footerMain {
  padding: 0 25px;
  margin: 0 20px;
  background: #ffffff;
  box-shadow: inset 0px -1px 0px 0px rgba(205, 205, 205, 0.5);
  border-radius: 8px 8px 0px 0px;
  .item {
    padding: 20px 0;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    align-items: center;
    span {
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #333;
      line-height: 33px;
      font-weight: bold;
    }
  }
  .list {
    li {
      border-bottom: 1px solid #e4e4e4;
      padding: 24px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:last-child {
        border-bottom: 0;
      }
      span {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333;
        line-height: 33px;
      }
      .van-icon {
        font-size: 20px;
        color: #333;
      }
    }
  }
}
.popupHead {
  background: #f9f9f9;
  position: absolute;
  border-bottom: 1px #eee solid;
  top: 0;
  left: 0;
  font-size: 28px;
  height: 95px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    padding: 0 32px;
  }
  .popupCross {
    margin: 0 32px;
    width: 40px;
    height: 40px;
    border: 1px #333 solid;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .van-icon {
      font-size: 30px;
    }
  }
}
.popupMain {
  position: relative;
  top: 96px;
  padding: 0 32px;
  height: calc(100% - 96px);
  overflow: auto;
  .popupLinkUl {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    li {
      width: 50%;
      box-sizing: border-box;
      border-bottom: 1px #f1f1f1 solid;
      &:nth-child(2n + 2) {
        padding-left: 20px;
      }
      &:nth-child(2n + 1) {
        border-right: 1px #f1f1f1 solid;
        padding-right: 20px;
      }

      a {
        width: 100%;
        height: 105px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 28px;
          line-height: 1.5;
          color: #333;
        }
        .van-icon {
          font-size: 30px;
          color: #a5a5a5;
        }
      }
    }
  }
}
</style>