import React from 'react';
import {List,InputItem,Button,WhiteSpace,Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import api from '../api//api'

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            account : "",
            password : ""
        }
    }
    changeAccount = (e) => {
        this.setState({
            account : e.target.value
        });
    }
    changePas = (e) => {
        this.setState({
            password : e.target.value
        });
    }
    submit = async () => {
        let res = await api.login(this.state);
        if(res.data.status === 1) {    //登录/注册成功
            this.showToast(1);
            localStorage.setItem("account",this.state.account);
            localStorage.setItem("userId",res.data.id);
            setTimeout(() => {
                this.props.history.push("/index");
            }, 500);
        }else{
            this.showToast(0);
        }
    }
    showToast = (type) => {
        let str = type === 1 ? "成功" : "失败";
        Toast.info("登录" + str + "！",1);
    }
    render(){
        const {getFieldProps} = this.props.form;
        return (
            <div className='login_wrap'>
                <div className='login'>
                    <List renderHeader={() => '登录'}>
                        <InputItem type='text' clear value={this.state.account} onKeyUp={this.changeAccount} placeholder='请输入登录账号' {...getFieldProps('autofocus',{rules: [{required : true,message : "账号不能为空"},{min:1,max:18,message:'账号长度不正确'}]})} ref={el => this.autoFocusInst = el}>账号</InputItem>
                        <InputItem type='password' clear value={this.state.password} onKeyUp={this.changePas} placeholder='请输入密码' {...getFieldProps('psw',{rules: [{required : true,message : "密码不能为空"},{min:6,max:18,message:'密码格式不正确'}]})}>密码</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.submit}>登录</Button>
                    </List>
                    <div className='ps'>注：新账号首次登录即为注册</div>
                </div>
            </div>
        );
    }
}

export default createForm()(Login);