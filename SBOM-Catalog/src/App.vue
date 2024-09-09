<script lang="ts" setup>
import {onBeforeMount, onMounted, reactive, Ref, ref, watch} from "vue";
import axios from "axios";
import {load} from "js-yaml";
import draggable from 'vuedraggable'
import {aggregateList, deepClone, generateTreeObject, normaliseList} from "./global/global.ts";
import TreePlot from "./components/plots/tree-plot.vue";
import ListPlot from "./components/plots/list-plot.vue";
import MarkdownParser from "./components/markdownParser.vue";
import CirclePlot from "./components/plots/circle-plot.vue";
import DetailEnumeration from "./components/detail-enumeration.vue";
import type {Tool} from "./types/tool";
import type {Filter} from "./types/filter";
import {AggregationModes, ViewMode} from "./types/view.d.ts";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const activeViewMode: Ref<ViewMode> = ref(ViewMode.Circle);
const activeAggregationMode: Ref<AggregationModes> = ref(AggregationModes.Normalize)

const rawdata: Ref<Tool[]> = ref([])
const filters = reactive<Filter[]>([]);

const formattedData: Ref<Tool[]> = ref([])
const filteredTreeData = ref()

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
  router.push({params: {view: view}})
}

function onAggregationModeChange(mode: AggregationModes) {
  router.push({params: {aggregation: mode}})

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
  filteredTreeData.value = generateTreeObject(currentFilters, formattedData.value)
}

watch(() => route.params.view, (newView) => {
  if (newView) {
    activeViewMode.value = ViewMode[newView as keyof typeof ViewMode];
    recalculateAllData(filters, rawdata.value)
  }
});

watch(() => route.params.aggregation, (newAggregation) => {
  if (newAggregation) {
    activeAggregationMode.value = AggregationModes[newAggregation as keyof typeof AggregationModes];
    recalculateAllData(filters, rawdata.value)
  }
});


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
        <PButtonGroup>
          <PButton label="Circle" rounded :outlined="activeViewMode !== ViewMode.Circle" :severity="activeViewMode === ViewMode.Circle ? '' : 'secondary'" class="w-4" @click="onViewChange(ViewMode.Circle)"/>
          <PButton label="Tree" rounded :outlined="activeViewMode !== ViewMode.Tree" :severity="activeViewMode === ViewMode.Tree ? '' : 'secondary'" class="w-4" @click="onViewChange(ViewMode.Tree)"/>
          <PButton label="List" rounded :outlined="activeViewMode !== ViewMode.List" :severity="activeViewMode === ViewMode.List ? '' : 'secondary'" class="w-4" @click="onViewChange(ViewMode.List)"/>
        </PButtonGroup>
        </div>

      <PButtonGroup>
        <PButton
            v-tooltip="{ value: 'This mode displays each entry in its original form, without any grouping. This means that an entry can appear multiple times if it belongs to multiple categories. This is useful when you want to see all instances of an entry, regardless of its category.', showDelay: 750, hideDelay: 300 }" label="Normalize" rounded
            :outlined="activeAggregationMode !== AggregationModes.Normalize"
            :severity="activeAggregationMode === AggregationModes.Normalize ? '' : 'secondary'" class="w-6"
            @click="onAggregationModeChange(AggregationModes.Normalize)"/>
        <PButton
            v-tooltip="{ value: 'This mode groups entries by their categories to reduce duplication. If an entry belongs to multiple categories, it will only be displayed once, under a group that represents those categories. This is useful when you want a simplified view of the data, without repeated entries.', showDelay: 750, hideDelay: 300 }" label="Aggregate" rounded
            :outlined="activeAggregationMode !== AggregationModes.Aggregate"
            :severity="activeAggregationMode === AggregationModes.Aggregate ? '' : 'secondary'" class="w-6"
            @click="onAggregationModeChange(AggregationModes.Aggregate)"/>
      </PButtonGroup>

      <PDivider/>

      <draggable v-model="filters" item-key="name" @end="updateFilters">
        <template #item="{element}">
          <div class='flex p-2 mb-2 justify-content-between not-draggable card w-full surface-200 cursor-move'>
            <h2 class="card-title">{{ element.name }}</h2>
            <div class="flex align-items-center">
              <PButton v-tooltip="{ value: element.description, showDelay: 300, hideDelay: 300 }" text rounded icon="pi pi-question-circle" severity="secondary"/>
              <PInputSwitch v-model="element.enabled"/>
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
      <div v-if="filteredTreeData" class="flex-grow-1 flex col full-vue-heigth">
        <circle-plot v-if="activeViewMode === ViewMode.Circle" :dataList="filteredTreeData"/>
        <tree-plot v-else-if="activeViewMode === ViewMode.Tree" :dataList="filteredTreeData"/>
        <list-plot v-else-if="activeViewMode === ViewMode.List" :dataList="rawdata" :filterList="filters"/>
      </div>
    </div>

    <div class="flex flex-column surface-50 col-2 full-vue-heigth shadow-left">
      <div class="flex justify-content-between align-items-center m-2">
        <h2 class="m-0">{{ $route.params.selection }}</h2>
        <img
            :src="'logos/' + $route.params.selection + '.png'" style="display: none"
            alt=""
            class="responsive-image p-1 block"/>
      </div>
      <PDivider class="mt-2"/>
      <div class="scrollable-div">
        <detail-enumeration :rawdata="rawdata"/>
        <markdown-parser/>
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
