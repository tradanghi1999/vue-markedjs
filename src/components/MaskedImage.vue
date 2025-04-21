<template>
    <div>
        <v-stage :config="{ width: stageWidth, height: stageHeight }" @mousedown="handleMouseDown"
            @mousemove="handleMouseMove" @mouseup="handleMouseUp">
            <!-- Layer chứa hình nền -->
            <v-layer>
                <v-image :config="{ image: imageObj, x: 0, y: 0 }" />
            </v-layer>
            <!-- Layer chứa các bounding box -->
            <v-layer>
                <!-- Các box đã vẽ -->
                <v-rect v-for="(rect, index) in rectangles" :key="index" :config="rect" />
                <!-- Box đang được vẽ -->
                <v-rect v-if="isDrawing" :config="currentRect" />
            </v-layer>
        </v-stage>
        <button @click="exportLabelData">Export Label Data</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useImage } from 'vue-konva'
//import photoSrc from 'https://localhost:8080/photo.png'

// Kích thước của stage. Điều chỉnh theo kích thước ảnh của bạn.
const stageWidth = 800
const stageHeight = 600

// Sử dụng useImage để load ảnh từ thư mục assets
const { image: imageObj } = useImage('https://konvajs.org/assets/yoda.jpg')

// Mảng lưu các bounding box đã vẽ
const rectangles = ref([])

// Cờ để theo dõi quá trình vẽ hộp
const isDrawing = ref(false)

// Lưu vị trí bắt đầu khi ấn chuột (mousedown)
const startPos = ref({ x: 0, y: 0 })

// Object chứa thông tin của box đang được tạo
const currentRect = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    stroke: 'red',
    strokeWidth: 2,
    dash: [4, 4], // hiển thị đường nét gạch khi đang vẽ
})

/* --- Xử lý sự kiện chuột --- */
// Khi người dùng nhấn chuột xuống, bắt đầu tạo box
const handleMouseDown = (e) => {
    // Lấy vị trí chuột trên stage
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()
    if (pos) {
        isDrawing.value = true
        startPos.value = { ...pos }
        // Khởi tạo currentRect từ vị trí bắt đầu
        currentRect.value = {
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            stroke: 'red',
            strokeWidth: 2,
            dash: [4, 4],
        }
    }
}

// Khi chuột di chuyển, cập nhật kích thước của box đang vẽ
const handleMouseMove = (e) => {
    if (!isDrawing.value) return
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()
    if (!pos) return
    // Tính toán width và height dựa trên vị trí hiện tại so với vị trí ban đầu
    const newWidth = pos.x - startPos.value.x
    const newHeight = pos.y - startPos.value.y

    // Cập nhật currentRect
    currentRect.value.width = newWidth
    currentRect.value.height = newHeight
}

// Khi người dùng nhả chuột, hoàn thành quá trình vẽ
const handleMouseUp = (e) => {
    console.log('Mouse Up', e)
    if (!isDrawing.value) return
    // Lưu lại box vào mảng rectangles (clone currentRect)
    rectangles.value.push({ ...currentRect.value })
    isDrawing.value = false
}

// Xuất dữ liệu label (các box vẽ được)
const exportLabelData = () => {
    // Hiện dữ liệu trên console; có thể chuyển đổi thành JSON, gửi về API, hoặc download file JSON
    console.log('Label Data: ', rectangles.value)
    const dataStr = JSON.stringify(rectangles.value, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'labels.json'
    link.click()
}
</script>
