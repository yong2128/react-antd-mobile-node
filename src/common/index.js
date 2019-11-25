export default {
    baseToBlob(base64Str,type){      //base64转成二进制文件流
        let bytes = window.atob(base64Str.split(",")[1]);
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for(let i = 0; i < bytes.length; i++){
            ia[i] = bytes.charCodeAt(i); //这里有点疑惑，ia是怎么改变ab的？注：①
        }
        //Blob对象
        let blob = new Blob([ab], {type: type}); //type为图片的格式
        //TDOD Ajax或者其他方式上传FormData对象        
        return blob;
    },
    caculateAge(birth){           //根据出生日期计算年龄 
        if(!birth){
            return;
        }
        let birArr = birth.split("-");
        let birYear = birArr[0];
        let birMonth = birArr[1];
        let birDay = birArr[2];

        //获取当前时间
        let current = new Date();
        let nowYear = current.getFullYear();
        let nowMonth = current.getMonth() + 1; //记得加1
        let nowDay = current.getDate();
        let returnAge;

        let d = new Date(birYear, birMonth - 1, birDay);
        if (d.getFullYear() === birYear && (d.getMonth() + 1) === birMonth && d.getDate() === birDay) {
            if (nowYear === birYear) {
                returnAge = 0; // 
             } else {
                let ageDiff = nowYear - birYear;
                if (ageDiff > 0) {
                    if (nowMonth === birMonth) {
                        let dayDiff = nowDay - birDay; 
                        if (dayDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    } else {
                        let monthDiff = nowMonth - birMonth;
                        if (monthDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    }
                } else {
                    return; //返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return returnAge + "岁";
        } else {
            return '';  //输入的日期格式错误！
        }
    }
}