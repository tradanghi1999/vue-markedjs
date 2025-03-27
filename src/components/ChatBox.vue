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
//const model = ref(`<h1 class="ql-align-center"><span style="background-color: rgb(255, 235, 204);"> </span><span style="background-color: rgb(255, 235, 204); color: rgb(102, 163, 224);">Lorem Ipsum</span><span style="background-color: rgb(255, 235, 204);"> </span></h1><h2><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">What is Lorem Ipsum?</span></h2><p class="ql-align-justify"><strong style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Lorem Ipsum</strong><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of</span><span style="background-color: rgb(255, 255, 255);"> </span><a href="https://github.com/alekswebnet/vue-quilly" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255);">Lorem Ipsum</a><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">.</span></p><ol><li data-list="ordered" class="ql-align-justify"><span class="ql-ui" contenteditable="false"></span>Lorem</li><li data-list="ordered" class="ql-align-justify"><span class="ql-ui" contenteditable="false"></span>Ipsum</li><li data-list="ordered" class="ql-align-justify"><span class="ql-ui" contenteditable="false"></span>Dolor</li></ol><p class="ql-align-justify"><img src="https://picsum.photos/seed/picsum/300/300"></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/2ZahQhb98-E?si=MJDVZOXxjvWrv9Kl"></iframe><p><br></p><p><span class="ql-formula" data-value="e=mc^2"><span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>e</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">e=mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.4306em;"></span><span class="mord mathnormal">e</span><span class="mspace" style="margin-right: 0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.2778em;"></span></span><span class="base"><span class="strut" style="height: 0.8141em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height: 0.8141em;"><span class="" style="top: -3.063em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>`)
//const editorDelta = ref()
//const editorRange = ref()

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
// const hashValues = [
//     { id: 3, value: "Fredrik Sundqvist 2" },
//     { id: 4, value: "Patrik Sjölin 2" }
// ];

const isMentionListOpen = ref(false)
const currentMention = ref(null)

const options = ref({
    theme: 'bubble',
    modules: {
        toolbar: false,
        mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["/"],
            showDenotationChar: false,
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
                // Store current cursor position
                const currentPosition = quill.getSelection()?.index;
                // Remove the "/" character before inserting the mention
                if (currentPosition) {
                    quill.deleteText(currentPosition - 1, 1);
                }

                // Remove bold from previous mentions
                const mentions = document.querySelectorAll('.mention');
                mentions.forEach(mention => {
                    mention.style.fontWeight = 'normal';
                    console.log(mention)
                });

                // Insert the new mention
                insertItem(item, false, { spaceAfterInsert: false });

                currentMention.value = item;
                console.log('onSelect', item);


                // Add bold to the new mention
                setTimeout(() => {
                    const newMention = document.querySelector('.mention:last-child');
                    if (newMention) {
                        newMention.style.fontWeight = 'bold';
                    }
                }, 0);
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

                        // Clear the editor
                        quill.setText('');

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
    <div style="margin-top: 200px;"><QuillyEditor ref="editor" :options="options" /></div>
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