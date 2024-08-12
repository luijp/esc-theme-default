import axios from 'axios';
import {ElMessage} from "element-plus";

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

instance.interceptors.response.use(function (resp) {
    if (resp.data.code !== 0) {
        ElMessage.error(resp.data.msg)
        return null;
    }
    return resp.data.data;
}, function (error) {
    ElMessage.error("服务器无法连接")
})

export default instance