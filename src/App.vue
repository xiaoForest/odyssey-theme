<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
        :is="Component"
        :key="route.name"
        v-if="route.meta.keepAlive"
      />
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
  </router-view>
</template>
<script setup>
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
const router = useRouter();
const route = useRoute();
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
