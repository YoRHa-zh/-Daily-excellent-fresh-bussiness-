<template>
  <div class="sale">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" placeholder="请输入商品售价" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="form.price_off" placeholder="请输入商品折扣价" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" placeholder="库存量" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" placeholder="计量单位" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          name="avatar"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
    </a-form-model>
    <a-form-model-item>
      <a-button @click="preStep" type="primary">上一步</a-button>
      <a-button @click="complete" type="primary">完成</a-button>
    </a-form-model-item>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      rules: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((it, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: it,
      }));
    }
  },
  methods: {
    complete() {
      return this.$emit('complete', this.form);
    },
    preStep() {
      return this.$emit('pre');
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((it) => it !== url);
      }
    },
  },
};
</script>
