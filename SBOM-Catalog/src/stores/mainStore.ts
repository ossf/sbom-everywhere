import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Tool } from '../types/tool'
import type { Filter } from '../types/filter'
import axios from 'axios'
import { load } from 'js-yaml'
import { aggregateList, deepClone, generateTreeObject, normaliseList } from '../global/global'
import { AggregationModes, ViewMode } from '../types/view.d.ts'
import { useRouter } from 'vue-router'

export const useMainStore = defineStore('main', () => {
  const router = useRouter()
  
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
    // Wait for router to be ready
    await router.isReady()
    
    const params = router.currentRoute.value.params
    console.log('Router params:', params)

    if (params.view) {
      activeViewMode.value = ViewMode[params.view as keyof typeof ViewMode] || ViewMode.Circle
    }
    
    if (params.aggregation) {
      activeAggregationMode.value = AggregationModes[params.aggregation as keyof typeof AggregationModes] || AggregationModes.Normalize
    }
    
    if (params.selection) {
      activeSelection.value = params.selection as string
    }

    try {
      const [filtersResponse, dataResponse] = await Promise.all([
        axios.get('filters.yaml'),
        axios.get('data.yaml')
      ])
      
      filters.value = load(filtersResponse.data) as Filter[]
      rawData.value = load(dataResponse.data) as Tool[]
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

  // Set up watchers
  watch([rawData, filters, activeAggregationMode], () => {
    recalculateAllData()
  })

  // Watch route changes
  watch(() => activeViewMode.value, (newValue) => {
    router.replace({
      params: {
        ...router.currentRoute.value.params,
        view: newValue
      }
    })
  })

  watch(() => activeAggregationMode.value, (newValue) => {
    router.replace({
      params: {
        ...router.currentRoute.value.params,
        aggregation: newValue
      }
    })
  })

  watch(() => activeSelection.value, (newValue) => {
    router.replace({
      params: {
        ...router.currentRoute.value.params,
        selection: newValue
      }
    })
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
    recalculateAllData
  }
}) 