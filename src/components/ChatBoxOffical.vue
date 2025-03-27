<script setup>
import { onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import { Mention, MentionBlot } from "quill-mention";
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import "quill-mention/dist/quill.mention.css"
window.katex = katex


Quill.register({ "blots/mention": MentionBlot, "modules/mention": Mention });
const editor = ref()

let quill = null
const atValues = [
    {
        id: 1,
        value: "Fredrik Sundqvist",
        occupation: "Software Engineer",
        birthYear: 1990,
        avatar: "👨‍💻"
    },
    {
        id: 2,
        value: "Patrik Sjölin",
        occupation: "Designer",
        birthYear: 1988,
        avatar: "👨‍🎨"
    }
];


const isMentionListOpen = ref(false)
const currentMention = ref(null)

const options = ref({
    theme: 'bubble',
    modules: {
        toolbar: false,
        mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["/"],
            showDenotationChar: true,
            defaultMenuOrientation: "top",
            
            // thêm biến searchTerm vào hàm renderItem để tạo rule hiển thị highlight
            renderItem: function (item) {
                const div = document.createElement('div');
                div.className = 'mention-item';
                div.innerHTML = `
                    <span class="mention-avatar">${item.avatar}</span>
                    <div class="mention-info">
                        <div class="mention-name">${item.value}</div>
                        <div class="mention-details">
                            ${item.occupation} · ${item.birthYear}
                        </div>
                    </div>
                `;
                return div;
            },
            onOpen: () => {
                isMentionListOpen.value = true
            },
            onClose: () => {
                isMentionListOpen.value = false
                console.log('onClose')
            },
            source: function (searchTerm, renderList, mentionChar) {
                let values;

                if (mentionChar === "/") {
                    values = atValues;
                }

                if (searchTerm.length === 0) {
                    renderList(values, searchTerm);
                } else {
                    const matches = [];
                    for (let i = 0; i < values.length; i++)
                        if (
                            ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
                        )
                            matches.push(values[i]);
                    renderList(matches, searchTerm);
                }
            },
            onSelect: function (item, insertItem) {
                // // Xóa bold khỏi mọi mention cũ
                // const mentions = document.querySelectorAll('.mention');
                // mentions.forEach(mention => {
                //     mention.style.fontWeight = 'normal';
                // });

                // Lấy toàn bộ text cũ
                const oldText = quill.getText();

                // Xóa sạch editor
                quill.setText(null);

                // Chèn mention mới ở đầu
                // Tham số thứ ba có thể truyền { index: 0 } nếu cần
                insertItem(item, false, { spaceAfterInsert: false });

                // Bôi đậm mention vừa chèn (giữ nguyên setTimeout)
                setTimeout(() => {
                    const newMention = document.querySelector('.mention:last-child');
                    if (newMention) {
                        newMention.style.fontWeight = 'bold';
                    }
                }, 0);

                // Bỏ ký tự "/" kèm từ khóa cũ ở đầu (vd: "/A") trước khi chèn lại text
                // Tuỳ theo bạn muốn bỏ luôn khoảng trắng, có thể điều chỉnh regex
                let newText = oldText.replace(/\n$/, '').replace(/^\/\S*\s?/, '').replace("/", "");
                //oldText = oldText.trimStart();
                console.log('oldText:', oldText);
                console.log('newText:', newText);

                // Chèn lại phần text cũ (sau khi bỏ "/A")
                quill.insertText(quill.getLength() - 1, '' + newText);

                // xoá \n
                if (quill.getContents().ops[0].insert === '\n') {
                    quill.deleteText(0, 1);
                }
                //quill.deleteText(0, 1);

                // Lưu mention hiện tại
                currentMention.value = item;
                console.log('onSelect', item);
            }
        },
        keyboard: {
            bindings: {
                // phải đặt là custom để phân biệt với enter bị ghi đè bởi quill mention
                custom: {
                    key: "Enter",
                    shiftKey: false,
                    handler: function (range, context) {
                        if (isMentionListOpen.value)
                            return true;

                        console.log('Enter key pressed', range, context);

                        // Get plain text content
                        const plainText = quill.getText().trim();
                        console.log('Plain text content:', plainText);

                        // Get rich text content if needed
                        const richContent = quill.getContents();
                        console.log('Rich content:', richContent);

                        // Get content with mentions preserved
                        const delta = quill.getContents();
                        let text = '';

                        delta.ops.forEach(op => {
                            if (typeof op.insert === 'string') {
                                text += op.insert;
                            } else if (typeof op.insert === 'object' && op.insert.mention) {
                                // Format mention as @username
                                text += `@${op.insert.mention.value}`;
                            }
                        });

                        console.log('Plain text with mentions:', text.trim());

                        //chỉ giữ lại mention
                        let deltaToRetain = { ...delta };
                        deltaToRetain.ops = deltaToRetain.ops.filter(op => {
                            return typeof op.insert === 'object' && op.insert.mention;
                        });

                        // nếu không có mention thì chèn agent mặc định
                        if (deltaToRetain.ops.length === 0) {
                            deltaToRetain = { ops: [{ insert: {
                                mention: {
                                    index: 0,
                                    denotationChar: "/",
                                    id: 1,
                                    value: "Brand",
                                }
                            } }] };
                        }

                        console.log('Delta to retain:', deltaToRetain);


                        //Clear the editor
                        quill.setContents(deltaToRetain);
                        setTimeout(() => {
                            const newMention = document.querySelector('.mention:last-child');
                            if (newMention) {
                                newMention.style.fontWeight = 'bold';
                            }
                        }, 0);
                        
                        // đưa con trỏ về cuối
                        quill.setSelection(quill.getLength(), 0);

                        return false;
                    }
                }
            }
        }
    },
    placeholder: 'Insert text here ...',
    readOnly: false
})

onMounted(() => {
    quill = editor.value?.initialize(Quill)
    console.log('Keyboard module:', quill.getModule('keyboard'));


})

</script>

<template>
    <div style="margin-top: 200px;">
        <QuillyEditor ref="editor" :options="options" />
    </div>
</template>

<style>
.mention {
    background-color: #fff;
}

.ql-container {
    border: 1px solid #e1e4e8;
    border-radius: 15px;
    min-height: 300px;
}
</style>