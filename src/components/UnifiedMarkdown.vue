<template>
  <VueMarkdown :class="`markdown-body`" :markdown="markdown" :sanitize="false" :rehypeOptions="{ allowDangerousHtml: true }"
    :remarkPlugins="[remarkGfm, remarkMath]" :rehypePlugins="[rehypeKatex, rehypeHighlight, rehypeRaw]">
    <template #code="{ children, ...props }">
      <template v-if="!props.inline">
        <div style="background-color: white; color: black; border-radius: 5px; display: flex; flex-direction: column; gap: 1px;">
          <div style="display: flex; justify-content: space-between; padding: 5px 10px;">
            <div>{{ props.class[1].replaceAll("language-","") }}</div>
            <div style="cursor: pointer;" @click="copyToClipboard(props)">{{
            copyStatus }}</div>
          </div>
          <code :class="`hljs ${props.class[1]}`">
            <Component :is="children" />
          </code>
        </div>
      </template>
      <template v-else>
        <code :class="`hljs`">
          <Component :is="children" />
        </code>
      </template>
    </template>
  </VueMarkdown>
</template>

<script>
//import { nextTick } from 'vue'
import { VueMarkdown } from '@crazydos/vue-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'
import { full_md } from '../markdowns'
import { h, Fragment } from 'vue'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github.css'
import "../markdown.css"

// import {
//   BIconCopy,
//   BIconCheck
// } from "bootstrap-icons-vue";
//import Clipboard from 'clipboard' Thiếu link, mermiaid, iframe

export default {
  name: 'UnifiedMarkdown',
  components: {
    VueMarkdown,
  },
  data() {
    //:remark-plugins="[remarkGfm, remarkMath]" :rehype-plugins="[rehypeKatex, rehypeHighlight, [rehypeReact, options]]"
    const options = {
      createElement: h,
      Fragment: Fragment,
      elementAttributeNameCase: 'html',
      stylePropertyNameCase: 'dom'
    }

    return {
      markdown: full_md,
      remarkGfm: remarkGfm,
      remarkMath: remarkMath,
      rehypeKatex: rehypeKatex,
      rehypeHighlight: rehypeHighlight,
      rehypeReact: rehypeReact,
      rehypeRaw: rehypeRaw,
      options: options,
      copyStatus: 'copy'
    }
  },
  methods: {
    
    copyToClipboard(content) {
      this.copyStatus = 'copied'
      console.log(content)
      setTimeout(() => {
        this.copyStatus = 'copy'
      }, 3000);
    }
  }
}
</script>

<style>


</style>
