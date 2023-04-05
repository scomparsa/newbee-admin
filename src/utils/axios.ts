import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";
import config from "~/config";
import { localGet } from "./index";

axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl;
axios.defaults.withCredentials = true;
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["token"] = localGet("token") || "";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    ElMessage.error("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) ElMessage.error(res.data.message);
    if (res.data.resultCode == 419) {
      router.push("/login");
    }
    return Promise.reject(res.data);
  }

  return res.data.data;
});

export default axios;
