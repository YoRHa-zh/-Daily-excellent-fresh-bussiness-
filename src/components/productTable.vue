<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="changePage"
  >
    <div slot="action" slot-scope="text, record">
      <a-button @click="editproduct(record)">编辑</a-button>
      <a-button @click="removeproduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '类目',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    width: 200,
    key: 'operation',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  data() {
    return {
      columns,
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Object,
      default: () => {},
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tableData() {
      return this.data.map((it) => ({
        ...it,
        key: it.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
      console.log(page);
    },
    editproduct(record) {
      this.$emit('edit', record);
    },
    removeproduct(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
