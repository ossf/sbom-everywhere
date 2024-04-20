<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {FilterMatchMode} from "primevue/api";

const selected = ref()
const activeFilters = ref([])
const metaKey = ref(true)

const props = defineProps(['data', 'filters', 'selectedItem'])
const emit = defineEmits(['update:selectedItem'])

onMounted(() => {
  onFilterChange(props.filters)
})

watch(selected, (newSelection) => {
  emit('update:selectedItem', newSelection.Name)
})

watch (props, (newProps) => {
  onFilterChange(newProps.filters)
})

function onFilterChange(newProps) {
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
    <p-dataTable :value="props.data" v-model:selection="selected" v-model:filters="filters" selectionMode="single" dataKey="Name" :metaKeySelection="metaKey">
      <template #header>
        <div class="flex justify-content-between align-items-center">
          <h2>List of all SBOM related Tools:</h2>
          <p-iconField iconPosition="left">
                <p-inputIcon class="pi pi-search"/>
                <p-inputText v-model="filters['global'].value" placeholder="Search"/>
          </p-iconField>
        </div>
      </template>

      <p-column v-for="col of activeFilters" :field="col.name" :header="col.name">
        <template #body="slotProps">
          <div class="flex">
            <div v-if="typeof slotProps.data[col.name] === 'string'">
              <div class="flex align-items-center">
                <img :src="'logos/' + slotProps.data[col.name] + '.png'" :alt="slotProps.data[col.name]" class="responsive-image p-1"/>
                <div class="m-2">{{ slotProps.data[col.name] }}</div>
              </div>
            </div>
            <div v-else-if="Array.isArray(slotProps.data[col.name])">
              <div class="flex">
                <div v-for="item in slotProps.data[col.name]">
                  <p-chip :label="item" class="m-1"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </p-column>
    </p-dataTable>
  </div>

</template>

<style scoped>

</style>