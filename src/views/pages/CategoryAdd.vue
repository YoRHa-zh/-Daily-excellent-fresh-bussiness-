<template>
  <a-form-model
    ref="categoryForm"
    :model="categoryForm"
    :rules="rules"
    v-bind="layout"
  >
    <a-form-model-item has-feedback label="商品类目ID" prop="id">
      <a-input v-model="categoryForm.id" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="商品类目名称" prop="name">
      <a-input v-model="categoryForm.name" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="商品子类目" prop="c_items">
      <a-input v-model.number="categoryForm.c_items" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('categoryForm')">
        Submit
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('categoryForm')">
        Reset
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import category from '@/api/category';

export default {
  data() {
    return {
      categoryForm: {
        id: 0,
        name: '',
        c_items: '',
        appkey: 'zh_1619405703040',
      },
      rules: {},
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
          if (this.$route.path === '/product/categoryedit') {
            return category.edit(this.categoryForm).then((res) => {
              console.log(res);
              this.$message.success('修改成功');
            });
          }
          return category.add(this.categoryForm).then((res) => {
            console.log(res);
            this.$message.success('新增成功');
          });
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      return this.$refs[formName].resetFields();
    },
  },
  created() {
    if (this.$route.path === '/product/categoryedit') {
      category.edit(this.categoryForm).then((res) => console.log(res));
    }
  },
};
</script>
