<template>
  <transition-group name="taskList">
    <div
      class="period-item"
      v-for="period in periods"
      :key="period._id"
      @click="$router.push(`/reports/${period._id}`)"
    >
      <div class="ui-card ui-card--shadow">
        <div class="row grid-between">
          <div class="col-xs-4">
            <div class="ui-title-3">
              <span>{{ period.title }}</span>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="ui-title-3">
              <span class="ui-text-hide">{{ getDate(period.dateStart) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { PeriodGetterE } from "@/store/modules/period/getters";

const store = useStore();

export default defineComponent({
  name: "PeriodItem",
  computed: {
    periods() {
      return store.getters[PeriodGetterE.getPeriods];
    },
  },
  methods: {
    getDate(date: string): string {
      const d = new Date(date);
      const monthName = d.toLocaleDateString("ru-RU", { month: "short" });
      const nameCapitalized =
        monthName.charAt(0).toUpperCase() + monthName.slice(1);

      return `${nameCapitalized} ${d.getFullYear()}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.period-item {
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0px;
  }
}
</style>
