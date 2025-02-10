<script lang="ts" setup>
import {ref, watch} from "vue";
import axios from 'axios';
import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import {useRoute} from "vue-router";

const mdres = ref()

const props = defineProps(['rawdata'])

const route = useRoute();

watch(() => route.params.selection, (newVal) => {
  const selectedObject = props.rawdata.find(x => x.Name === newVal)
  if (selectedObject) {
    const marked = new Marked(
        markedHighlight({
          langPrefix: 'hljs language-',
          highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language}).value;
          }
        })
    )
    if (selectedObject.Summary === undefined) {
      mdres.value = marked.parse('*No description available*')
    } else {
      mdres.value = marked.parse(selectedObject.Summary)
    }
  } else {
    loadRemoteText(route.params.selection)
  }
})

function loadRemoteText(newSelected: string) {
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
<!--    This can trigger some Scanners for XSS injections. -->
<!--    But the HTML that is loaded here is only influenced by the-->
<!--    markdown files in public and comes from the server as static resource.-->
    <div v-html="mdres"/>
</template>