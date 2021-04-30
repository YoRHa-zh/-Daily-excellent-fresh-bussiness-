<template>
<div class="login">
  <a-form-model
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    v-bind="layout"
  >
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('loginForm')">
        提交
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>
<script>
import axios from '@/api/login';

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
      loginForm: {
        password: '',
        email: '',
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
          axios.login(this.loginForm).then((res) => {
            this.$store.dispatch('setUserInfo', res);
            this.$router.push('/');
          }).catch((error) => this.$message.error(error));
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
@import url('~@/assets/css/login.less');
</style>
