<script lang="ts" setup>
import {onBeforeMount, reactive, Ref, ref, watch} from "vue";
import axios from "axios";
import { load } from "js-yaml";
import draggable from 'vuedraggable'
import {aggregateList, deepClone, generateTreeObject, normaliseList} from "./global/global.ts";
import TreePlot from "./components/plots/tree-plot.vue";
import ListPlot from "./components/plots/list-plot.vue";
import MarkdownParser from "./components/markdownParser.vue";
import CirclePlot from "./components/plots/circle-plot.vue";
import DetailEnumeration from "./components/detail-enumeration.vue";
import type { Tool } from "./types/tool";
import type { Filter } from "./types/filter";

enum AggregationModes {
  Normalize,
  Aggregate
}

enum ViewMode {
  Circle,
  Tree,
  List
}

const activeViewMode: Ref<ViewMode> = ref(ViewMode.Circle)
const activeAggregationMode: Ref<AggregationModes> = ref(AggregationModes.Normalize)

const rawdata: Ref<Tool[]> = ref([])
const filters = reactive<Filter[]>([]);

const formattedData: Ref<Tool[]> = ref([])
const filteredTreeData = ref()

const selectedItem: Ref<string> = ref('HowTo')

onBeforeMount(() => {
  axios.get('filters.yaml').then(x => {
    let filterList: Filter[] = load(x.data) as Filter[]
    filterList.forEach((filter: Filter) => filters.push(filter))
  })
  axios.get('data.yaml').then(x => {
    rawdata.value = load(x.data) as Tool[]
  })
})

function onViewChange(view: ViewMode) {
  console.log("View changed: " + view)
  activeViewMode.value = view
}

function onAggregationModeChange(mode: AggregationModes) {
  console.log("AggregationModeChange: " + mode)
  activeAggregationMode.value = mode
  recalculateAllData(filters, rawdata.value)
}

const updateFilters = (event: any) => {
  const movedItem = filters.splice(event.oldIndex, 1)[0];
  filters.splice(event.newIndex, 0, movedItem);
};

function recalculateAllData(currentFilters: Filter[], currentRawData: Tool[]) {
  if (activeAggregationMode.value === AggregationModes.Normalize) {
    formattedData.value = normaliseList(deepClone(currentRawData))
  } else if (activeAggregationMode.value === AggregationModes.Aggregate) {
    formattedData.value = aggregateList(deepClone(currentRawData))
  }
  console.log(formattedData.value)
  filteredTreeData.value = generateTreeObject(currentFilters, formattedData.value)
}

watch(rawdata, (newRawData) => {
  recalculateAllData(filters, newRawData)
})

watch(filters, (newFilters) => {
  recalculateAllData(newFilters, rawdata.value)
})

</script>

<template>
  <div class="flex overflow-hidden grid max-h-full m-0">
    <div class="flex-column flex col-2 surface-50 full-vue-heigth shadow-right scrollable-div">

      <div class="mb-2 w-full">
        <p-buttonGroup>
          <p-button label="Circle" rounded :outlined="activeViewMode !== ViewMode.Circle" :severity="activeViewMode === ViewMode.Circle ? '' : 'secondary'" @click="onViewChange(ViewMode.Circle)" class="w-4"/>
          <p-button label="Tree" rounded :outlined="activeViewMode !== ViewMode.Tree" :severity="activeViewMode === ViewMode.Tree ? '' : 'secondary'" @click="onViewChange(ViewMode.Tree)" class="w-4"/>
          <p-button label="List" rounded :outlined="activeViewMode !== ViewMode.List" :severity="activeViewMode === ViewMode.List ? '' : 'secondary'" @click="onViewChange(ViewMode.List)" class="w-4"/>
        </p-buttonGroup>
        </div>

      <p-buttonGroup>
        <p-button label="Normalize" rounded :outlined="activeAggregationMode !== AggregationModes.Normalize"
                  :severity="activeAggregationMode === AggregationModes.Normalize ? '' : 'secondary'"
                  @click="onAggregationModeChange(AggregationModes.Normalize)" class="w-6"
                  v-tooltip="{ value: 'This mode displays each entry in its original form, without any grouping. This means that an entry can appear multiple times if it belongs to multiple categories. This is useful when you want to see all instances of an entry, regardless of its category.', showDelay: 750, hideDelay: 300 }"/>
        <p-button label="Aggregate" rounded :outlined="activeAggregationMode !== AggregationModes.Aggregate"
                  :severity="activeAggregationMode === AggregationModes.Aggregate ? '' : 'secondary'"
                  @click="onAggregationModeChange(AggregationModes.Aggregate)" class="w-6"
                  v-tooltip="{ value: 'This mode groups entries by their categories to reduce duplication. If an entry belongs to multiple categories, it will only be displayed once, under a group that represents those categories. This is useful when you want a simplified view of the data, without repeated entries.', showDelay: 750, hideDelay: 300 }"/>
      </p-buttonGroup>

      <p-divider/>

      <draggable v-model="filters" @end="updateFilters" itemKey="name">
        <template #item="{element}">
          <div class='flex p-2 mb-2 justify-content-between not-draggable card w-full surface-200 cursor-move'>
            <h2 class="card-title">{{ element.name }}</h2>
            <div class="flex align-items-center">
              <p-button v-tooltip="{ value: element.description, showDelay: 300, hideDelay: 300 }" text rounded icon="pi pi-question-circle" severity="secondary"/>
              <p-inputSwitch v-model="element.enabled"/>
            </div>
          </div>
        </template>
      </draggable>

      <div style="margin-top: auto">
        <a href="https://seclab.cs.hm.edu/imprint/" target="_blank" style="text-decoration: none">
          <p class="text-300 hover:text-500">Imprint</p>
        </a>
        <a href="https://github.com/hm-seclab/SBOM-Landscape/" target="_blank">
          <p-button label="Contribute on GitHub" icon="pi pi-github"
                    rounded outlined severity="secondary" class="w-full"/>
        </a>
      </div>
    </div>
    <div id="workbench" class="flex-grow-1 flex col full-vue-heigth">
      <div v-if="filteredTreeData" class="flex-grow-1 flex col full-vue-heigth">
        <circle-plot v-if="activeViewMode === ViewMode.Circle" :data="filteredTreeData" v-model:selected-item="selectedItem"/>
        <tree-plot v-else-if="activeViewMode === ViewMode.Tree" :data="filteredTreeData" v-model:selected-item="selectedItem"/>
        <list-plot v-else-if="activeViewMode === ViewMode.List" :data="rawdata" :filters="filters" v-model:selected-item="selectedItem"/>
      </div>
    </div>

    <div class="flex flex-column surface-50 col-2 full-vue-heigth shadow-left">
      <div class="flex justify-content-between align-items-center m-2">
        <h2 class="m-0">{{ selectedItem }}</h2>
        <img :src="'logos/' + selectedItem + '.png'" style="display: none"
             @error="event => event.target.style.display = 'none'"
             @load="event => event.target.style.display = 'block'"
             :alt="selectedItem"
             class="responsive-image p-1"/>
      </div>
      <p-divider class="mt-2"/>
      <div class="scrollable-div">
        <detail-enumeration :selected="selectedItem" :rawdata="rawdata"/>
        <markdown-parser :selected="selectedItem"/>
      </div>
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
