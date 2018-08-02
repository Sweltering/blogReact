import axios from "axios";
import store from "store";
import {observable} from "mobx"

// store的过期插件
store.addPlugin(require("store/plugins/expire"))

// 负责业务逻辑处理，调用Model层数据操作函数
export default class UserService {
    @observable loggedin = false;  // 是否登录观察状态
    @observable reged = false;  // 是否注册观察状态
    @observable errMsg = "";  // 登录，注册失败观察状态

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
            error => {
                console.log(error);
                this.errMsg = "login failed";
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
                this.errMsg = "register failed"
            }
        )
    }
}