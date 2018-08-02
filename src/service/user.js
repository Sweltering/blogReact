import axios from "axios";
import store from "store";
import {observable} from "mobx"

// store的过期插件
store.addPlugin(require("store/plugins/expire"))

// 负责业务逻辑处理，调用Model层数据操作函数
export default class UserService {
    @observable loggedin = false;  // 被观察着,如果这个发生变化，观察者会看到

    login (email, password) {
        // axios异步调用，完成POST、GET方法的数据的提交
        axios.post('/api/user/login', {
            email: email,
            password: password
        }).then(
            response => {
                // store往浏览器端持久化token
                store.set("token", response.data.token, (new Date()).getTime() + (8*3600*1000));
                this.loggedin = true;
            }
        ).catch(
            function(error) {
                console.log(error);
            }
        )
    }
}