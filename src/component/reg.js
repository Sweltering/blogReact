import React from "react";
import "../css/login.css";
import UserService from "../service/user";
import {observer} from "mobx-react"
import {Link, Redirect} from "react-router-dom"

const userService = new UserService();


export default class Reg extends React.Component {
    render() {
        // 在Reg的属性中注入UserService实例，可以通过属性来操作这个服务
        return <_Reg service={userService} />
    }
}

@observer
class _Reg extends React.Component {
    handleClick(event) {
        event.preventDefault();  // 阻止刷新页面
        let fm = event.target.form;  // 获取form表单的内容，可以看成是一个列表
        this.props.service.reg(fm[0].value, fm[1].value, fm[2].value);
    }

    render() {
        if (this.props.service.reged) {  // 观察者发现reged发生改变，实现注册页面跳转到登录页
            return <Redirect to="/login" />;
        }
        return (
            <div className="reg-page">
                <div className="form">
                    <div className="register-head">
                        <h2>register</h2>			
                    </div>
                    <form className="register-form">
                        <input type="text" placeholder="name"/>
                        <input type="text" placeholder="email"/>
                        <input type="password" placeholder="password"/>
                        {/* 点击触发handleClick函数 */}
                        <button onClick={this.handleClick.bind(this)}>create</button>
                        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}