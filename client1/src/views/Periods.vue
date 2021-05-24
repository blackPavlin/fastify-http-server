<template>
  <div class="periods">
    <div class="period-list__header">
      <h1 class="ui-title-2">Periods</h1>
      <div class="buttons-list"></div>
    </div>
    <div class="period-list">
      <period-item />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PeriodItem from "@/components/PeriodItem.vue";
import { PeriodActionE } from "@/store/modules/period/actions";
import { useStore } from "@/store";

const store = useStore();

export default defineComponent({
  name: "Periods",
  components: {
    PeriodItem,
  },
  mounted() {
    store.dispatch(PeriodActionE.getPeriods);
  },
});
</script>

<style lang="scss" scoped>
.period-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .ui-title-2 {
    margin-bottom: 0px;
  }
}
</style>
