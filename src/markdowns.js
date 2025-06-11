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
# TeamPal Math error

Để tính tổng hóa đơn điện, nước và phí dịch vụ sau VAT, chúng ta sẽ thực hiện các bước sau:

### 1. Tính tiền điện

Sử dụng biểu giá bậc thang điện:

- **0–50 kWh: 1.678 ₫/kWh**: 
  - Số tiền cho 50 kWh đầu tiên: 
    \\[
    50 \\, \\text{kWh} \\times 1.678 \\, \\text{₫/kWh} = 83.900 \\, \\text{₫}
    \\]

- **51–100 kWh: 1.734 ₫/kWh**: 
  - Số tiền cho 50 kWh tiếp theo (từ 51 đến 100 kWh):
    \\[
    50 \\, \\text{kWh} \\times 1.734 \\, \\text{₫/kWh} = 86.700 \\, \\text{₫}
    \\]

- **101–180 kWh: 2.014 ₫/kWh**: 
  - Số tiền cho 80 kWh tiếp theo (từ 101 đến 180 kWh):
    \\[
    80 \\, \\text{kWh} \\times 2.014 \\, \\text{₫/kWh} = 161.120 \\, \\text{₫}
    \\]

- **Tổng tiền điện**:
\\[
\\text{Tổng tiền điện} = 83.900 \\, \\text{₫} + 86.700 \\, \\text{₫} + 161.120 \\, \\text{₫} = 331.720 \\, \\text{₫}
\\]

### 2. Tính tiền nước

Sử dụng biểu giá bậc thang nước:

- **0–10 m³: 4.000 ₫/m³**: 
  - Số tiền cho 10 m³ đầu tiên:
    \\[
    10 \\, \\text{m³} \\times 4.000 \\, \\text{₫/m³} = 40.000 \\, \\text{₫}
    \\]

- **11–18 m³: 4.500 ₫/m³**: 
  - Số tiền cho 8 m³ tiếp theo (từ 11 đến 18 m³):
    \\[
    8 \\, \\text{m³} \\times 4.500 \\, \\text{₫/m³} = 36.000 \\, \\text{₫}
    \\]

- **Tổng tiền nước**:
\\[
\\text{Tổng tiền nước} = 40.000 \\, \\text{₫} + 36.000 \\, \\text{₫} = 76.000 \\, \\text{₫}
\\]

### 3. Tính tổng tiền dịch vụ

- **Phí dịch vụ cố định**: 20.000 ₫

### 4. Tính tổng tiền trước VAT

- **Tổng tiền trước VAT**:
\\[
\\text{Tổng tiền trước VAT} = \\text{Tổng tiền điện} + \\text{Tổng tiền nước} + \\text{Phí dịch vụ}
\\]
\\[
= 331.720 \\, \\text{₫} + 76.000 \\, \\text{₫} + 20.000 \\, \\text{₫} = 427.720 \\, \\text{₫}
\\]

### 5. Tính VAT

- **VAT 10%**:
\\[
\\text{VAT} = 427.720 \\, \\text{₫} \\times 10\% = 42.772 \\, \\text{₫}
\\]

### 6. Tính tổng tiền phải trả sau VAT

- **Tổng tiền phải trả**:
\\[
\\text{Tổng tiền phải trả} = \\text{Tổng tiền trước VAT} + \\text{VAT}
\\]
\\[
= 427.720 \\, \\text{₫} + 42.772 \\, \\text{₫} = 470.492 \\, \\text{₫}
\\]

### Kết luận

Tổng tiền phải trả sau VAT là **470.492 ₫**.


Công thức Fubini là một định lý quan trọng trong giải tích, cho phép chúng ta tính tích phân kép của một hàm bằng cách chuyển đổi thứ tự lấy tích phân. Công thức này được viết như sau:

$$
\\int_a^b \\int_c^d f(x, y) \, dy \, dx = \\int_c^d \\int_a^b f(x, y) \, dx \, dy.
$$

**Chứng minh công thức Fubini:**

### Điều kiện áp dụng:
Công thức Fubini áp dụng khi hàm \( f(x, y) \) liên tục trên hình chữ nhật \( R = [a, b] \times [c, d] \) trong mặt phẳng tọa độ. Nếu hàm không liên tục, ta cần kiểm tra thêm điều kiện hội tụ tuyệt đối.

### Ý tưởng chứng minh:
Ý tưởng cơ bản của công thức Fubini là chia miền tích phân \( R \) thành các hình chữ nhật nhỏ, sau đó tính tổng các giá trị của hàm \( f(x, y) \) trên từng hình chữ nhật nhỏ và lấy giới hạn khi kích thước hình chữ nhật nhỏ tiến về 0.

### Các bước chứng minh:
1. **Chia miền tích phân thành các hình chữ nhật nhỏ:**
 - Xét hình chữ nhật \( R = [a, b] \times [c, d] \).
 - Chia miền \( [a, b] \) thành \( n \) đoạn nhỏ bằng nhau với độ dài \( \Delta x_i = \frac{b - a}{n} \).
 - Chia miền \( [c, d] \) thành \( m \) đoạn nhỏ bằng nhau với độ dài \( \Delta y_j = \frac{d - c}{m} \).

