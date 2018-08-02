import React from "react";
import "../css/login.css";
import UserService from "../service/user";
import {observer} from "mobx-react"
import {Link, Redirect} from "react-router-dom"
import {message} from "antd";
import "antd/lib/message/style";

const userService = new UserService();  // 创建服务UserService的实例，注入到Login的属性中去

export default class Login extends React.Component {
    render() {
        // 在_Login注入UserService属性
        return <_Login service={userService} />;
    }
}

@observer  // 观察者
class _Login extends React.Component {
    handleClick(event) {
        event.preventDefault();  // 阻止页面刷新
        let fm = event.target.form;  // 返回按钮所在的表单，可以当作一个数组
        this.props.service.login(  // 通过属性调用UserService的方法login
            fm[0].value, fm[1].value
        )
    }

    render() {
        if (this.props.service.loggedin) {  // 观察者发现Loggedin发生改变，实现登录页面跳转到首页
            return <Redirect to="/" />;
        }

        if (this.props.service.errMsg) {  // 观察者发现errMsg发生改变，提示登录失败
            message.info(this.props.service.errMsg, 3, 
                () => this.props.service.errMsg = "");
        }
        return (
            <div className="login-page">
                <div className="form">
                    <div className="login-head">
                        <h2>Login</h2>			
                    </div>
                    <form className="login-form">
                        <input type="text" placeholder="email"/>
                        <input type="password" placeholder="password"/>
                        {/* 登录按钮点击操作，触发handleClick函数 */}
                        <button onClick={this.handleClick.bind(this)}>login</button> 
                        <p className="message">Not registered? <Link to="/reg">Create an account</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}