const fileUpload = require("express-fileupload");

module.exports = {
  devServer: {
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    before: function (app, server, compiler) {
      app.use(fileUpload());

      app.post("/upload/files", function (req, res) {
        if (req.files) {
          const file = req.files.file;
          const fileName = file.name;
          console.log("uploaded file", file.name);
        } else {
          console.log("There are no files");
        }

        setTimeout(() => {
          res.json({ custom: "response" });
        }, 3000);
      });
    },
  },
};
