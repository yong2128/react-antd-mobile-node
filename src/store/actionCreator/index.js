// import axios from 'axios';

export default{
    //存储当前页下标
    saveIndexOfCurrentPage(data){
        return {
            type : "SAVE_INDEX",
            payLoad : {currentIndex : data}
        }
    }
}