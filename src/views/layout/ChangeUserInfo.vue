<template>
  <div class="login">
    <h1>修改用户信息</h1>
    <a-form-model
      ref="userInfoForm"
      :model="userInfoForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email" required>
        <a-input v-model="userInfoForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password" required>
        <a-input
          v-model="userInfoForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="新的密码" prop="newPassword">
        <a-input
          v-model="userInfoForm.newPassword"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="用户名" prop="username" required>
        <a-input
          v-model="userInfoForm.username"
          type="text"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item label="角色">
        <a-radio-group v-model="userInfoForm.role">
          <a-radio value="admin"> admin </a-radio>
          <a-radio value="coustomer"> coustomer </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code" required>
        <a-input v-model="userInfoForm.code" type="text" autocomplete="off" />
        <a-button type="primary" @click="getCodeData"> 获取验证码 </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('userInfoForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('userInfoForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import axios from '@/api/register';
import change from '@/api/changeUserInfo';

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
      userInfoForm: {
        password: '',
        newPassword: '',
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
  created() {
    console.log(this.$store.state.user);
    this.userInfoForm = {
      ...this.$store.state.user,
      code: '',
      password: '',
      newPassword: '',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.userInfoForm);
          change
            .changeUserInfo(this.userInfoForm)
            .then(() => {
              this.$router.push('/login');
              this.$message.success('修改用户信息成功，请重新登录');
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
      if (this.userInfoForm.email) {
        axios.getCode(this.userInfoForm).then((res) => console.log(res));
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
