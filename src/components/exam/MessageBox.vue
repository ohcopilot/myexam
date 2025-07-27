<template>
  <!-- 遮罩层 -->
  <div v-if="visible" class="message-box-mask" @click.self="handleClose">
    <!-- 弹窗主体 -->
    <div class="message-box" :class="{ 'fade-in': visible }">
      <!-- 标题 -->
      <div class="message-box-header">
        <span>{{ title }}</span>
        <span class="close-btn" @click="handleClose">×</span>
      </div>
      <!-- 内容 -->
      <div class="message-box-content">
        <slot>{{ content }}</slot>
      </div>
      <!-- 按钮组 -->
      <div class="message-box-footer">
        <button v-if="showCancel" @click="handleCancel">
          {{ cancelText }}
        </button>
        <button @click="handleConfirm" :class="{ primary: showCancel }">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps({
  title: { type: String, default: '提示' },
  content: { type: String, default: '' },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
  showCancel: { type: Boolean, default: true },
  closeOnClickMask: { type: Boolean, default: true },
});

const emit = defineEmits(['confirm', 'cancel', 'close']);

const visible = ref(false);

// 打开弹窗
const open = () => {
  visible.value = true;
  document.body.style.overflow = 'hidden'; // 禁止背景滚动
};

// 关闭弹窗
const close = () => {
  visible.value = false;
  document.body.style.overflow = '';
  emit('close');
};

const handleConfirm = () => {
  emit('confirm');
  close();
};

const handleCancel = () => {
  emit('cancel');
  close();
};

const handleClose = () => {
  if (props.closeOnClickMask) close();
};

// 组件卸载时恢复滚动
onUnmounted(() => {
  document.body.style.overflow = '';
});

// 暴露方法给父组件
defineExpose({ open, close });
</script>

<style scoped>
.message-box-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.message-box {
  width: 80%;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-box-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  font-size: 20px;
  cursor: pointer;
}

.message-box-content {
  padding: 20px;
  min-height: 60px;
}

.message-box-footer {
  padding: 10px;
  text-align: right;
  border-top: 1px solid #eee;
}

button {
  padding: 8px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.primary {
  background: #409eff;
  color: white;
}
</style>
