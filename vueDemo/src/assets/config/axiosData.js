import axios from 'axios'
import URL from '@/assets/config/Interface.js'
import rsa from '@/assets/config/rsa.js'
import base64 from '@/assets/config/base64.js'

export default {
    /**
     * 接口传参编译处理函数
     * @param {object} data
     */
    changeData:function(data){
        let dataObj = data
        let strData = JSON.stringify(dataObj)
        let t=strData.length;
        if(t>100){
            let ct = "";
            let lt = strData.match(/.{1,50}/g);
            lt.forEach(function(entry) {
                ct = base64.base64encode(base64.utf16to8(rsa.rsajm(entry)))
                dataObj += ct+")-(" ;
            });
        }else{
            dataObj = base64.base64encode(base64.utf16to8(rsa.rsajm(strData)))+")-(" ;
        }
        return dataObj
    },
    /**
     * 数据请求函数
     * @param {object} data 传参
     * @param {string} str 接口名
     * @param {function} func 回调函数
     */
    getAjaxFunc:function(data,str,func){
        axios({
            url:URL[str],
            method:"post",
            data:this.changeData(data)
        }).then(Response => {
            func(Response.data)
        }).catch(error => {
            console.log(error)
        })
    },
    PHONE_REG : /^(((11[0-9]{1})|(12[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/,//手机正则
    TIME_COUNT:60,//倒计时时长
}