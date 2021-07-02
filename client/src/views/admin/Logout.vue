<template>
  <div class="logout"></div>
</template>

<script>
export default {
  name: "AdminLogout",
  mounted() {
    this.$store.dispatch("auth/logout");
    this.$router.push("/admin/login");
  },
};
</script>
