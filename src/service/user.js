import axios from "axios";
import store from "store";
import {observable} from "mobx"

// store的过期插件
store.addPlugin(require("store/plugins/expire"))

// 负责业务逻辑处理，调用Model层数据操作函数
export default class UserService {
    @observable loggedin = false;  // 被观察着,如果这个发生变化，观察者会看到
    @observable reged = false;  // 注册被观察者

    // 登录后台操作
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

    // 注册后台操作
    reg (name, email, password) {
        axios.post('/api/user/reg', {
            name: name,
            email: email,
            password: password
        }).then(
            response => {
                this.reged = true;  // 如果后台成功注册，修改这个标记，reg观察到做页面跳转
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }
}