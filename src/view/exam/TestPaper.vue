<template>
  <div>
    <div id="mask" class="mask" :class="{ hidden: maskHidenFlag }"></div>
    <div class="myexam">
      <ConfigMap v-if="showFlag" :configinfo="configInfo" @createtestpaper="handleMessage"></ConfigMap>
      <div v-else>
        <A4Paper :items="questions" :renderWrapper="QuestionItem" @backtoconfig="handleMessage('back')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, provide } from 'vue';
import ConfigMap from '@/components/exam/ConfigMap.vue';
import A4Paper from '@/components/exam/A4Paper.vue';
import QuestionItem from '@/components/exam/QuestionItem.vue';
const showMask = (flag) => (maskHidenFlag.value = !flag);
provide('showMask', showMask);
const configInfo = ref({
  level: '',
  classes: ['', '', '', ''],
});
const showFlag = ref(true);
const maskHidenFlag = ref(true);
const questions = ref([]);

/*
title: '1. 下面哪个是原型链？',//题目，字符串形式
classes: '选择题',//题型：题目分类标记，强制分页标记，选择题，编码题，场景题，行为题
area:'',//技术领域，仅为选择题，编码题，场景题，行为题时必选
options: ['A. Object', 'B. Array', 'C. prototype', 'D. __proto__'],仅为选择题时必选
answer: '',//参考答案,字符串形式，可以带html格式化
*/
/*
questions.value=[...[
 {
    title: '一、选择题',//题目
    classes: '题目分类标记',//题型：题目分类标记，选择题，编码题，场景题，行为题
},
{
    title: '1. 下面哪个是原型链？',//题目
    classes: '选择题',//题型：题目分类标记，选择题，编码题，场景题，行为题
    area:'',//技术领域
    options: ['A. Object', 'B. Array', 'C. prototype', 'D. __proto__'],
    answer: '',//参考答案
},
{
    title: '2. HTTP 和 HTTPS 的主要区别是？',
    options: ['A. 安全性', 'B. 速度', 'C. 端口', 'D. 语言'],
    classes: '选择题',//题型：题目分类标记，选择题，编码题，场景题，行为题
    area:'',//技术领域
    answer: '',//参考答案
}, 
{
    title: '二、编码题',//题目
    classes: '题目分类标记',//题型：题目分类标记，选择题，编码题，场景题，行为题
},{
    title: '3. HTTP 和 HTTPS 的主要区别是？',
    classes: '编码题',//题型：题目分类标记，选择题，编码题，场景题，行为题
    area:'',//技术领域
    answer: '',//参考答案
},
 {
    classes: '强制分页标记',//题型：题目分类标记，强制分页标记，选择题，编码题，场景题，行为题
},
{
    title: '三、场景题',//题目
    classes: '题目分类标记',//题型：题目分类标记，选择题，编码题，场景题，行为题
},
{
     title: '4. HTTP 和 HTTPS 的主要区别是？',
    classes: '场景题',//题型：题目分类标记，选择题，编码题，场景题，行为题
    area:'',//技术领域
    answer: '',//参考答案
},
{
    title: '四、行为题',//题目
    classes: '题目分类标记',//题型：题目分类标记，选择题，编码题，场景题，行为题
}, {
     title: '5. HTTP 和 HTTPS 的主要区别是？',
    classes: '行为题',//题型：题目分类标记，选择题，编码题，场景题，行为题
    area:'',//技术领域
    answer: '',//参考答案
}
// ...几十道题
]]
*/
const getBalancedRandomQuestions = (banks, count) => {
  const perBank = Math.floor(count / banks.length);
  const remaining = count % banks.length;

  let selected = [];

  // 从每个题库抽取基础数量
  banks.forEach((bank) => {
    const shuffled = [...bank].sort(() => 0.5 - Math.random());
    selected.push(...shuffled.slice(0, perBank));
  });

  // 补充剩余题目
  if (remaining > 0) {
    const allRemaining = banks
      .map((bank) => bank.slice(perBank)) // 取出未选部分
      .flat();
    const shuffledRemaining = [...allRemaining].sort(() => 0.5 - Math.random());
    selected.push(...shuffledRemaining.slice(0, remaining));
  }

  // 最终打乱顺序
  const tmp = selected.sort(() => 0.5 - Math.random());
  const retList = [];
  tmp.forEach((item, index) => {
    let item1 = JSON.parse(JSON.stringify(item));
    item1['title'] = 1 + index + '. ' + item1['title'];
    if (item1['classes'] == '选择题') {
      item1['options'] = item1['options']
        .split(/\n/)
        .filter((line) => line.trim() !== '');
    }
    retList.push(item1);
  });
  return retList;
};

