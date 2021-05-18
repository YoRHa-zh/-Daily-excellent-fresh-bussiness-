<template>
  <div class="add">
    <div class="steps">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="steps-content">
      <basic-info v-if="current === 0" @next="next" :form="form" />
      <sale-info
        v-else-if="current === 1"
        @pre="prev"
        @complete="next"
        :form="form"
      />
    </div>
  </div>
</template>
<script>
import api from '@/api/addproduct';
import editApi from '@/api/editproduct';
import basicInfo from '@/components/basicInfo.vue';
import saleInfo from '@/components/saleInfo.vue';

export default {
  components: {
    basicInfo,
    saleInfo,
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        c_items: [],
        category: '',
        tags: [],
        price: 0,
        price_off: 0,
        inventory: '',
        unit: '',
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
          content: 'First-content',
        },
        {
          title: '填写商品销售信息',
          content: 'Second-content',
        },
      ],
    };
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        // 提交数据
        if (this.$route.params.id) {
          editApi.edit(this.form).then(() => {
            this.$message.success('修改成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          api.add(this.form).then(() => {
            this.$message.success('添加成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      // 获取数据
      editApi.detail(id).then((res) => {
        this.form = res;
      });
    }
  },
};
</script>
<style scoped lang="less">
.add {
  .steps {
    width: 600px;
    margin: 30px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>
