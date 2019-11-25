import React,{Component} from 'react'
import {Button, InputItem, Picker, List, DatePicker, ImagePicker, Toast, Switch} from 'antd-mobile'
import api from "../../api/api";
import common from "../../common/index";

class EditSelfInfo extends Component{
    constructor(){
        super();
        this.state = {
            sexArr : [
                {value : 0,label : "男"},
                {value : 1,label : "女"}
            ],
            sex : [],
            birth : "",
            files : [],
            name : "",
            psw : "",
            conPsw : "",
            checked : false
        }
    }
    componentDidMount(){
        this.getUserInfo();
    }
    goBack(){
        this.props.history.goBack();
    }
    saveMsg = async () => {
        let reg = /^.{6,18}$/;
        if(!this.state.name){
            Toast.info('请填写昵称',1);
        }else if(this.state.checked && !this.state.psw){
                Toast.info('请填写密码',1);
        }else if(this.state.checked && !reg.test(this.state.psw)){
                Toast.info('密码格式不正确',1);
        }else if(this.state.checked && !this.state.conPsw){
            Toast.info('请确认密码',1);
        }else if(this.state.checked && this.state.conPsw !== this.state.psw){
            Toast.info('两次密码不一致',1);
        }else if(!this.state.sex.length){
            Toast.info('请选择性别',1);
        }else if(!this.state.birth){
            Toast.info('请选择出生日期',1);
        }else if(!this.state.files.length){
            Toast.info('请上传头像',1);
        }else{
            let formData = new FormData();
            if(this.state.files[0].orientation === 1){    //重新上传
                let val = this.state.files[0];
                let base64Str = val.url;
                //FormData对象接受三个参数，第三个参数为文件名，通常我们只传前两个参数，第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
                formData.append('file',common.baseToBlob(base64Str,val.file.type), val.file.name);
            }else{     //以前的照片
                formData.set("file",this.state.files[0].url.split("8888/")[1]);
            }
            formData.set("userId",localStorage.getItem("userId"));
            formData.set("account",localStorage.getItem("account"));
            formData.set("name",this.state.name);
            formData.set("password",this.state.psw);
            formData.set("sex",this.state.sex);
            formData.set("birth",this.state.birth.getFullYear() + "-" + (this.state.birth.getMonth() + 1).toString().padStart(2,"0") + "-" + this.state.birth.getDate().toString().padStart(2,"0"));
            let res = await api.updateSelfInfo(formData);
            if(res){
                if(res.data.status === 1){
                    Toast.info(res.data.msg,1);
                    this.props.history.goBack();
                }else{
                    Toast.info(res.data.msg,1);
                }
            }
        }                                                          
    }
    getUserInfo = async () => {      //获取当前用户信息
        let res = await api.selfInfomation({userId : localStorage.getItem("userId")});
        if(res && res.data.status === 1){
            this.setState({
                name : res.data.data.name,
                sex : [parseInt(res.data.data.sex)],
                birth : new Date(res.data.data.birth),
                files : [{id : 0, url : res.data.data.headImg}]
            });
            document.querySelector(".self .am-image-picker-upload-btn").style.display = this.state.files.length === 1 ? "none" : 'block';
        }
    }
    handleUpload = (file,type) => {
        if(type === 'add'){
            if(file.length === 1){
                document.querySelector(".self .am-image-picker-upload-btn").style.display = "none";
                this.setState({
                    files : file
                });
            }
        }else{
            document.querySelector(".self .am-image-picker-upload-btn").style.display = "block";
            this.setState({
                files : []
            });
        }
    }
    render(){
        return (
            <div className='self'>
                <form>
                    <InputItem type='text' value={this.state.name} placeholder='请输入昵称' style={{textAlign : 'right'}} onChange={(val) => {this.setState({name : val})}}>昵称</InputItem>
                    <List.Item extra={<Switch checked={this.state.checked} onChange={() => {this.setState({ checked: !this.state.checked,}); }} />}>是否修改密码</List.Item>
                    {this.state.checked ? (
                        <div>
                            <InputItem type='text' value={this.state.psw} placeholder='请输入密码' style={{textAlign : 'right'}} onChange={(val) => {this.setState({psw : val})}}>密码</InputItem>
                            <InputItem type='text' value={this.state.conPsw} placeholder='请确认密码' style={{textAlign : 'right'}} onChange={(val) => {this.setState({conPsw : val})}}>确认密码</InputItem>
                        </div>
                    ) : ''}
                    <Picker extra='请选择性别' value={this.state.sex} data={this.state.sexArr} title='sex' onChange={(sex) => {this.setState({sex})}}>
                        <List.Item arrow='horizontal'>性别</List.Item>
                    </Picker>
                    <DatePicker mode='date' value={this.state.birth} title='请选择出生日期' onChange={(time) => {this.setState({birth : time})}}>
                        <List.Item arrow='horizontal'>出生日期</List.Item>
                    </DatePicker>
                    <div style={{fontSize : '17px',margin : '15px'}}>上传头像</div>
                    <ImagePicker files={this.state.files} selectable={this.state.files.length < 2} multiple={false} onChange={this.handleUpload}></ImagePicker>
                </form>
            
                <div style={{textAlign: 'center'}}>
                    <Button onClick={this.goBack.bind(this)}>返回</Button>
                    <Button type='warning' onClick={this.saveMsg.bind(this)}>保存</Button>
                </div>
            </div>
        )
    }
}

export default EditSelfInfo;