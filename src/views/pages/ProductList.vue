<template>
  <div class="productlist">
    <Search @submit="handleSubmit" :categoryList="categoryList" />
    <a-button class="productadd">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <product-table
      :data="tabledata"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
      @remove="removeProduct"
      @edit="editProduct"
    />
  </div>
</template>
<script>
import Search from '@/components/search.vue';
import ProductTable from '@/components/productTable.vue';
import axios from '@/api/product';
import remove from '@/api/deleteProduct';
import category from '@/api/category';

export default {
  data() {
    return {
      searchForm: {},
      tabledata: [],
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },

  async created() {
    await category.list(this.searchForm).then((res) => {
      this.categoryList = res.data;
      res.data.forEach((it) => {
        this.categoryObj[it.id] = it.name;
      });
    });
    this.getTableData();
  },
  components: {
    Search,
    ProductTable,
  },
  methods: {
    handleSubmit(val) {
      this.searchForm = val;
      this.getTableData();
    },
    async getTableData() {
      await axios
        .tableData({
          ...this.searchForm,
          page: this.page.current,
          size: this.page.pageSize,
        })
        .then((res) => {
          this.page.total = res.total;
          this.tabledata = res.data.map((it) => ({
            ...it,
            category: this.categoryObj[it.category],
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => (
          <div style="color:red;">{`确认要删除${record.title}吗？`}</div>
        ),
        onOk: () => {
          remove
            .delete({
              id: record.id,
            })
            .then(() => this.getTableData());
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
  },
};
</script>
<style scoped lang="less">
.productlist {
  position: relative;
  .productadd {
    position: absolute;
    top: 14px;
    right: 100px;
  }
}
</style>
