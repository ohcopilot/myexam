<!-- QuestionItem.vue -->
<template>
  <div>
    <div v-if="item.classes == '题目分类标记'">
      <h2>{{ item.title }}</h2>
    </div>
    <div v-else-if="item.classes == '选择题'" class="question">
      <h3>{{ item.title }}</h3>
      <ul v-if="item.nowrap" style="white-space: nowrap">
        <li
          v-for="(opt, idx) in item.options"
          :key="idx"
          style="display: inline-block; margin-right: 20px"
        >
          {{ opt }}
        </li>
      </ul>
      <ul v-else>
        <li v-for="(opt, idx) in item.options" :key="idx">{{ opt }}</li>
      </ul>
      <p class="answer">参考答案：{{ item.answer }}</p>
    </div>
    <div v-else class="question">
      <h3>{{ item.title }}</h3>
      <div style="height: 360px" v-if="isPrint"></div>
      <div class="answer" v-html="'参考答案：' + item.answer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const isPrint = ref(false);
const props = defineProps({
  item: Object,
  eventKey: Boolean, //是否显示答案的事件
});
watch(
  () => props.eventKey,
  () => {
    //console.log('收到父组件广播，eventKey:', props.eventKey);
    isPrint.value = !props.eventKey;
    // 执行子组件的逻辑
  }
);
</script>

<style scoped>
.question {
  padding: 10px;
  /*border: 1px solid #ccc;*/
}
.answer {
  display: block;
}
/* 打印时隐藏参考答案 */
@media print {
  .answer {
    display: none;
  }
}
</style>
