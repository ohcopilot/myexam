<template>
  <div class="login-container">
    <MyMessageBox
      ref="msgBox"
      title="操作确认"
      content="当前无可用数据，请先上传题库Excel文件"
    >
    </MyMessageBox>
    <div class="logo">
      <h1>合作公司人员测验题库</h1>
    </div>
    <form class="login-form">
      <div class="input-group" style="display: ruby-text">
        <input type="file" @change="handleFile" accept=".xlsx, .csv" />
      </div>
      <div class="input-group" style="display: inline-flex">
        <label>
          <h3>人员资质</h3>
        </label>
        <div class="radio-group">
          <div class="radio-option">
            <input
              type="radio"
              id="loginType1"
              name="loginType"
              v-model="formdata.level.value"
              value="初级"
            />
            <label for="loginType1">初级</label>

            <input
              type="radio"
              id="loginType2"
              name="loginType"
              v-model="formdata.level.value"
              value="中级"
            />
            <label for="loginType2">中级</label>

            <input
              type="radio"
              id="loginType3"
              name="loginType"
              v-model="formdata.level.value"
              value="高级"
            />
            <label for="loginType3">高级</label>
          </div>
        </div>
      </div>
      <div class="error-message" v-if="!formdata.level.value && showerror">
        {{ formdata.level.errorMsg }}
      </div>
      <div class="input-group">
        <label>
          <h3>技术领域</h3>
        </label>
        <div class="checkbox-group">
          <div class="checkbox-option" style="flex-wrap: wrap; height: 100%">
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA1"
                name="options"
                v-model="formdata.selectedLanguages"
                value="前端开发"
              />
              <label for="optionA1">前端开发</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA2"
                name="options"
                v-model="formdata.selectedLanguages"
                value="后端开发"
              />
              <label for="optionA2">后端开发</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA3"
                name="options"
                v-model="formdata.selectedLanguages"
                value="全栈开发"
              />
              <label for="optionA3">全栈开发</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA4"
                name="options"
                v-model="formdata.selectedLanguages"
                value="自助终端"
              />
              <label for="optionA4">自助终端</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA5"
                name="options"
                v-model="formdata.selectedLanguages"
                value="跨平台软件"
              />
              <label for="optionA5" class="shrink-label">跨平台软件</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA6"
                name="options"
                v-model="formdata.selectedLanguages"
                value="中间件"
              />
              <label for="optionA6">中间件</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA7"
                name="options"
                v-model="formdata.selectedLanguages"
                value="数据库"
              />
              <label for="optionA7">数据库</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA8"
                name="options"
                v-model="formdata.selectedLanguages"
                value="信创"
              />
              <label for="optionA8">信创</label>
            </div>
            <div class="input-item">
              <input
                type="checkbox"
                id="optionA9"
                name="options"
                v-model="formdata.selectedLanguages"
                value="云计算与Devops"
              />
              <label for="optionA9" class="shrink-label">云计算与Devops</label>
            </div>
          </div>
          <div
            class="error-message"
            v-if="formdata.selectedLanguages.length < 1 && showerror"
          >
            请选择技术领域后重试
          </div>
        </div>
      </div>

      <div class="input-group">
        <label>
          <h3>测验题型</h3>
        </label>
        <div class="checkbox-group">
          <div class="checkbox-option">
            <input
              type="checkbox"
              id="option1"
              name="options"
              v-model="formdata.option1.checked"
              value="选择题"
            />
            <label for="option1">选择题</label>
            <div class="conditional-input">
              <input
                type="number"
                min="0"
                max="20"
                step="1"
                v-model="formdata.option1.count"
                placeholder="请录入题目数量"
                class="checkbox-input"
              />
            </div>
          </div>
          <div
            class="error-message"
            v-if="
              formdata.option1.checked && !formdata.option1.count && showerror
            "
          >
            {{ formdata.option1.errorMsg }}
          </div>

          <div class="checkbox-option">
            <input
              type="checkbox"
              id="option2"
              name="options"
              v-model="formdata.option2.checked"
              value="编码题"
            />
            <label for="option2">编码题</label>
            <div class="conditional-input">
              <input
                type="number"
                min="0"
                max="20"
                step="1"
                v-model="formdata.option2.count"
                placeholder="请录入题目数量"
                class="checkbox-input"
              />
            </div>
          </div>
          <div
            class="error-message"
            v-if="
              formdata.option2.checked && !formdata.option2.count && showerror
            "
          >
            {{ formdata.option2.errorMsg }}
          </div>

          <div class="checkbox-option">
            <input
              type="checkbox"
              id="option3"
              name="options"
              v-model="formdata.option3.checked"
              value="场景题"
            />
            <label for="option3">场景题</label>
            <div class="conditional-input">
              <input
                type="number"
                min="0"
                max="20"
                step="1"
                v-model="formdata.option3.count"
                placeholder="请录入题目数量"
                class="checkbox-input"
              />
            </div>
          </div>
          <div
            class="error-message"
            v-if="
              formdata.option3.checked && !formdata.option3.count && showerror
            "
          >
            {{ formdata.option3.errorMsg }}
          </div>

          <div class="checkbox-option">
            <input
              type="checkbox"
              id="option4"
              name="options"
              v-model="formdata.option4.checked"
              value="行为题"
            />
            <label for="option4">行为题</label>
            <div class="conditional-input">
              <input
                type="number"
                min="0"
                max="20"
                step="1"
                v-model="formdata.option4.count"
                placeholder="请录入题目数量"
                class="checkbox-input"
              />
            </div>
          </div>
          <div
            class="error-message"
            v-if="
              formdata.option4.checked && !formdata.option4.count && showerror
            "
          >
            {{ formdata.option4.errorMsg }}
          </div>
        </div>
        <div
          class="error-message"
          v-if="
            !formdata.option1.checked &&
            !formdata.option2.checked &&
            !formdata.option3.checked &&
            !formdata.option4.checked &&
            showerror
          "
        >
          请选择测验题型
        </div>
      </div>
    </form>
    <button @click="createTestPaper" class="login-button" id="loginButton">
      生成题目
    </button>
    <div class="footer">
      <p>
        © 2025 智能自助渠道团队 | <a href="#">隐私政策</a> |
        <a href="#">帮助中心</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ConfigMap from '@/components/exam/ConfigMap.vue';
