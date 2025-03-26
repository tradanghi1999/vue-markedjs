/* eslint-disable */

import katex from 'katex';

/**
 * Tạo renderer chung, giống logic bạn có sẵn
 * Chỉ khác ở chỗ chúng ta thay đổi rule để match \(...\) / \[...\].
 */
function createRenderer(options, newlineAfter) {
  return (token) =>
    katex.renderToString(token.text, {
      ...options,
      displayMode: token.displayMode,
    }) + (newlineAfter ? '\n' : '');
}

/**
 * Extension inline cho \(...\)
 */
function inlineParenKatex(options, renderer) {
  // Ví dụ: \(...\) => lấy đoạn bên trong cặp \( \)
  // Lưu ý thêm ?: để tránh capturing group không cần thiết
  const inlineParenRule = /^\\\(((?:\\.|[^\\\n])+?)\\\)/; 

  return {
    name: 'inlineParenKatex',
    level: 'inline',
    start(src) {
      // Tìm vị trí đầu tiên của \(
      return src.indexOf('\\(');
    },
    tokenizer(src) {
      const match = inlineParenRule.exec(src);
      if (match) {
        return {
          type: 'inlineParenKatex',
          raw: match[0],
          text: match[1].trim(),
          displayMode: false, // inline
        };
      }
    },
    renderer,
  };
}

/**
 * Extension block cho \[...\]
 *  - Ở dạng block, ta thường cần cho phép match xuống dòng.
 *  - Tuỳ ý bạn có cần yêu cầu \[ phải nằm trên đầu dòng hay không, 
 *    hoặc bắt buộc \] phải theo sau 1 newline. Tuỳ nhu cầu mà điều chỉnh.
 */
function blockParenKatex(options, renderer) {
  // Ví dụ block: 
  // \[
  //   ... nội dung ...
  // \]
  // Hoặc bạn có thể gộp lại thành 1 dòng: \[ ... \]
  // tuỳ thuộc vào RegExp. Ở đây ví dụ cho phép match ngay trên cùng 1 dòng.
  // Nếu muốn buộc phải có newline, bạn có thể dùng ^\\\[ *\n((...))\n\\\]
  const blockParenRule = /^\\\[\s*([\s\S]+?)\s*\\\]/; 

  return {
    name: 'blockParenKatex',
    level: 'block',
    tokenizer(src) {
      const match = blockParenRule.exec(src);
      if (match) {
        return {
          type: 'blockParenKatex',
          raw: match[0],
          text: match[1].trim(),
          displayMode: true, // block
        };
      }
    },
    renderer,
  };
}

/**
 * Gói gọn hai extension trên thành 1 "enhance extension" trả về mảng `extensions`.
 * Bạn chỉ việc import và dùng chung với extension cũ là xong.
 */
export default function parenthesesKatex(options = {}) {
  return {
    extensions: [
      inlineParenKatex(options, createRenderer(options, false)),
      blockParenKatex(options, createRenderer(options, true)),
    ],
  };
}
