<template>
  <el-menu
    router
    :default-active="$route.path"
    class="navbar"
    mode="horizontal"
  >
    <el-menu-item index="/">Profit Farmer</el-menu-item>
    <el-menu-item index="/admin/logout" v-if="isAuth">Выход</el-menu-item>
    <el-menu-item index="/admin/reports" v-if="isAuth">Отчёты</el-menu-item>
    <el-menu-item index="/admin/payments" v-if="isAuth">Платежи</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  :first-child {
    color: #000;
    font-size: 20px;
  }

  :not(:first-child) {
    float: right;
  }
}
</style>
