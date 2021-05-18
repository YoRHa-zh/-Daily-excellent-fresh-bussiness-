<template>
  <div class="login">
    <h1>找回密码</h1>
    <a-form-model
      ref="findPassForm"
      :model="findPassForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="findPassForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="findPassForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="findPassForm.code" type="text" autocomplete="off" />
        <a-button type="primary" @click="getCodeData"> 获取验证码 </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('findPassForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('findPassForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import axios from '@/api/register';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the email'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确！'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };

    return {
      findPassForm: {
        password: '',
        email: '',
        code: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .findPassword(this.findPassForm)
            .then(() => {
              this.$router.push('/login');
              this.$message.success('修改密码成功，请登录！');
            })
            .catch((error) => this.$message.error(error));
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCodeData() {
      if (this.findPassForm.email) {
        axios.getCode(this.findPassForm).then((res) => console.log(res));
      }
    },
  },
};
</script>
<style scoped>
@import url("~@/assets/css/login.less");
.login {
  text-align: center;
}
</style>
