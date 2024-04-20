<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import axios from 'axios';
import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';

const props = defineProps(['selected'])
const mdres = ref()

onMounted(() => {
  loadMarkdown(props.selected)
})

watch(() => props.selected, (newSelected) => {
  loadMarkdown(newSelected)
})

function loadMarkdown(newSelected: string) {
  const marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, {language}).value;
        }
      })
  )

  axios.get('descriptions/' + newSelected + '.md').then(mark => {
    mdres.value = marked.parse(mark.data)
  }).catch(() => {
    mdres.value = marked.parse('*No description available*')
  })
}

</script>

<template>
    <div v-html="mdres"/>
</template>