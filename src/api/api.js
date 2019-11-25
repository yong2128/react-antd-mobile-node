const api = require('./api.node.js');

export default {
    //登录接口
    async login(params){
        return await api.requestApi("/login",'GET',params);
    },
    //上传图片接口
    async uploadImage(params){
        return await api.requestApi("/uploadImage","POST",params);
    },
    //获取当前用户的banner
    async getBannerImage(params){
        return await api.requestApi("/getImage","GET",params);
    },
    //根据id删除图片
    async deleteImage(params){
        return await api.requestApi("/deletePicOfId","DELETE",params);
    },
    //上传头像
    async uploadHead(params){
        return await api.requestApi("/uploadHeadImg","POST",params);
    },
    //修改个人信息
    async updateSelfInfo(params){
        return await api.requestApi("/updateSelfInfo","POST",params);
    },
    //获取个人信息
    async selfInfomation(params){
        return await api.requestApi("/selfInfomation","GET",params);
    }
}