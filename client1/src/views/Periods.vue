<template>
  <div class="periods">
    <div class="period-list__header">
      <h1 class="ui-title-2">Periods</h1>
      <div class="buttons-list">
        <div
          class="button button--round button-default"
          :class="{ active: filter === 'descending' }"
          @click="filter = 'descending'"
        >
          Descending
        </div>
        <div
          class="button button--round button-default"
          :class="{ active: filter === 'ascending' }"
          @click="filter = 'ascending'"
        >
          Ascending
        </div>
      </div>
    </div>
    <div class="period-list">
      <period-item :filter="filter" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PeriodItem from "@/components/PeriodItem.vue";
import { PeriodActionE } from "@/store/modules/period/actions";
import { useStore } from "@/store";

const store = useStore();

export default defineComponent({
  name: "Periods",
  components: {
    PeriodItem,
  },
  setup() {
    const filter = ref("descending");

    onMounted(() => store.dispatch(PeriodActionE.getPeriods));

    return {
      filter,
    };
  },
});
</script>

<style lang="scss" scoped>
.period-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  & .ui-title-2 {
    margin-bottom: 0px;
  }
}

.buttons-list {
  .button {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      background-color: #444ce0;
      color: #fff;
    }
  }
}
</style>
