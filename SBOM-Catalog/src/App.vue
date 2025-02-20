<script lang="ts" setup>
import {onBeforeMount, reactive, Ref, ref, watch} from "vue";
import axios from "axios";
import {load} from "js-yaml";
import draggable from 'vuedraggable'
import {aggregateList, deepClone, generateTreeObject, normaliseList} from "./global/global.ts";
import TreePlot from "./components/plots/tree-plot.vue";
import ListPlot from "./components/plots/list-plot.vue";
import CirclePlot from "./components/plots/circle-plot.vue";
import DetailEnumeration from "./components/detail-enumeration.vue";
import type {Tool} from "./types/tool";
import type {Filter} from "./types/filter";
import {AggregationModes, ViewMode} from "./types/view.d.ts";
import {useMainStore} from './stores/mainStore'

const store = useMainStore()

onBeforeMount(() => {
  store.loadInitialData()
})

function onViewChange(view: ViewMode) {
  store.activeViewMode = view

}

function onAggregationModeChange(mode: AggregationModes) {
  store.activeAggregationMode = mode
}

const updateFilters = (event: any) => {
  const movedItem = store.filters.splice(event.oldIndex, 1)[0];
  store.filters.splice(event.newIndex, 0, movedItem);
};

</script>

<template>
  <div class="flex overflow-hidden grid max-h-full m-0">
    <div class="flex-column flex col-2 surface-50 full-vue-heigth shadow-right scrollable-div">

      <div class="mb-2 w-full">
        <PButtonGroup>
          <PButton label="Circle" rounded 
            :outlined="store.activeViewMode !== ViewMode.Circle" 
            :severity="store.activeViewMode === ViewMode.Circle ? '' : 'secondary'" 
            class="w-4" 
            @click="onViewChange(ViewMode.Circle)"/>
          <PButton label="Tree" rounded 
            :outlined="store.activeViewMode !== ViewMode.Tree" 
            :severity="store.activeViewMode === ViewMode.Tree ? '' : 'secondary'" 
            class="w-4" 
            @click="onViewChange(ViewMode.Tree)"/>
          <PButton label="List" rounded 
            :outlined="store.activeViewMode !== ViewMode.List" 
            :severity="store.activeViewMode === ViewMode.List ? '' : 'secondary'" 
            class="w-4" 
            @click="onViewChange(ViewMode.List)"/>
        </PButtonGroup>
        </div>

      <PButtonGroup>
        <PButton
            v-tooltip="{ value: 'This mode displays each entry in its original form, without any grouping. This means that an entry can appear multiple times if it belongs to multiple categories. This is useful when you want to see all instances of an entry, regardless of its category.', showDelay: 750, hideDelay: 300 }" 
            label="Normalize" 
            rounded
            :outlined="store.activeAggregationMode !== AggregationModes.Normalize"
            :severity="store.activeAggregationMode === AggregationModes.Normalize ? '' : 'secondary'" 
            class="w-6"
            @click="onAggregationModeChange(AggregationModes.Normalize)"/>
        <PButton
            v-tooltip="{ value: 'This mode groups entries by their categories to reduce duplication. If an entry belongs to multiple categories, it will only be displayed once, under a group that represents those categories. This is useful when you want a simplified view of the data, without repeated entries.', showDelay: 750, hideDelay: 300 }" 
            label="Aggregate" 
            rounded
            :outlined="store.activeAggregationMode !== AggregationModes.Aggregate"
            :severity="store.activeAggregationMode === AggregationModes.Aggregate ? '' : 'secondary'" 
            class="w-6"
            @click="onAggregationModeChange(AggregationModes.Aggregate)"/>
      </PButtonGroup>

      <PDivider/>

      <draggable v-model="store.filters" item-key="name" @end="updateFilters">
        <template #item="{element}">
          <div class='flex p-2 mb-2 justify-content-between not-draggable card w-full surface-200 cursor-move'>
            <h2 class="card-title">{{ element.name }}</h2>
            <div class="flex align-items-center">
              <PButton v-tooltip="{ value: element.description, showDelay: 300, hideDelay: 300 }" text rounded icon="pi pi-question-circle" severity="secondary"/>
              <PInputSwitch v-model="element.enabled" @change="store.recalculateAllData"/>
            </div>
          </div>
        </template>
      </draggable>

      <div style="margin-top: auto">
        <a href="https://github.com/ossf/sbom-everywhere/tree/main/SBOM-Catalog" target="_blank">
          <PButton
              label="Contribute on GitHub" icon="pi pi-github"
              rounded outlined severity="secondary" class="w-full"/>
        </a>
      </div>
    </div>
    <div id="workbench" class="flex-grow-1 flex col full-vue-heigth">
      <div v-if="store.filteredTreeData" class="flex-grow-1 flex col full-vue-heigth">
        <circle-plot v-if="store.activeViewMode === ViewMode.Circle"/>
        <tree-plot v-else-if="store.activeViewMode === ViewMode.Tree"/>
        <list-plot v-else-if="store.activeViewMode === ViewMode.List" :dataList="store.rawData" :filterList="store.filters"/>
      </div>
    </div>

    <div class="flex flex-column surface-50 col-2 full-vue-heigth shadow-left">
      <PDivider class="mt-2"/>
      <detail-enumeration/>
    </div>
  </div>

</template>

<style scoped>
.full-vue-heigth {
  height: 100vh;
  position: relative;
  padding: 8px;
}

.not-draggable {
  cursor: no-drop;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card-title {
  font-size: 1.25em;
  font-weight: bold;
}
</style>
