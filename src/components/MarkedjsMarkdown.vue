<template>
  <div class="markdown-body" v-html="md"></div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import { marked, Marked } from 'marked';
import markedKatex from "marked-katex-extension";
//import markedMermaid from "marked-mermaid";
import { full_md } from '../markdowns';
//import mermaid from 'mermaid';
//import { render } from 'vue';
//import { ref } from 'vue'
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

//const markdown = ref(full_md)

export default {
  name: 'MarkedjsMarkdow',
  components: {
  },
  data() {
    const marked = new Marked();
    const renderer = {
      code(tokens) {
        // istanbul ignore next
        console.log(tokens);
        return `<div class="code-wrapper">
          <div class="code-header">
            <div>${tokens.lang}</div>
            <div class="code-copy-btn"onclick="copyCode(this)">Copy</div>
          </div>
          <pre><code class="hljs">${tokens.text}</code></pre>
        </div>`;
      },
    }

  marked.use(markedKatex());

  marked.use(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        const value = hljs.highlight(code, { language }).value;
        //console.log(value);
        return value;
      }
    })

  
  )
    marked.use({ renderer });
    console.log(marked);

  return {
    md: marked.parse(full_md),
    markedHighlight,
    hljs,
    renderer
  }
},
mounted() {
  // Add copyCode function to window object
  window.copyCode = (button) => {
      const wrapper = button.closest('.code-wrapper');
      const code = wrapper.querySelector('code');
      const text = code.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        button.innerText = 'Copied!';
        setTimeout(() => {
          button.innerText = 'Copy';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    };

  console.log(marked.options)
}
}
</script>


<style>
.code-header{
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.code-copy-btn{
  cursor: pointer;
}
</style>

