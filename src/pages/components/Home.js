import React from 'react';
import {Carousel,WingBlank,ImagePicker,WhiteSpace,Toast} from 'antd-mobile';
import api from "../../api/api";
import common from "../../common/index"

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            imgHeight: 176,
            files : []
        }
    }
    componentDidMount(){
        this.getBanner();
    }
    handleUpload = async (e,type,index) => {
        if(type === 'add'){     //添加图片
            for(let i = 0;i < e.length;i ++){
                if(e[i].orientation === 1){
                    let val = e[i];
                    let formData = new FormData();
                    let base64Str = val.url;
                    //FormData对象接受三个参数，第三个参数为文件名，通常我们只传前两个参数，第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
                    formData.append('file',common.baseToBlob(base64Str,val.file.type), val.file.name);

                    formData.set("userId",localStorage.getItem("userId"));
                    formData.set("account",localStorage.getItem("account"));
                    let imageInfo = await api.uploadImage(formData);
                    if(imageInfo){
                        this.getBanner();
                        Toast.info(imageInfo.data.msg,1);
                    }
                    break;
                }
            }
        }else if(type === 'remove'){     //删除图片
            let params = {id : this.state.files[index].id};
            let res = await api.deleteImage(params);
            if(res && res.data.status === 1){    //删除成功
                this.getBanner();
                Toast.info(res.data.msg,1);
            }else{
                Toast.info(res.data.msg,1);
            }
        } 
    }
    //获取当前用户上传的banner
    getBanner = async () => {
        let res = await api.getBannerImage({userId : localStorage.getItem("userId")});
        if(res && res.data.ok === 1){
            let arr = [];
            if(res.data.data.length){
                res.data.data.forEach((v) => {
                    let obj = {
                        url : v.url,
                        id : v.id
                    }
                    arr.push(obj);
                });
            }
            this.setState({
                files : arr
            });
        }
    }
    imageClick(index){
        console.log(index);    //index为当前图片的下标
    }
    render(){
        const {files} = this.state;
        return (
            <div>
                <WingBlank>
                    <Carousel className='myCarousel' autoplay infinite  autoplayInterval={4000} afterChange={index => this.setState({ slideIndex: index })}>
                        {this.state.files.map((val,index) => (
                            <a key={index} href={val.url} style={{display : 'block',position : 'relative',height: this.state.imgHeight, boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',}}>
                                <img src={val.url} alt='' style={{ width: '100%', verticalAlign: 'top', height: this.state.imgHeight }}/>
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>

                <WhiteSpace/>

                <div className='content'>
                    <p>上传banner图</p>
                    <ImagePicker files={files} onChange={this.handleUpload} onImageClick={this.imageClick.bind(this)}></ImagePicker>
                </div>
            </div>
        );
    }
}

export default Home