2. **Tổng giá trị của hàm trên mỗi hình chữ nhật:**
 - Mỗi hình chữ nhật nhỏ có tọa độ \( [x_i, x_{i+1}] \times [y_j, y_{j+1}] \), với \( x_i = a + i\Delta x \) và \( y_j = c + j\Delta y \).
 - Giá trị của hàm \( f(x, y) \) tại một điểm trong hình chữ nhật được lấy xấp xỉ bởi \( f(x_i, y_j) \).
 - Tích phân kép trên \( R \) được xấp xỉ bởi tổng:
 \[
 \sum_{i=1}^n \sum_{j=1}^m f(x_i, y_j) \Delta x \Delta y.
 \]

3. **Chuyển đổi thứ tự lấy tổng:**
 - Do tính chất giao hoán của phép cộng, ta có thể đổi thứ tự lấy tổng:
 $$
 \sum_{i=1}^n \sum_{j=1}^m f(x_i, y_j) \Delta x \Delta y = \sum_{j=1}^m \sum_{i=1}^n f(x_i, y_j) \Delta x \Delta y.
 $$

4. **Lấy giới hạn khi \( n, m \to \infty \):**
 - Khi kích thước hình chữ nhật nhỏ tiến về 0 (tức \( n, m \to \infty \)), tổng Riemann tiến về tích phân kép:
 \[
 \int_a^b \int_c^d f(x, y) \, dy \, dx = \int_c^d \int_a^b f(x, y) \, dx \, dy.
 \]

### Ý nghĩa hình học:
Công thức Fubini cho phép chúng ta xem xét tích phân kép như việc tính tổng theo từng biến, lần lượt. Nó có thể được sử dụng để đơn giản hóa việc tính tích phân khi một thứ tự tích phân cụ thể dễ dàng hơn để xử lý.

Nếu bạn muốn hiểu thêm qua ví dụ cụ thể hoặc hình ảnh minh họa, hãy cho tôi biết!

# Non standard Markdown

## Claude

1. Vai trò cốt lõi
    1.1. Giảng dạy tiếng Anh chuyên nghiệp
    1.2. Phát triển kỹ năng ngôn ngữ toàn diện
    1.3. Đánh giá và điều chỉnh phương pháp giảng dạy

2. Mục tiêu và Mục đích
   2.1. Kiến thức ngữ pháp
       2.1.1. Cơ bản
       2.1.2. Nâng cao
   2.2. Kỹ năng giao tiếp
       2.2.1. Tự nhiên
       2.2.2. Hiệu quả
   2.3. Môi trường học tập
       2.3.1. Tích cực
       2.3.2. Thực tiễn

3. Nhiệm vụ và Trách nhiệm
   3.1. Thiết kế bài giảng
       3.1.1. Phù hợp trình độ
       3.1.2. Đáp ứng nhu cầu
   3.2. Đánh giá học tập
       3.2.1. Theo dõi tiến độ
       3.2.2. Phản hồi chi tiết
   3.3. Phương pháp giảng dạy
       3.3.1. Sáng tạo
       3.3.2. Tương tác

4. Kiến thức Chuyên môn
   4.1. Ngôn ngữ học
       4.1.1. Ngữ pháp
       4.1.2. Từ vựng
       4.1.3. Phát âm
   4.2. Công nghệ giảng dạy
       4.2.1. Trực tuyến
       4.2.2. Trực tiếp
   4.3. Phương pháp sư phạm
       4.3.1. Hiện đại
       4.3.2. Ứng dụng thực tế

5. Đối tượng Học viên
   5.1. Học sinh/Sinh viên
   5.2. Nhân viên FMCG
   5.3. Người học tiếng Anh giao tiếp

6. Kênh Giao tiếp
   6.1. Trực tiếp
       6.1.1. Văn phòng
       6.1.2. Trung tâm đào tạo
   6.2. Trực tuyến
       6.2.1. Zoom
       6.2.2. Microsoft Teams
       6.2.3. Google Meet
   6.3. Hỗ trợ ngoài giờ
       6.3.1. Email
       6.3.2. Zalo
       6.3.3. Viber

7. Bản địa hóa và Văn hóa
   7.1. Nội dung học tập
       7.1.1. Ví dụ địa phương
       7.1.2. Ngữ cảnh Việt Nam
   7.2. Phương pháp tiếp cận
       7.2.1. Tôn trọng văn hóa
       7.2.2. Khuyến khích tham gia
   7.3. Tích hợp chuyên ngành
        7.3.1. Chủ đề FMCG
        7.3.2. Tình huống thực tế

## Other
1. item 1
2. item 2
    a. item 2a
	    I.  sub item I
	    II. sub item II
    e. item 2e
7. item 7

Tốt, tôi sẽ viết mô tả công việc cho vị trí Nhân Viên Tiếp Thị Kỹ Thuật Số (Digital Marketing Specialist):

1. Mục Tiêu Công Việc
• Phát triển và triển khai các chiến dịch tiếp thị kỹ thuật số toàn diện
• Tăng cường nhận thức thương hiệu và tỷ lệ chuyển đổi

2. Trách Nhiệm Chính
• Quản lý các nền tảng mạng xã hội 
• Xây dựng nội dung tiếp thị hấp dẫn
• Phân tích hiệu quả chiến dịch qua các chỉ số metrics
• Nghiên cứu xu hướng thị trường mới

3. Yêu Cầu Kỹ Năng
• Thành thạo Google Analytics, SEO
• Kỹ năng viết sáng tạo
• Hiểu biết sâu về các nền tảng số
• Tiếng Anh giao tiếp tốt

4. Quyền Lợi
• Mức lương: Thỏa thuận
• Môi trường làm việc năng động
• Cơ hội phát triển nghề nghiệp

Bạn thấy thế nào?


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



