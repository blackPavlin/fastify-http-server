<template>
  <el-container>
    <el-header>
      <Navbar />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
}

section {
  height: 100%;
}
</style>
