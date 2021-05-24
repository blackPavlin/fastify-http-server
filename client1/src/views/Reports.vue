<template>
  <div class="reports">
    <div class="report-list__header">
      <h1 class="ui-title-2">Reports</h1>
      <div class="buttons-list"></div>
    </div>
    <div class="report-list">
      <report-item />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReportItem from "@/components/ReportItem.vue";

export default defineComponent({
  name: "Periods",
  components: {
    ReportItem,
  },
  mounted() {
    const periodID = Array.isArray(this.$route.params.id)
      ? this.$route.params.id[0]
      : this.$route.params.id;
  },
});
</script>

<style lang="scss" scoped>
.report-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .ui-title-2 {
    margin-bottom: 0px;
  }
}
</style>
