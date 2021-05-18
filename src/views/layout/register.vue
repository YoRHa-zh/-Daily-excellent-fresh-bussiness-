<template>
  <div class="login">
    <h1>注册</h1>
    <a-form-model
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="registerForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="registerForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
         <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input
          v-model="registerForm.username"
          type="text"
          autocomplete="off"
        />
      </a-form-model-item>
       <a-form-model-item label="角色">
      <a-radio-group v-model="registerForm.role">
        <a-radio value="admin">
          admin
        </a-radio>
        <a-radio value="customer">
          customer
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
             <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input
          v-model="registerForm.code"
          type="text"
          autocomplete="off"
        />
        <a-button type="primary" @click="getCodeData">
          获取验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('registerForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('registerForm')">
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
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the username'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        password: '',
        email: '',
        username: '',
        role: '',
        code: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        username: [{ validator: validateName, trigger: 'change' }],
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
          console.log(this.registerForm);
          axios
            .login(this.registerForm)
            .then((res) => {
              this.$router.push('/login');
              console.log(res);
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
      if (this.registerForm.email) {
        console.log(this.registerForm);
        axios.getCode(this.registerForm).then((res) => console.log(res));
      }
    },
  },
};
</script>
<style scoped>
@import url("~@/assets/css/login.less");
.login{
  text-align: center;
}
</style>
