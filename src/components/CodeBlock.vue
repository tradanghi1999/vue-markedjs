<script>
import { defineProps } from 'vue'
defineProps({
  code: String,
})
</script>
<template>
  <code class="code">
    {{ code }}
  </code>
</template>
<style>
.code {
  padding: 20px;
  background-color: #eee;
  border-radius: 8px;
  display: block;
}
</style>