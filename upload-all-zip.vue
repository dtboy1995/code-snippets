<template>
  <div>
    <h1>Test Zip</h1>
    <el-upload
      class="upload-demo"
      accept="application/zip"
      drag
      action=""
      :on-change="onChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import JSZip from "jszip";
import axios from "axios";

export default {
  data() {
    return {
      oss: {
        signature: "85gsQAQoyHVpzv5wiREeCtYP3b0=",
        accessid: "LTAI4G2czxjCUZAqYbtTr5Gf",
        policy:
          "eyJleHBpcmF0aW9uIjoiMjAyMy0xMi0yM1QwNDowMzowMS40NDlaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0ZXN0LyJdXX0=",
        action: "https://sinoocean.oss-cn-beijing.aliyuncs.com",
        action_private: undefined,
      },
    };
  },
  created() {},
  methods: {
    async uploadFile(key, file, oss) {
      let form = new FormData();
      form.append("key", key);
      form.append("OSSAccessKeyId", oss.accessid);
      form.append("signature", oss.signature);
      form.append("policy", oss.policy);
      form.append("file", file);
      await axios.post(`${oss.action}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async getEntryPromise(file, oss, prefix = "") {
      let blob = await file.async("blob");
      let key = `${prefix}${file.name}`;
      await this.uploadFile(`${key}`, blob, oss);
    },
    // 上传内容包
    async uploadContentPackage(raw, oss, prefix = "") {
      if (raw.type != "application/zip") {
        throw new Error("不支持的文件类型");
      }
      let zip = await JSZip.loadAsync(raw);
      let promises = [];
      zip.forEach((relativePath, file) => {
        if (!file.dir) {
          promises.push(this.getEntryPromise(file, oss, prefix));
        }
      });
      await Promise.all(promises);
    },
    async onChange(file, fileList) {
      try {
        let { raw } = file;
        await this.uploadContentPackage(raw, this.oss, "test/");
        console.log("文件已解压并上传所有文件");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>