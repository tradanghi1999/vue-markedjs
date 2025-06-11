<template>
    <div>
      <div
        ref="containerRef"
        class="relative drawing-container"
        :style="{
          width: canvasDimensions.width > 0 ? `${canvasDimensions.width}px` : 'auto',
          height: canvasDimensions.height > 0 ? `${canvasDimensions.height}px` : 'auto',
          maxWidth: '100%',
          margin: '20px auto',
          border: '1px solid #555',
          overflow: 'hidden',
          position: 'relative'
        }"
      >
        <!-- Reference Image Layer -->
        <img
          v-if="imageSrc"
          ref="imageRef"
          :src="imageSrc"
          alt="Reference Image"
          @load="handleImageLoad"
          :style="{
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 1,
            width: '100%',
            height: '100%',
            userSelect: 'none',
            pointerEvents: 'none',
            objectFit: 'contain'
          }"
          draggable="false"
        />
  
        <!-- Canvas Layer (Visible Overlay) -->
        <canvas
          ref="canvasRef"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
          :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            cursor: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            display: canvasDimensions.width > 0 ? 'block' : 'none'
          }"
        ></canvas>
  
        <div ref="cursorRef" class="custom-cursor"></div>
      </div>
  
      <div class="mt-4 mb-4">
        <label class="cursor-pointer">
          <span class="mr-2">Choose Image</span>
          <input
            type="file"
            accept="image/*"
            aria-label="Choose image to inpaint"
            title="Choose image to inpaint"
            @change="onFileChange"
          />
        </label>
      </div>
  
      <div v-if="imageSrc" style="margin-top: 10px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <button @click="setToDraw" :style="{ backgroundColor: !isErasing.value ? 'lightblue' : 'lightgray' }">Draw</button>
        <button @click="setToErase" :style="{ backgroundColor: isErasing.value ? 'lightblue' : 'lightgray' }">Erase</button>
        <button @click="clearMask">Clear Mask</button>
        <!-- The original code had 'Download Image' for the mask download, which is confusing. I've changed it to 'Download Mask' -->
        <a id="download_mask_link" href="#" @click="downloadMask">
          Download Mask
        </a>
        <a id="download_inpainted_image_link" href="#" @click="saveImageToLocal">
          Download Inpainted Image (Overlay)
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  
  const OVERLAY_COLOR = 'rgba(128, 0, 128, 0.4)';
  const BRUSH_RADIUS = 20;
  
  // Refs for DOM elements
  const canvasRef = ref(null);
  const cursorRef = ref(null);
  const imageRef = ref(null);
  const containerRef = ref(null);
  
  // Reactive state
  const isDrawing = ref(false);
  const isErasing = ref(false);
  const imageSrc = ref(null);
  const canvasDimensions = ref({ width: 0, height: 0 });
  
  // For contexts and offscreen mask canvas (not Vue refs, just regular variables)
  let mainCanvasCtx = null;
  let maskCanvasElement = null;
  let maskCtx = null;
  
  
  // --- Render Overlay ---
  const renderOverlay = () => {
    if (!mainCanvasCtx || !maskCanvasElement || maskCanvasElement.width === 0 || maskCanvasElement.height === 0) {
      return;
    }
    mainCanvasCtx.save();
    mainCanvasCtx.clearRect(0, 0, mainCanvasCtx.canvas.width, mainCanvasCtx.canvas.height);
    mainCanvasCtx.fillStyle = OVERLAY_COLOR;
    mainCanvasCtx.fillRect(0, 0, mainCanvasCtx.canvas.width, mainCanvasCtx.canvas.height);
    mainCanvasCtx.globalCompositeOperation = 'destination-in';
    try {
      if (maskCanvasElement.width > 0 && maskCanvasElement.height > 0) {
        mainCanvasCtx.drawImage(maskCanvasElement, 0, 0);
      }
    } catch (e) {
      console.error("Error drawing mask image onto canvas:", e);
    }
    mainCanvasCtx.globalCompositeOperation = 'source-over';
    mainCanvasCtx.restore();
  };
  
  // --- Mouse move for custom cursor ---
  const handleMouseMoveGlobal = (e) => {
    if (cursorRef.value && canvasRef.value && containerRef.value) {
      const containerRect = containerRef.value.getBoundingClientRect();
      if(containerRect)
        console.log("Container rect:", containerRect);
      const canvasRect = canvasRef.value.getBoundingClientRect();
  
      const clientX = e.clientX;
      const clientY = e.clientY;
  
      const isInsideCanvas = clientX >= canvasRect.left &&
        clientX <= canvasRect.right &&
        clientY >= canvasRect.top &&
        clientY <= canvasRect.bottom;
  
      if (isInsideCanvas && canvasDimensions.value.width > 0) {
        cursorRef.value.style.display = 'block';
        cursorRef.value.style.left = `${clientX}px`;
        cursorRef.value.style.top = `${clientY}px`;
        cursorRef.value.style.transform = `translate(-${BRUSH_RADIUS}px, -${BRUSH_RADIUS}px)`;
        cursorRef.value.style.width = `${BRUSH_RADIUS * 2}px`;
        cursorRef.value.style.height = `${BRUSH_RADIUS * 2}px`;
      } else {
        cursorRef.value.style.display = 'none';
      }
    }
  };
  
  const handleMouseLeaveContainer = () => {
    if (cursorRef.value) {
      cursorRef.value.style.display = 'none';
    }
    if (isDrawing.value) { // Also stop drawing if mouse leaves container while drawing
        stopDrawing();
    }
  };
  
  
  onMounted(() => {
    // Create mask canvas
    maskCanvasElement = document.createElement('canvas');
    console.log("Mask canvas created");
  
    // Setup Cursor Handling
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    if (containerRef.value) {
      containerRef.value.addEventListener('mouseleave', handleMouseLeaveContainer);
    }
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMoveGlobal);
    if (containerRef.value) {
      containerRef.value.removeEventListener('mouseleave', handleMouseLeaveContainer);
    }
    console.log("Cleanup: Mouse listeners removed");
  });
  
  // --- Watch for Canvas Dimension Changes to Resize ---
  watch(canvasDimensions, (newDimensions) => {
    const canvas = canvasRef.value; // This is the visible canvas
  
    if (canvas && maskCanvasElement && newDimensions.width > 0 && newDimensions.height > 0) {
      console.log(`Resizing canvas to: ${newDimensions.width}x${newDimensions.height}`);
  
      canvas.width = newDimensions.width;
      canvas.height = newDimensions.height;
      maskCanvasElement.width = newDimensions.width;
      maskCanvasElement.height = newDimensions.height;
  
      mainCanvasCtx = canvas.getContext("2d");
  
      maskCtx = maskCanvasElement.getContext("2d", { willReadFrequently: true });
      if (maskCtx) {
        maskCtx.lineCap = "round";
        maskCtx.lineWidth = BRUSH_RADIUS * 2;
        maskCtx.fillStyle = "white"; // Drawn areas on mask are white
        maskCtx.strokeStyle = "white";
        console.log("Contexts re-initialized after resize");
      } else {
        console.error("Failed to get mask context after resize");
        maskCtx = null;
      }
      renderOverlay();
    } else {
      console.log("Skipping resize, invalid dimensions:", newDimensions);
    }
  }, { deep: true }); // deep true if canvasDimensions was a more complex object, simple {w,h} might not need it but good practice
  
  
  // --- Get Coords ---
  const getCoords = (nativeEvent) => {
    const canvas = canvasRef.value;
    if (!canvas) return null;
  
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = nativeEvent.clientX - rect.left;
    const canvasY = nativeEvent.clientY - rect.top;
    const x = canvasX * scaleX;
    const y = canvasY * scaleY;
    return { x, y };
  };
  
  // --- Drawing Functions ---
  const startDrawing = (event) => {
    const coords = getCoords(event);
    if (!maskCtx || !coords) return;
  
    const { x, y } = coords;
    isDrawing.value = true;
    event.preventDefault();
  
    maskCtx.globalCompositeOperation = isErasing.value ? 'destination-out' : 'source-over';
    maskCtx.beginPath();
    maskCtx.moveTo(x, y);
    maskCtx.lineTo(x,y); // For a single dot on click
    maskCtx.stroke();
    
    renderOverlay();
  
    if (cursorRef.value) {
      cursorRef.value.classList.add('active');
    }
  };
  
  const draw = (event) => {
    if (!isDrawing.value || !maskCtx) return;
    const coords = getCoords(event);
    if (!coords) return;
  
    const { x, y } = coords;
    maskCtx.lineTo(x, y);
    maskCtx.stroke();
    renderOverlay();
    event.preventDefault();
  };
  
  const stopDrawing = () => {
    if (!isDrawing.value) return;
    isDrawing.value = false;
    // renderOverlay(); // Optional: render one last time if not done in draw
    if (cursorRef.value) {
      cursorRef.value.classList.remove('active');
    }
  };
  
  // --- Tool Functions ---
  const setToDraw = () => isErasing.value = false;
  const setToErase = () => isErasing.value = true;
  
  const clearMask = () => {
    if (maskCtx && maskCanvasElement.width > 0 && maskCanvasElement.height > 0) {
      console.log("Clearing mask");
      maskCtx.clearRect(0, 0, maskCanvasElement.width, maskCanvasElement.height);
      renderOverlay();
    }
  };
  
  // --- Image Handling ---
  const handleImageLoad = (event) => {
    const img = event.currentTarget;
    const newWidth = img.naturalWidth;
    const newHeight = img.naturalHeight;
    console.log(`Image loaded: natural ${newWidth}x${newHeight}`);
    if (newWidth !== canvasDimensions.value.width || newHeight !== canvasDimensions.value.height) {
      canvasDimensions.value = { width: newWidth, height: newHeight };
    }
  };
  
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageSrc.value = event.target?.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  // --- Save Image (Overlay + Base Image) ---
  const saveImageToLocal = (event) => {
    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');
    const baseImage = imageRef.value; // Vue ref gives DOM element via .value
    const overlayCanvas = canvasRef.value; // Vue ref
  
    if (!finalCtx || !baseImage || !overlayCanvas || !baseImage.complete || baseImage.naturalWidth === 0) {
      console.error("Cannot save image: resources not ready or image not loaded.", {
          finalCtx: !!finalCtx,
          baseImage: !!baseImage,
          overlayCanvas: !!overlayCanvas,
          baseImageComplete: baseImage?.complete,
          baseImageNaturalWidth: baseImage?.naturalWidth
      });
      event.preventDefault();
      alert("Lỗi: Không thể lưu ảnh. Hình ảnh gốc hoặc lớp phủ chưa sẵn sàng.");
      return;
    }
  
    finalCanvas.width = baseImage.naturalWidth;
    finalCanvas.height = baseImage.naturalHeight;
    console.log(`Creating final image canvas: ${finalCanvas.width}x${finalCanvas.height}`);
  
    finalCtx.drawImage(baseImage, 0, 0, finalCanvas.width, finalCanvas.height);
  
    if (overlayCanvas.width === finalCanvas.width && overlayCanvas.height === finalCanvas.height) {
      finalCtx.drawImage(overlayCanvas, 0, 0);
    } else {
      console.warn("Overlay canvas size mismatch, attempting to scale draw.");
      finalCtx.drawImage(overlayCanvas, 0, 0, finalCanvas.width, finalCanvas.height);
    }
  
    let link = event.currentTarget;
    link.setAttribute('download', 'inpainted-image.png');
    try {
      let imageURL = finalCanvas.toDataURL('image/png');
      link.setAttribute('href', imageURL);
      console.log("Image ready for download.");
    } catch (e) {
      console.error("Error converting final canvas to data URL:", e);
      event.preventDefault();
      alert("Lỗi: Không thể tạo dữ liệu ảnh để tải về.");
    }
  };
  
  // --- Download Mask (API Compliant: Transparent = Edit Area) ---
  const downloadMask = (event) => {
      const maskCanvasSource = maskCanvasElement; // The offscreen canvas users draw on (White = Edit)
      const imageElement = imageRef.value;
  
      if (!maskCanvasSource || !imageElement || !imageElement.complete || imageElement.naturalWidth === 0) {
          console.error("Cannot download mask: Source mask canvas or reference image not ready.");
          event.preventDefault();
          alert("Lỗi: Không thể tạo mask. Canvas mask hoặc ảnh gốc chưa sẵn sàng.");
          return;
      }
  
      const targetWidth = imageElement.naturalWidth;
      const targetHeight = imageElement.naturalHeight;
      console.log(`Target mask dimensions from image: ${targetWidth}x${targetHeight}`);
  
      const sourceBufferWidth = maskCanvasSource.width;
      const sourceBufferHeight = maskCanvasSource.height;
      console.log(`Source mask buffer dimensions at download time: ${sourceBufferWidth}x${sourceBufferHeight}`);
  
      if (sourceBufferWidth !== targetWidth || sourceBufferHeight !== targetHeight) {
          console.error(`Source mask buffer size (${sourceBufferWidth}x${sourceBufferHeight}) differs from target image size (${targetWidth}x${targetHeight}). This indicates a timing issue or error in resizing. Cannot generate accurate mask.`);
          event.preventDefault();
          alert("Lỗi: Kích thước buffer mask không khớp ảnh gốc tại thời điểm tải. Không thể tạo mask chính xác. Vui lòng thử lại sau giây lát hoặc tải lại ảnh.");
          return;
      }
  
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = targetWidth;
      tempCanvas.height = targetHeight;
      const tempCtx = tempCanvas.getContext('2d');
  
      if (!tempCtx) {
           console.error("Failed to get context for temporary mask canvas.");
           event.preventDefault();
           alert("Lỗi: Không thể tạo context cho canvas mask tạm thời.");
           return;
      }
  
      try {
          // API EXPECTS: Transparent for Edit Area, Opaque for Keep Area.
          // Our maskCanvasSource: White (Opaque) for Edit Area, Transparent for Keep Area.
          // So we need to invert it.
  
          // 1. Fill tempCanvas with an opaque color (e.g., black). This means "keep everything".
          tempCtx.fillStyle = 'black'; // Or 'white', color doesn't matter, just alpha.
          tempCtx.fillRect(0, 0, targetWidth, targetHeight);
  
          // 2. Use 'destination-out'. Where maskCanvasSource is opaque (white, user-drawn edit area),
          // it will make tempCanvas transparent. Where maskCanvasSource is transparent (keep area),
          // it will leave tempCanvas opaque (black).
          tempCtx.globalCompositeOperation = 'destination-out';
          tempCtx.drawImage(maskCanvasSource, 0, 0); // Draw the user's mask (white on transparent)
  
          // 3. Reset composite operation
          tempCtx.globalCompositeOperation = 'source-over';
  
          console.log("Generated final inverted mask on temporary canvas.");
          // tempCanvas now has: Transparent where user drew, Opaque (black) where user didn't.
          // This is API compliant.
  
      } catch (e) {
           console.error("Error generating inverted mask:", e);
           event.preventDefault();
           alert("Lỗi: Không thể tạo mask đảo ngược.");
           return;
      }
  
      try {
          const maskDataURL = tempCanvas.toDataURL('image/png');
          
          const base64Length = maskDataURL.length - 'data:image/png;base64,'.length;
          const fileSizeInBytes = base64Length * (3 / 4);
          const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
          console.log(`Approximate final mask file size: ${fileSizeInMB.toFixed(3)} MB`);
  
          if (fileSizeInMB > 4) { // Example check for 4MB limit
              if (!confirm(`Cảnh báo: Kích thước file mask (${fileSizeInMB.toFixed(2)} MB) có thể vượt quá giới hạn 4MB của API. Bạn vẫn muốn tải xuống?`)) {
                  event.preventDefault();
                  return;
              }
          }
  
          const link = event.currentTarget;
          link.setAttribute('download', 'mask.png');
          link.setAttribute('href', maskDataURL);
          console.log("Final API-Compliant Mask PNG ready for download.");
  
      } catch (e) {
          console.error("Error converting final mask canvas to data URL:", e);
          event.preventDefault();
          alert("Lỗi: Không thể chuyển đổi canvas mask cuối cùng sang định dạng PNG.");
      }
  };
  
  </script>
  
  <style>
  /* Using the same global CSS from page.css for simplicity. For scoped styles, you'd use <style scoped> */
  .drawing-container {
    /* Styles from the inline style in React are now in <template> :style binding */
    /* Added touch-action: none; for better mobile/touch experience if drawing is too sensitive */
    touch-action: none;
  }
  
  .custom-cursor {
    position: fixed; /* Fixed position relative to viewport, JS will set left/top */
    width: 40px; /* Initial size, JS will update based on BRUSH_RADIUS */
    height: 40px;
    border: 1px solid white;
    border-radius: 50%;
    pointer-events: none; /* So it doesn't interfere with canvas mouse events */
    display: none; /* Initially hidden */
    z-index: 10000; /* Make sure it's on top */
    mix-blend-mode: difference; /* Makes cursor visible on various backgrounds */
  }
  
  .custom-cursor.active {
    border-color: lightgreen; /* Example: change color when drawing */
  }
  
  /* Basic button styling for demo */
  button, .cursor-pointer span, a[id^="download_"] {
    padding: 8px 15px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 4px;
    text-decoration: none;
    color: black;
    display: inline-block; /* For anchor tags to behave like buttons */
  }
  button:hover, .cursor-pointer span:hover, a[id^="download_"]:hover {
    background-color: #e0e0e0;
  }
  input[type="file"] {
    /* You might want to style the file input or use a common trick to hide it and style the label */
    /* For now, default browser styling */
    margin-left: 5px;
  }
  .mt-4 { margin-top: 1rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mr-2 { margin-right: 0.5rem; }
  
  /* If you have a main App.vue or similar where you define global dark theme styles: */
  /* body { background-color: #1a202c; color: white; } */
  /* .text-white { color: white; } */
  /* ... etc ... */
  </style>