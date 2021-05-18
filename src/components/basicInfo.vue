<template>
  <div class="basic">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="form.title" placeholder="请输入商品标题" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" placeholder="请输入商品描述" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          v-model="form.category"
          placeholder="选择商品类目"
          @change="changeCategory"
        >
          <a-select-option v-for="c in categoryList" :key="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="选择商品子类目">
          <a-select-option v-for="item in categoryItems" :key="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          style="width: 100%"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <a-form-model-item >
      <a-button @click="next" type="primary" >下一步</a-button>
    </a-form-model-item>
  </div>
</template>
<script>
import category from '@/api/category';

export default {
  data() {
    return {
      categoryList: [],
      categoryItems: [],
      rules: {},
    };
  },
  props: ['form'],

  created() {
    category.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    onSubmit() {

    },
    changeCategory(e) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if ((e === this.categoryList[i].id)) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          return this.$emit('next', this.form);
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>
<style scoped>
</style>