import MyMessageBox from '@/components/exam/MessageBox.vue';
import { inject } from 'vue';
import * as XLSX from 'xlsx';

const msgBox = ref();

const showDialog = () => {
  msgBox.value.open();
};

const handleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    console.log('读取文件中的Sheet名称为：合作公司面试题集，第一行为key');
    const jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets['合作公司面试题集']
    );
    //console.log(jsonData);
    // 三级分类：先按 level，再按 classes，最后按 area
    window.myexamdata = jsonData.reduce((acc, item) => {
      // 处理 level 分类
      if (!acc[item.level]) {
        acc[item.level] = {};
      }

      // 处理 classes 分类
      if (!acc[item.level][item.classes]) {
        acc[item.level][item.classes] = {};
      }

      // 处理 area 分类
      if (!acc[item.level][item.classes][item.area]) {
        acc[item.level][item.classes][item.area] = [];
      }

      // 添加当前项到对应的 area 分类中
      acc[item.level][item.classes][item.area].push(item);

      return acc;
    }, {});
  };
  reader.readAsArrayBuffer(file);
};

const showMask = inject('showMask');
const emit = defineEmits(['createtestpaper']);
const props = defineProps({
  configinfo: {
    type: Object,
    required: true,
  },
});
if (props.configinfo['classes'] && Array.isArray(props.configinfo['classes'])) {
  const iLength = props.configinfo['classes'].length;
  for (let i = 0; i < iLength; i++) {
    props.configinfo['classes'].push('');
  }
} else {
  props.configinfo['classes'] = ['', '', '', ''];
}
if (!props.configinfo['level']) {
  props.configinfo['level'] = '';
}
const showerror = ref(false);
const formdata = reactive({
  selectedLanguages: [],
  level: {
    value: props.configinfo['level'],
    errorMsg: '请选择测试人员级别',
  },
  option1: {
    checked: false,
    count: props.configinfo['classes'] ? props.configinfo['classes'][0] : '',
    errorMsg: '若选择此项，需要填入题目数量',
  },
  option2: {
    checked: false,
    count: props.configinfo['classes'] ? props.configinfo['classes'][1] : '',
    errorMsg: '若选择此项，需要填入题目数量',
  },
  option3: {
    checked: false,
    count: props.configinfo['classes'] ? props.configinfo['classes'][2] : '',
    errorMsg: '若选择此项，需要填入题目数量',
  },
  option4: {
    checked: false,
    count: props.configinfo['classes'] ? props.configinfo['classes'][3] : '',
    errorMsg: '若选择此项，需要填入题目数量',
  },
});

