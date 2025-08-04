<!-- QuestionItem.vue -->
<template>
  <div>
    <div v-if="item.classes == '题目分类标记'">
      <h2>{{ item.title }}</h2>
    </div>
    <div v-else-if="item.classes == '选择题'" class="question">
      <pre style="font-size: 1.17em; font-weight: bold; margin: 1em 0;">{{ qtitle }}</pre>
      <VCodeBlock :lang="selectedLanguage" v-if="hascode" :code="codeSnippet" theme="Solarizedlight" prismjs/>
     
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
      <pre class="answer">参考答案：{{ item.answer }}</pre>
    </div>
    <div v-else class="question">
      <pre style="font-size: 1.17em; font-weight: bold; margin: 1em 0;">{{ item.title }}</pre>
      <VCodeBlock :lang="selectedLanguage" v-if="hascode" :code="codeSnippet" prismjs/>
      <div style="height: 360px" v-if="isPrint"></div>
      <pre style="font-size: 1.17em; font-weight: bold; margin: 1em 0;" v-if="qtitle1">{{ qtitle1}}</pre>
      
      <pre v-if="item.classes == '编码题'" class="answer">  参考答案：{{ item.answer }}    </pre>
      <pre v-else-if="item.classes == '行为题'" class="answer">  参考答案：{{ item.remark }}    </pre>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import VCodeBlock from '@wdns/vue-code-block';
const isPrint = ref(false);
const props = defineProps({
  item: Object,
  eventKey: Boolean, //是否显示答案的事件
});
const selectedLanguage = ref("javascript")
const codeSnippet = ref("")
const hascode = ref(false)
const qtitle = ref(props.item.title)
const qtitle1 = ref('')
const regex1 = /^(.*?)\s*<MyCode\s+([a-zA-Z]+)\s*>([\s\S]*?)<\/MyCode>\s*(.*?)$/;
console.log(props.item.title)
const matches = props.item.title.match(regex1);
console.log(matches)
if (matches) {
  hascode.value=true
  qtitle.value = matches[1]; // "请问把大象装进冰箱可以分几步？"
 selectedLanguage.value = matches[2]; // "javascript"
  codeSnippet.value = matches[3];     // "const s=10"
  if(matches.lenght>4){
    qtitle1.value=matches[4];
  }
}
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
