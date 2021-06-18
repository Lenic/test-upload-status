<template>
  <div id="app">
    <input name="" type="file" value="" @change="handleUpload" />

    <div>
      <span>上传进度：</span>
      <span>{{ percentDescription }}</span>
    </div>

    <div>
      <span>上传状态：</span>
      <span>{{ stateDescription }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      state: -1,
      percent: "--",
    };
  },
  computed: {
    stateDescription() {
      if (this.state === 0) return "上传中";
      if (this.state === 1) return "解析中";

      return "初始状态";
    },
    percentDescription() {
      return typeof this.percent === "number"
        ? `${this.percent.toFixed(2)}%`
        : this.percent;
    },
  },
  methods: {
    handleUpload(e) {
      const data = new FormData();
      data.append("file", e.target.files[0]);

      this.percent = "0";
      this.state = 0;

      axios
        .post("/upload/files", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            console.log("processing", progressEvent, new Date());

            this.percent = (progressEvent.loaded * 100.0) / progressEvent.total;
            this.state = this.percent === 100 ? 1 : 0;
          },
        })
        .then(() => {
          this.percent = "--";
          this.state = -1;

          console.log("completed", new Date());
        });
    },
  },
};
</script>
