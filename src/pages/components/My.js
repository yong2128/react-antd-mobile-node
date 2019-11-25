import React from 'react'
import api from '../../api/api'
import common from '../../common/index'

class My extends React.Component{
    constructor(){
        super();
        this.state = {
            name : localStorage.getItem("account"),
            age : 16,
            head : 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png',
            info : {}
        }
    }
    componentWillMount(){
        this.getMyMsg();
    }
    editSelfInfo(){
        this.props.history.push(`/selfInfo`);
    }
    getMyMsg = async () => {    //获取我的信息
        let res = await api.selfInfomation({userId : localStorage.getItem("userId")});
        if(res){
            if(res.data.status === 1){
                this.setState({info : res.data.data});
            }
        }
    }
    render(){
        return (
            <div className='my'>
                <div className='head'>
                    <img src={this.state.info.headImg || this.state.head} alt=''></img>
                    <div className='head_detail'>
                        <p>{this.state.info.name || this.state.name}</p>
                        <p>{this.state.info.sex === '1' ? '女' : '男'}  {common.caculateAge(this.state.info.birth)}</p>
                        <span onClick={this.editSelfInfo.bind(this)}>编辑个人信息</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default My;
