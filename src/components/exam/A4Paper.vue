<template>
  <div class="print-container">
    <div class="print-controls" v-if="showButton">
      <button @click="doBack">返回</button>
      <button @click="doPrint">打印</button>
    </div>
    <div class="a4-page" v-for="(page, pageIndex) in paginatedItems" :key="pageIndex">
      <div class="page-body">
        <component :is="renderWrapper" v-for="(item, index) in page" :key="index" :item="item" :event-key="eventKey" />
      </div>
      <div class="page-footer">
        第 {{ pageIndex + 1 }} 页 / 共 {{ paginatedItems.length }} 页
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref, nextTick, onMounted, watch, createApp } from 'vue';
const emit = defineEmits(['backtoconfig']);

const props = defineProps({
  items: Array, // 所有题目数据
  renderWrapper: Object, // 外部传入的“题目组件”，必须接收 `item` prop
});
const eventKey = ref(true);
const showButton = ref(true);
const broadcast = (flag) => {
  eventKey.value = flag; // 修改 key 触发所有子组件更新
};
const doBack = () => {
  emit('backtoconfig', { text: '来自子组件的消息', time: new Date() });
  setTimeout(() => {
    buildPages()
  }, 1000);
};

const doPrint = () => {
  showButton.value = false;
  broadcast(false);
  setTimeout(() => {
    buildPages()
    setTimeout(() => {
      window.print();
      showButton.value = true;
    }, 1000);
  }, 1000);
};
const paginatedItems = ref([]);

const PAGE_HEIGHT = 1122 - 100; // A4 高度 px，减去 header/footer 等

const buildPages = async () => {
  const container = document.createElement('div');
  container.style.cssText = `
width: 794px;
position: absolute;
visibility: hidden;
top: 0;
left: 0;
z-index: -1;
background: white;
padding: 40px;
box-sizing: border-box;
`;
  document.body.appendChild(container);

  let pages = [];
  let currentPage = [];
  let currentHeight = 0;

  for (let item of props.items) {
    if (item.classes === '强制分页标记') {
      pages.push(currentPage);
      currentPage = [];
      currentHeight = 0;
      continue;
    }
    const wrapper = document.createElement('div');
    container.appendChild(wrapper);

    const vnode = h(props.renderWrapper, { item });
    const app = createApp({ render: () => vnode });
    app.mount(wrapper);

    await nextTick();
    const height = wrapper.offsetHeight;

    if (currentHeight + height <= PAGE_HEIGHT) {
      currentPage.push(item);
      currentHeight += height;
    } else {
      pages.push(currentPage);
      currentPage = [item];
      currentHeight = height;
    }

    app.unmount();
    container.removeChild(wrapper);
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  document.body.removeChild(container);
  paginatedItems.value = pages;
};

onMounted(buildPages);
watch(() => props.items, buildPages, { deep: true });
</script>

<style scoped>
.print-controls {
  position: fixed;
  top: 20px;
  left: 80%;
  transform: translateX(-50%);
  background: white;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.print-container {
  background: #f0f0f0;
}

.a4-page {
  position: relative;
  width: 794px;
  /* A4宽度 */
  height: 1122px;
  /* A4高度，72dpi = 1122px */
  margin: 0px auto 20px auto;
  padding: 40px;
  background: white;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
  page-break-after: always;
}

.page-content {
  padding: 40px;
  padding-bottom: 60px;
  /* 为页脚预留空间 */
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}

.page-header {
  font-weight: bold;
  margin-bottom: 20px;
}

.page-body {
  display: flex;
  flex-direction: column;
  /*gap: 20px;*/
}

.page-footer {
  position: absolute;
  bottom: 15px;
  margin-left: -40px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #888;
  pointer-events: none;
}

@media print {
  .a4-page {
    page-break-after: always;
    box-shadow: none !important;
    /* 去掉阴影 */
  }

  .print-controls {
    display: none !important;
  }
}
</style>
