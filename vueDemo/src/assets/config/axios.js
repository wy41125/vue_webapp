import axios from 'axios'
import URL from '@/assets/config/Interface.js'

export default {
    getIndexFunc:function(data,str,func){
        axios({
            url:URL[str],
            method:"post",
            data:data
        }).then(Response => {
            func(Response.data.data)           
        }).catch(error => {
            console.log(error)
        })
    }
}