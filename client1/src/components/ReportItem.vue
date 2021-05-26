<template>
  <transition-group name="taskList">
    <div class="report-item">
      <div class="ui-card ui-card--shadow-always">
        <p class="ui-title-3">Octember 2018</p>
        <span
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          officia quisquam possimus dolores vitae, repudiandae sed eos tempore
          est mollitia sapiente natus, facilis neque culpa accusantium! Sed
          reprehenderit temporibus illo.</span
        >
        <div class="row grid-start">
          <div class="col-xs-4">Profit</div>
          <div class="col-xs-4 grid-end">
            <span class="ui-label ui-label--danger">Fix</span>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReportItem",
});
</script>

<style lang="scss" scoped>
.report-item {
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0px;
  }
}
</style>
