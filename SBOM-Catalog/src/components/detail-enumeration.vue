<script lang="ts" setup>
import { useMainStore } from "../stores/mainStore";
import MarkdownParser from "./markdownParser.vue";

const store = useMainStore();

const sourceTooltip = (source: string) => {
  if (source === 'AI-Generated') {
    return "This tool was cataloged using AI"
  } else if (source === 'AI & human reviewed') {
    return 'This tool was cataloged using AI and then reviewed by a human'
  } else if (source === 'Human written') {
    return "This tool was cataloged by a human without AI assistance"
  }
}

const createGitHubIssue = () => {
  const baseUrl = 'https://github.com/ossf/sbom-everywhere/issues/new';
  const currentUrl = window.location.href;
  const title = encodeURIComponent(`Update Entry: ${store.activeSelection}`);
  const body = encodeURIComponent(`Please update the following entry:\n\nTool: ${store.activeSelection}\nContext URL: ${currentUrl}\n\nSuggested changes:\n\n`);
  
  window.open(`${baseUrl}?title=${title}&body=${body}`, '_blank');
}
</script>

<template>
  <div class="flex justify-content-between align-items-center m-2">
    <h2 class="m-0">{{ store.activeSelection }}</h2>
    <div class="flex align-items-center">
      <img
        :src="'logos/' + store.activeSelection + '.png'" 
        style="display: none"
        alt=""
        class="responsive-image p-1 block"
        @error="(e) => e.target.src = `logos/${store.activeSelection[0].toLowerCase()}-solid.svg`"
      />
    </div>
  </div>

  <div class="scrollable-div">
  <div v-if="store.selectedObject">
    <div v-if="store.selectedObject" class="flex justify-content-between align-items-center m-2">
      <PButton
          icon="pi pi-github"
          label="Suggest Fix"
          class="p-button-sm p-button-text p-button-rounded"
          @click="createGitHubIssue"
          severity="secondary"
      />
      <PChip class="p-1 m-1" v-tooltip="sourceTooltip(store.selectedObject.Source)">{{ store.selectedObject.Source }}</PChip>
    </div>
    <PDivider class="mt-2"/>
    <table>
      <tr v-for="(value, key) in store.selectedObject" :key="key">
        <th v-if="typeof value === 'string' && key !== 'Summary' && key !== 'Source'" class="text-left">{{ key }}: </th>
        <td v-if="typeof value === 'string' && key !== 'Summary' && key !== 'Source'" class="white-space-nowrap overflow-hidden text-overflow-ellipsis">
          <div v-if="key === 'Link'">
            <a :href="value" target="_blank">{{ value }}</a>
          </div>
          <div v-else>
            {{ value }}
          </div>
        </td>
      </tr>
    </table>

    <div v-for="(value, key) in store.selectedObject" :key="key">
      <div v-if="Array.isArray(value)">
        <b>{{ key }}:</b>
        <div class="flex-container">
          <PChip v-for="(item, index) in value" :key="index" class="p-1 m-1">{{ item }}</PChip>
        </div>
      </div>
    </div>
    <div class="m-1"/>
    <PDivider/>
  </div>
    <markdown-parser/>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  color: #478566;
}
</style>