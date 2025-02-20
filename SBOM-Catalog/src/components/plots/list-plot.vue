<script lang="ts" setup>
import {onMounted, Ref, ref, watch} from "vue";
import {FilterMatchMode} from "primevue/api";
import {Filter} from "../../types/filter";
import { useMainStore } from "../../stores/mainStore";

const store = useMainStore();

const selected = ref()
const activeFilters: Ref<Filter[]> = ref([])
const metaKey = ref(true)

onMounted(() => {
  onFilterChange(store.filters)
})

watch(selected, (newSelection) => {
  store.activeSelection = newSelection.Name
})

watch (store.filters, () => {
  onFilterChange(store.filters)
}, { deep: true })

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
    <PDataTable v-model:selection="selected" v-model:filters="filters" :value="store.rawData" selection-mode="single" data-key="Name" :meta-key-selection="metaKey">
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
                <img :src="'logos/' + slotProps.data[col.name] + '.png'" class="responsive-image p-1" alt=""/>
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