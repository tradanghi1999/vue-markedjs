<template>
  <!-- Sử dụng v-memo để cache nội dung khi parsedMarkdown không thay đổi -->
  <div class="markdown-body" v-memo="[parsedResponse]">
    <div v-html="parsedResponse"></div>
  </div>
  <div class="markdown-body" v-memo="[parsedArtifact]">
    <div v-html="parsedArtifact"></div>
  </div>
  <div class="markdown-body" v-memo="[parsedMarkdown]">
    <div v-html="parsedMarkdown"></div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { marked, Marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { full_md } from '../markdowns';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import parenthesesKatex from '../parenthesesKatex.js';
import markedMoreLists from "../markedMoreList";
import artifactContent from './artifact.md?raw';
import responseContent from './response.md?raw';


// artifact
// Định nghĩa extension cho antartifact
const antartifactExtension = {
  name: 'antartifact',
  level: 'block', // Xử lý ở cấp block-level
  start(src) {
    // Tìm vị trí đầu tiên có thẻ <antartifact
    return src.indexOf('<antartifact');
  },
  tokenizer(src) {
    // Sử dụng regex để nhận dạng đoạn nội dung antartifact
    const rule = /^<antartifact([^>]*)>([\s\S]*?)<\/antartifact>/;
    const match = rule.exec(src);
    //console.log("Match Artifact:", match);
    //console.log("Match", match);
    if (match) {
      const subTypeMatch = match[1].match(/type="([^"]+)"/);
      const indentifierMatch = match[1].match(/identifier="([^"]+)"/);
      const titleMatch = match[1].match(/title="([^"]+)"/);
      return {
        type: 'antartifact', // Tên kiểu token
        raw: match[0],        // Toàn bộ nội dung match được
        text: match[2] ? match[2].trim() : '', // Nội dung bên trong thẻ
        subType: subTypeMatch[1] ? subTypeMatch[1] : '', // Giá trị của thuộc tính type
        identifier: indentifierMatch[1] ? indentifierMatch[1] : '', // Giá trị của thuộc tính identifier
        title: titleMatch[1] ? titleMatch[1] : '', // Giá trị của thuộc tính title
      };
    }

    return false;

  },
  renderer(token) {
    // Render nội dung token dưới dạng code block
    function escapeHtml(html) {
      return String(html)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    if (token != null) {
      console.log("Token", token.subType);
      if (token.subType.includes("react")) {
        // Nếu có subType, render nội dung bên trong thẻ <antartifact>
        const language = "typescript";
        const value = hljs.highlight((token.text), { language }).value;
        return `
        <div class="code-wrapper">
          <div class="code-header">
            <div>${language}</div>
              <div class="code-copy-btn" onclick="copyCode(this)">Copy</div>
            </div>
            <pre><code class="hljs ">${value}</code></pre>
        </div>`;
      }
      return `<pre><code class="hljs">${escapeHtml(token.text)}</code></pre>`;
    }

  }
};


// Định nghĩa extension cho web_broswer
const webBrowserExtension = {
  name: "web_broswer",
  level: "block",
  start(src) {
    // Tìm vị trí đầu tiên có thẻ <antartifact
    return src.indexOf('<web_browser');
  },
  tokenizer(src) {
    // Sử dụng regex để nhận dạng đoạn nội dung antartifact
    //console.log(src)
    const rule = /^<web_browser([^>]*)>([\s\S]*?)<\/web_browser>/;
    const match = rule.exec(src);
    //console.log("Match", match);
    if (match) {
      // Extract status and link from attributes
      const statusMatch = match[1].match(/status="([^"]+)"/);
      const status = statusMatch ? statusMatch[1] : '';
      
      const linkMatch = match[1].match(/link="([^"]+)"/);
      const link = linkMatch ? linkMatch[1] : match[2].trim();

      return {
        type: 'web_broswer',
        raw: match[0],
        status: status,
        link: link
      };
    }

    return false;

  },
  renderer(token){
    if (token != null) {
      if (token.status === "start") {
        // Nếu có subType, render nội dung bên trong thẻ <antartifact>
        return `<p><strong>Browsing: ${token.link}</strong></p>`;
      }
      else if (token.status === "end") {
        return `<p><strong>Browsed: ${token.link}</strong></p>`;
      }
      return `<p>Error using web browser</p>`
    }
  }
}


marked.use({
  extensions: [webBrowserExtension, antartifactExtension],
})

// Tạo instance mới của Marked
const myMarked = new Marked();

// Tạo renderer tùy chỉnh
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
  html(html) {
    //console.log(html);
    if (/^\s*<audio\b/i.test(html.text)) {
      //console.log("OK audio")
      // Ví dụ: thêm class "custom-audio" và thuộc tính controls nếu chưa có
      html.text = html.text.replace(/<audio\b/i, '<audio class="custom-audio" controls');
      // Có thể bọc trong <figure> nếu muốn
      return `<figure class="audio-container">${html.text}</figure>`;
    }
    return html.text;
  },
};

// Sử dụng các plugin của Marked
myMarked.use(markedMoreLists());
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

const parsedArtifact = computed(() => marked.parse(artifactContent));
const parsedResponse = computed(() => marked.parse(responseContent));
// Tạo computed property để parse markdown, chỉ re-compute khi full_md thay đổi
const parsedMarkdown = computed(() => myMarked.parse(full_md));


// Gán hàm copyCode vào đối tượng window trong onMounted
onMounted(() => {
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

/* CSS bổ sung để xử lý bảng */
.markdown-body table {
  overflow-x: auto;
  display: block;
}
</style>
