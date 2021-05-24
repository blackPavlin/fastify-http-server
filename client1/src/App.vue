<template>
  <div class="wrapper">
    <header>
      <nav-menu />
    </header>
    <div class="content-wrapper">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavMenu from "@/components/NavMenu.vue";
export default defineComponent({
  name: "App",
  components: {
    NavMenu,
  },
});
</script>

<style lang="scss">
@import "./assets/styles/css/animation.css";
</style>