const validateForm = () => {
  if (!isValidNonEmptyJson(window.myexamdata)) {
    showerror.value = true;
    showDialog();
    return;
  }
  if (
    !formdata.option1.checked &&
    !formdata.option2.checked &&
    !formdata.option3.checked &&
    !formdata.option4.checked
  ) {
    showerror.value = true;
    return;
  }
  if (!formdata.level.value) {
    showerror.value = true;
  }
  if (formdata.option1.checked && !formdata.option1.count) {
    showerror.value = true;
  }
  if (formdata.option2.checked && !formdata.option2.count) {
    showerror.value = true;
  }
  if (formdata.option3.checked && !formdata.option3.count) {
    showerror.value = true;
  }
  if (formdata.option4.checked && !formdata.option4.count) {
    showerror.value = true;
  }
};
const isValidNonEmptyJson = (target) => {
  // 1. 检查变量已定义且不为 null/undefined
  if (target === null || target === undefined) {
    return false;
  }

  // 2. 检查是对象类型（JSON 本质是 JS 对象）
  if (typeof target !== 'object' || Array.isArray(target)) {
    return false;
  }

  // 3. 检查是普通对象（排除 Date, RegExp 等特殊对象）
  if (Object.prototype.toString.call(target) !== '[object Object]') {
    return false;
  }

  // 4. 检查对象不为空
  return Object.keys(target).length > 0;
};
const createTestPaper = () => {
  showerror.value = false;
  validateForm();
  if (showerror.value == false) {
    showMask?.(true);
    props.configinfo['level'] = formdata.level.value;
    props.configinfo['classes'] = [
      formdata.option1.count,
      formdata.option2.count,
      formdata.option3.count,
      formdata.option4.count,
    ];
    emit('createtestpaper', {
      text: '来自子组件的消息',
      info: formdata,
      time: new Date(),
    });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

body {
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

.login-container {
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #1e88e5, #0d47a1);
}

.login-form {
  padding-left: inherit;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo img {
  height: 50px;
}

.logo h1 {
  color: #333;
  font-size: 22px;
  margin-top: 10px;
  font-weight: 500;
}

.input-group {
  margin-bottom: 5px;
  position: relative;
}

.shrink-label {
  display: inline-block;
  max-width: 60px;
  /* 最大宽度 */
  white-space: nowrap;
  /* 禁止换行 */
  font-size: clamp(8px, 2vw, 15px);
  /* 动态调整字体大小 */
  /* 或者使用 transform 缩放 */
  /* transform: scale(0.9); transform-origin: left; */
}

.input-group label {
  margin-right: 18px;
  color: #555;
  font-weight: 500;
  display: inline-block;
}

.input-group input,
.input-group select {
  padding: 7px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: all 0.3s;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #1e88e5;
  box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
  outline: none;
}

.input-group .error {
  color: #e53935;
  font-size: 12px;
  margin-top: 5px;
  display: none;
}

.radio-group,
.checkbox-group {
  margin-bottom: 15px;
}

.radio-option,
.checkbox-option {
  height: 35px;
  display: flex;
  align-items: center;
}

.radio-option input[type='radio'],
.checkbox-option input[type='checkbox'] {
  margin-right: 10px;
}

.conditional-input {
  /* margin-top: 5px;*/
  margin-left: 25px;
  /*display: none;*/
}

.conditional-input.show {
  display: block;
}

.checkbox-input {
  width: 150px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #1e88e5, #0d47a1);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-button:hover {
  background: linear-gradient(90deg, #1976d2, #0a3a7a);
  box-shadow: 0 5px 15px rgba(30, 136, 229, 0.3);
}

.login-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
  box-shadow: none;
}

.footer {
  text-align: center;
  margin-top: 30px;
  color: #777;
  font-size: 12px;
}

.footer a {
  color: #1e88e5;
  text-decoration: none;
}

.error-message {
  color: red;
  font-size: 12px;
}

.input-item {
  flex: 0 0 calc(33.333% - 10px);
  margin: 2px;
  box-sizing: border-box;
}

@media (max-width: 480px) {
  .login-container {
    padding: 30px 20px;
    margin: 0 15px;
  }
}
</style>