const no_list = ['一', '二', '三', '四', '五', '六', '七', '八'];
const handleMessage = (msg) => {
  let icount = 0;
  if (msg == 'back') {
    showFlag.value = true;
    questions.value = [];
  } else {
    showMask?.(true);
    //生成题目
    const level_data = window.myexamdata[msg.info.level.value];
    if (msg.info.option1.checked && level_data['选择题']) {
      questions.value.push({
        title: no_list[icount] + '、选择题', //题目
        classes: '题目分类标记',
      });
      const questionBanks = [];
      msg.info.selectedLanguages.forEach((item) => {
        if (
          level_data['选择题'][item] &&
          level_data['选择题'][item].length > 0
        ) {
          questionBanks.push(level_data['选择题'][item]);
        }
      });
      const selectedQuestions = getBalancedRandomQuestions(
        questionBanks,
        msg.info.option1.count
      );
      questions.value.push(...selectedQuestions);
      icount++;
    }
    if (msg.info.option2.checked && level_data['编码题']) {
      questions.value.push({
        title: no_list[icount] + '、编码题', //题目
        classes: '题目分类标记',
      });
      const questionBanks = [];
      msg.info.selectedLanguages.forEach((item) => {
        if (
          level_data['编码题'][item] &&
          level_data['编码题'][item].length > 0
        ) {
          questionBanks.push(level_data['编码题'][item]);
        }
      });
      const selectedQuestions = getBalancedRandomQuestions(
        questionBanks,
        msg.info.option2.count
      );
      questions.value.push(...selectedQuestions);
      icount++;
    }
    if (msg.info.option3.checked && level_data['场景题'] || (window.myexamdata["通用"] && window.myexamdata["通用"]["场景题"])) {
      questions.value.push({
        title: no_list[icount] + '、场景题', //题目
        classes: '题目分类标记',
      });
      const questionBanks = [];
      msg.info.selectedLanguages.forEach((item) => {
        const t1 = []
        if (level_data['场景题'] &&
          level_data['场景题'][item] &&
          level_data['场景题'][item].length > 0
        ) {
          t1.push(...level_data['场景题'][item]);
        }
        if (window.myexamdata["通用"] && window.myexamdata["通用"]["场景题"] && window.myexamdata["通用"]["场景题"][item] && window.myexamdata["通用"]["场景题"][item].length > 0) {
          t1.push(...window.myexamdata["通用"]["场景题"][item])
        }
        questionBanks.push(t1);
      });
      if (window.myexamdata["通用"] && window.myexamdata["通用"]["场景题"] && window.myexamdata["通用"]["场景题"]["通用"] && window.myexamdata["通用"]["场景题"]["通用"].length > 0) {
        questionBanks.push(window.myexamdata["通用"]["场景题"]["通用"])
      }

      const selectedQuestions = getBalancedRandomQuestions(
        questionBanks,
        msg.info.option3.count
      );
      questions.value.push(...selectedQuestions);
      icount++;
    }
    if (msg.info.option4.checked && window.myexamdata["通用"] && window.myexamdata["通用"]['行为题']) {
      questions.value.push({
        title: no_list[icount] + '、行为题', //题目
        classes: '题目分类标记',
      });
      const questionBanks = [];
      questionBanks.push(window.myexamdata["通用"]['行为题']["通用"]);
      const selectedQuestions = getBalancedRandomQuestions(
        questionBanks,
        msg.info.option4.count
      );
      questions.value.push(...selectedQuestions);
      icount++;
    }
    showFlag.value = false;
    showMask?.(false);
  }
};
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明黑色 */
  z-index: 9999;
  /* 遮盖所有内容 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.mask.hidden {
  display: none;
}
</style>
