<script lang="ts" setup>
import { ref, watch } from "vue";
import axios from 'axios';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import { useMainStore } from "../stores/mainStore";

const mdres = ref<string>();
const store = useMainStore();

watch(() => store.selectedObject, (selectedObject) => {
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  if (selectedObject) {
    if (selectedObject.Summary === undefined) {
      mdres.value = marked.parse('*No description available*');
    } else {
      mdres.value = marked.parse(selectedObject.Summary);
    }
  } else {
    loadRemoteText(store.activeSelection);
  }
});

function loadRemoteText(newSelected: string) {
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  axios.get(`descriptions/${newSelected}.md`)
    .then(mark => {
      mdres.value = marked.parse(mark.data);
    })
    .catch(() => {
      mdres.value = marked.parse('*No description available*');
    });
}
</script>

<template>
  <!--    This can trigger some Scanners for XSS injections. -->
  <!--    But the HTML that is loaded here is only influenced by the-->
  <!--    markdown files in public and comes from the server as static resource.-->
  <div v-html="mdres"/>
</template>