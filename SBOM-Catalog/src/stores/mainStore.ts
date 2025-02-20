import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Tool } from '../types/tool'
import type { Filter } from '../types/filter'
import axios from 'axios'
import { load } from 'js-yaml'
import { aggregateList, deepClone, generateTreeObject, normaliseList } from '../global/global'
import { AggregationModes, ViewMode } from '../types/view.d.ts'
import { useRoute } from 'vue-router'

export const useMainStore = defineStore('main', () => {
  const route = useRoute()
  
  // State
  const rawData = ref<Tool[]>([])
  const filters = ref<Filter[]>([])
  const formattedData = ref<Tool[]>([])
  const filteredTreeData = ref()
  const activeViewMode = ref<ViewMode>(ViewMode.Circle)
  const activeAggregationMode = ref<AggregationModes>(AggregationModes.Normalize)
  const activeSelection = ref<string>("HowTo")
  const selectedObject = ref<Tool | null>(null)

  // Actions
  async function loadInitialData() {
    if (route.params.view) {
      activeViewMode.value = ViewMode[route.params.view as keyof typeof ViewMode]
    }
    if (route.params.aggregation) {
      activeAggregationMode.value = AggregationModes[route.params.aggregation as keyof typeof AggregationModes]
    }
    if (route.params.selection) {
      activeSelection.value = route.params.selection as string
    }

    try {
      const [filtersResponse, dataResponse] = await Promise.all([
        axios.get('filters.yaml'),
        axios.get('data.yaml')
      ])
      
      filters.value = load(filtersResponse.data) as Filter[]
      rawData.value = load(dataResponse.data) as Tool[]

      // Initialize from route params if they exist
      syncWithRoute()
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  function updateFilters(event: { oldIndex: number; newIndex: number }) {
    const movedItem = filters.value.splice(event.oldIndex, 1)[0]
    filters.value.splice(event.newIndex, 0, movedItem)
  }

  function recalculateAllData() {
    if (!activeAggregationMode.value || !rawData.value) return

    if (activeAggregationMode.value === AggregationModes.Normalize) {
      formattedData.value = normaliseList(deepClone(rawData.value))
    } else if (activeAggregationMode.value === AggregationModes.Aggregate) {
      formattedData.value = aggregateList(deepClone(rawData.value))
    }

    filteredTreeData.value = generateTreeObject(filters.value, formattedData.value)
  }

  // New function to sync store with route
  function syncWithRoute() {
    route.params.view = activeViewMode.value
    route.params.aggregation = activeAggregationMode.value
    route.params.selection = activeSelection.value
    recalculateAllData()
  }

  // Set up watchers
  watch([rawData, filters, activeAggregationMode], () => {
    recalculateAllData()
  })

  // Watch route changes
  watch(() => route.params, () => {
    syncWithRoute()
  })

  watch(filters, () => {
    recalculateAllData()
  })

  watch(() => activeSelection.value, (newVal) => {
    selectedObject.value = rawData.value.find(x => x.Name === newVal) || null
  })

  return {
    // State
    rawData,
    filters,
    formattedData,
    filteredTreeData,
    activeViewMode,
    activeAggregationMode,
    activeSelection,
    selectedObject,
    // Actions
    loadInitialData,
    updateFilters,
    recalculateAllData,
    syncWithRoute
  }
}) 