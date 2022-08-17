
<template>
  <div class="homeNews">
    <div class="topBoxes">
      <div class="textMod">
        <span
          :class="{ on: active == index }"
          v-for="(item, index) in list"
          :key="index"
          @click="onTab(index)"
        >
          {{ item.title || item.channel_name }}
        </span>
      </div>
      <div class="more" @click="goToPage(list)">更多</div>
    </div>
    <ul
      :class="{ on: active == index }"
      v-for="(item, index) in list"
      :key="index"
      class="newsUl"
    >
      <li
        v-for="(m, i) in item.list.slice(0, 5)"
        :key="i"
        @click="goToPageDetails(m,z)"
      >
        <span>{{ m.title }}</span>
        <time>
          {{ dayjs(m.createtime * 1000).format(" MM-DD ") }}
        </time>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
const props = defineProps({
  List: {
    type: Array,
    default: [],
  },
});
const active = ref(0);
const onTab = (i) => {
  active.value = i;
};
const list = ref([]);
watchEffect(() => {
  list.value = props.List;
});
onMounted(() => {});
const goToPage = (i) => {
  if (active.value == 0) {
    router.push({
      path: "/page",
      query: {
        index:0,
        channel: i[0].channel,
        subcategory: i[0].subcategory,
        title: i[0].title,
      },
    });
  }
  if (active.value == 1) {
    router.push({
      path: "/page",
      query: {
        channel: i[1].channel,
        subcategory: i[1].subcategory,
        title: i[1].title,
      },
    });
  }
};

const goToPageDetails = (i,z) => {
  let urlID = i.id;
  if (i.link_url != undefined) {
    urlID = i.link_url.split("=")[1];
  }
  router.push({
    path: "/details",
    query: {
      id: urlID,
    },
  });
};
</script>

<style lang="scss">
</style>