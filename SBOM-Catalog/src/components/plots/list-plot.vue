<script lang="ts" setup>
import {onMounted, Ref, ref, watch} from "vue";
import {FilterMatchMode} from "primevue/api";
import {Tool} from "../../types/tool";
import {Filter} from "../../types/filter";

interface listPlotProps {
  dataList: Tool[]
  filterList: Filter[]
}

const props = defineProps<listPlotProps>()
const emit = defineEmits(['update:selectedItem'])

const selected = ref()
const activeFilters: Ref<Filter[]> = ref([])
const metaKey = ref(true)

onMounted(() => {
  onFilterChange(props.filterList)
})

watch(selected, (newSelection) => {
  emit('update:selectedItem', newSelection.Name)
})

watch (props, (newProps) => {
  onFilterChange(newProps.filterList)
})

function onFilterChange(newProps: Filter[]) {
  activeFilters.value.length = 0
  newProps.forEach(filter => {
    if (filter.enabled) {
      activeFilters.value.push(filter)
    }
  })
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
</script>

<template>
  <div class="w-12 scrollable-div">
    <PDataTable v-model:selection="selected" v-model:filters="filters" :value="props.dataList" selection-mode="single" data-key="Name" :meta-key-selection="metaKey">
      <template #header>
        <div class="flex justify-content-between align-items-center">
          <h2>List of all SBOM related Tools:</h2>
          <PIconField icon-position="left">
            <PInputIcon class="pi pi-search"/>
            <PInputText v-model="filters['global'].value" placeholder="Search"/>
          </PIconField>
        </div>
      </template>

      <PColumn v-for="col of activeFilters" :key="col.name" :field="col.name" :header="col.name">
        <template #body="slotProps">
          <div class="flex">
            <div v-if="typeof slotProps.data[col.name] === 'string'">
              <div class="flex align-items-center">
                <img :src="'logos/' + slotProps.data[col.name] + '.png'" :alt="slotProps.data[col.name]" class="responsive-image p-1"/>
                <div class="m-2">{{ slotProps.data[col.name] }}</div>
              </div>
            </div>
            <div v-else-if="Array.isArray(slotProps.data[col.name])">
              <div class="flex flex-wrap">
                <div v-for="item in slotProps.data[col.name]" :key="item">
                  <PChip :label="item" class="m-1"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </PColumn>
    </PDataTable>
  </div>

</template>

<style scoped>

</style>