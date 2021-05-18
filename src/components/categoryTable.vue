<template>
  <a-table
    :columns="columns"
    :data-source="categoryData"
  >
    <div slot="action" slot-scope="text, record">
      <a-button @click="edit(record)">编辑</a-button>
      <a-button @click="remove(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '商品类目ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商品类目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '商品子类目',
    dataIndex: 'c_items',
    key: 'c_items',
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
  },
  computed: {
    categoryData() {
      return this.data.map((it) => ({
        ...it,
        key: it.id,
      }));
    },
  },

  methods: {
    edit(record) {
      console.log(record);
      console.log(this.categoryData);
      this.$emit('edit', record);
    },
    remove(record) {
      console.log(record);

      this.$emit('remove', record);
    },
  },
};
</script>
