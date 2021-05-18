<template>
  <div class="prductcategory">
    <categoryTable :data="categoryData" @edit="edit" @remove="remove" />
    <a-button type="primary" @click="$router.push({name:'CategoryAdd'})">新增类目</a-button>
  </div>
</template>

<script>
import categoryTable from '@/components/categoryTable.vue';
import category from '@/api/category';

export default {
  data() {
    return {
      page: 1,
      size: 10,
      categoryData: [],
    };
  },
  components: {
    categoryTable,
  },
  async created() {
    await category
      .list({
        page: this.page,
        size: this.size,
      })
      .then((res) => {
        this.categoryData = res.data;
      });
  },
  methods: {
    edit(record) {
      console.log(record);
      this.$router.push({
        name: 'CategoryEdit',
      });
    },
    remove(record) {
      category.delete(record.id).then((res) => console.log(res));
    },
  },
};
</script>

<style lang="less">
.prductcategory{
  text-align: center;
}
</style>
