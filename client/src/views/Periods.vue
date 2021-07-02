<template>
  <div class="periods">
    <div class="filters">
      <el-button size="medium" type="primary"></el-button>
      <el-button size="medium" type="primary"></el-button>
    </div>

    <el-table :data="getPeriods">
      <el-table-column prop="date"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Periods",
  data() {
    return {};
  },
  async mounted() {
    try {
      await this.$store.dispatch("periods/getPeriods");
    } catch (error) {
      this.$message.error(error.message);
    }
  },
  computed: {
    getPeriods() {
      return this.$store.getters["periods/getPeriods"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
