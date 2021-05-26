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
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import ReportItem from "@/components/ReportItem.vue";

export default defineComponent({
  name: "Periods",
  components: {
    ReportItem,
  },
  setup() {
    const route = useRoute();

    onMounted(() => {
      const periodID = Array.isArray(route.params.id)
        ? route.params.id[0]
        : route.params.id;

      console.log(periodID);
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
.report-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  & .ui-title-2 {
    margin-bottom: 0px;
  }
}
</style>
