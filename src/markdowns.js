/* eslint-disable */
export const math_md =`Lift( $L$ ) can be determined by Lift Coefficient ( $C_L$ ) like the following
equation.

katex: $c = \\pm\\sqrt{a^2 + b^2}$

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`;

export const mermaid_md =  `
# Mermaid Diagram

\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
`;

export const gfm_md = `
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done`;



export const full_md = `
# heading+

This is the first paragraph.

This is the second paragraph.

This is the third paragraph.

## Heading level 2

This is an [anchor](https://github.com).

### Heading level 3

This is **bold** and _italics_.

#### Heading level 4

This is \`inline\` code.

This is a code block:

\`\`\`tsx
const Message = () => {
  return <div>hi</div>;
};
\`\`\`

##### Heading level 5

This is an unordered list:

- One
- Two
- Three, and **bold**

This is an ordered list:

1. One
1. Two
1. Three

This is a complex list:

1. **Bold**: One
    - One
    - Two
    - Three
  
2. **Bold**: Three
    - One
    - Two
    - Three
  
3. **Bold**: Four
    - One
    - Two
    - Three

###### Heading level 6

> This is a blockquote.

This is a table:

| Vegetable   | Description | Nutritional Benefits | Common Uses | Texture | Taste |
|------------|-------------|----------------------|-------------|---------|-------|
| Carrot     | A crunchy, orange root vegetable that is rich in vitamins and minerals. | High in beta-carotene, fiber, and vitamin K. | Used in soups, salads, and as a snack. | Crunchy | Slightly sweet |
| Broccoli   | A green vegetable with tightly packed florets that is high in fiber, vitamins, and antioxidants. | Rich in vitamin C, K, and fiber. | Steamed, boiled, stir-fried, or roasted. | Firm yet tender | Mildly bitter |
| Spinach    | A leafy green vegetable that is dense in nutrients like iron, calcium, and vitamins. | High in iron, calcium, and antioxidants. | Eaten raw in salads or cooked in various dishes. | Soft when cooked, crisp when raw | Mild, slightly earthy |
| Bell Pepper | A colorful, sweet vegetable available in different colors such as red, yellow, and green. | High in vitamin C and antioxidants. | Used in stir-fries, salads, or stuffed recipes. | Crunchy | Sweet |
| Tomato     | A juicy fruit often used as a vegetable in culinary preparations. | Good source of vitamin C, potassium, and lycopene. | Used in salads, sauces, and sandwiches. | Juicy | Sweet and tangy |
| Cucumber   | A cool and refreshing vegetable with a high water content. | Hydrating, low in calories, and contains vitamin K. | Used in salads, sandwiches, or as a crunchy snack. | Crisp | Mild, refreshing |
| Zucchini   | A summer squash with a mild flavor and tender texture. | Low in calories, high in fiber and vitamin C. | Sautéed, grilled, roasted, or used in baking. | Soft yet firm | Mild, slightly sweet |
| Cauliflower | A versatile vegetable that can be roasted, steamed, mashed, or used to make gluten-free alternatives. | Rich in fiber, vitamin C, and antioxidants. | Used for cauliflower rice, pizza crust, and more. | Firm but tender when cooked | Mild, slightly nutty |
| Green Beans | Long, slender pods that are low in calories and rich in vitamins. | Good source of fiber, vitamin C, and folate. | Steamed, stir-fried, or used in casseroles and salads. | Crisp when raw, tender when cooked | Mild, slightly grassy |
| Potato     | A starchy vegetable available in various varieties. | High in potassium, fiber, and vitamin C. | Boiled, baked, mashed, or used in soups and fries. | Soft when cooked | Mild, slightly earthy |

This is a mermaid diagram:

\`\`\`mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
\`\`\`

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$

Lift( $L$ ) can be determined by Lift Coefficient ( $C_L$ ) like the following
equation.




# Markdown syntax guide

---

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](https://t3.ftcdn.net/jpg/02/47/02/84/360_F_247028431_yPo8nwG9HuQN6oHyix8YnhYBeOXtF0c4.jpg)

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`javascript
let message = 'Hello world';
alert(message);
\`\`\`

## Inline code

This web site is using \`markedjs/marked\`.

## Math Enhanced:
Chu vi hình tròn \\( C = 2\\pi r \\).

\\[
\\Delta t' = \\frac{\\Delta t}{\\sqrt{1 - \\frac{v^2}{c^2}}}
\\]



## Video
[Watch Video on YouTube](https://www.youtube.com/watch?v=2AOxQYyapDo)

## Iframe
### YouTube
<iframe width="560" height="315" src="https://www.youtube.com/embed/FdfyPVRrTfo?si=Cte0Ox_gkl_ZlmTa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Facebook
<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FSPX.DanCongSo%2Fvideos%2F578837441825938%2F&show_text=false&width=476&t=0" width="476" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>

### Dailymotion
<iframe src="https://geo.dailymotion.com/player.html?video=x9g0mxo" allowfullscreen title="Dailymotion Video Player" width="476" height="476" allow="web-share" style="border:none;overflow:hidden"></iframe>

### Vimeo
<div style="padding:56.25% 0 0 0;position:relative; width: 512px"><iframe src="https://player.vimeo.com/video/1063281516?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Familiar"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

## Audio
 <audio src="https://python-apihub.s3.amazonaws.com/text2speech_2025-03-02/tmplwok_trl.wav" controls></audio>

## Video
<video preload="auto" loop="" style="width: 281.863px;" controls><source src="https://img-9gag-fun.9cache.com/photo/aMVmDXW_460sv.mp4" type="video/mp4"></video>
 `;



