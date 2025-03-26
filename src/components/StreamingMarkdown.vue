<template>
    <!-- This element will hold the rendered markdown -->
    <div ref="markdownContainer" class="markdown-body"></div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import * as smd from '../smd'
  import { full_md } from '@/markdowns'
  
  export default {
    name: 'StreamingMarkdown',
    setup() {
      const markdownContainer = ref(null)
      let parser = null
  
      onMounted(() => {
        // Create a renderer that attaches to our container element
        const renderer = smd.default_renderer(markdownContainer.value)
        // Create a new parser with the renderer
        parser = smd.parser(renderer)
        
        // Stream markdown content to the parser
        smd.parser_write(parser, full_md)
        //smd.parser_write(parser, "This is some **bold** text streamed into Vue.")
        
        // Call the end function to finish the parsing
        smd.parser_end(parser)
      })
  
      return {
        markdownContainer
      }
    }
  }
  </script>
  