<script lang="ts" setup>
import {ref, watch} from "vue";

const props = defineProps(['selected', 'rawdata'])

const selectedObject = ref(null)

watch(() => props.selected, (newVal) => {
  selectedObject.value = null
  selectedObject.value = props.rawdata.find(x => x.Name === newVal)
})

</script>

<template>
  <div v-if="selectedObject">
    <table>
      <tr v-for="(value, key) in selectedObject" :key="key">
        <th v-if="typeof value === 'string'" class="text-left">{{ key }}: </th>
        <td v-if="typeof value === 'string'" class="white-space-nowrap overflow-hidden text-overflow-ellipsis">
          <div v-if="value === 'Link'">
            <a :href="value" target="_blank">{{ value }}</a>
          </div>
          <div v-else>
            {{ value }}
          </div>
        </td>
      </tr>
    </table>

    <div v-for="(value, key) in selectedObject" :key="key">
      <div v-if="Array.isArray(value)">
        <b>{{ key }}:</b>
        <div class="flex-container">
          <p-chip class="p-1 m-1" v-for="(item, index) in value" :key="index">{{ item }}</p-chip>
        </div>
      </div>
    </div>
    <div class="m-1"/>
    <p-divider/>
  </div>

</template>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
</style>