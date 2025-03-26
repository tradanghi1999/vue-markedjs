<template>
    <!-- Sử dụng v-memo để cache nội dung render nếu parsedMarkdown không thay đổi -->
    <div class="markdown-body" v-memo="[parsedMarkdown]">
        <div v-html="parsedMarkdown"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { full_md } from '../markdowns';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import parenthesesKatex from '../parenthesesKatex.js';

// Tạo instance của Marked và cấu hình các plugin
const myMarked = new Marked();

const renderer = {
    code(token) {
        //console.log(token);
        return `<div class="code-wrapper">
        <div class="code-header">
          <div>${token.lang}</div>
          <div class="code-copy-btn" onclick="copyCode(this)">Copy</div>
        </div>
        <pre><code class="hljs">${token.text}</code></pre>
      </div>`;
    },
    image(token) {
        return `<img src="${token.href}" alt="${token.text + "1"}" />`;
    },
    // Xử lý các khối HTML (chẳng hạn như <audio>) tùy chỉnh
    html(html) {
        console.log(html);
        if (/^\s*<audio\b/i.test(html)) {
            console.log("OK audio")
            // Ví dụ: thêm class "custom-audio" và thuộc tính controls nếu chưa có
            html = html.replace(/<audio\b/i, '<audio class="custom-audio" controls');
            // Có thể bọc trong <figure> nếu muốn
            return `<figure class="audio-container">${html}</figure>`;
        }
        return html;
    },
};

myMarked.use(markedKatex());
myMarked.use(parenthesesKatex());
myMarked.use(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            const value = hljs.highlight(code, { language }).value;
            return value;
        }
    })
);
myMarked.use({ renderer });

// Reactive ref để chứa nội dung markdown đang được streaming
const streamingMd = ref('');

// Computed property parse markdown từ streamingMd
const parsedMarkdown = computed(() => myMarked.parse(streamingMd.value));

onMounted(() => {
    // Mô phỏng streaming bằng cách tách full_md thành các dòng
    const lines = full_md.split('\n');
    let index = 0;
    const interval = setInterval(() => {
        if (index < lines.length) {
            streamingMd.value += lines[index] + '\n';
            index++;
        } else {
            clearInterval(interval);
        }
    }, 200); // Thời gian delay giữa các dòng, có thể điều chỉnh

    // Gán hàm copyCode vào window để xử lý copy code block
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
});
</script>

<style>
.code-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: #f0f0f0;
    border-bottom: 1px solid #e0e0e0;
}

.code-copy-btn {
    cursor: pointer;
}

.markdown-body {
    padding: 0 350px;
}

.markdown-body table {
    overflow-x: auto;
    display: block;
}
</style>