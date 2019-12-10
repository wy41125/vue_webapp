import AxiosDIY from "@/assets/config/axiosData.js";
import winningDetile from '@/components/component/winningDetails.vue'
import { Toast } from 'vant';
export default {
    data() {
        return {
            map:{
                wheelPlantingList:[],
                noticeList:[],
                jadeExhibitionList:[],
                winningAreaList:[],
            },
            baseinfo:''
        }
    },
    computed: {

    },
    methods: {
        jumpJadeFunc(index){
            console.log(index)
            this.$router.replace({name:'Jade',query:{'activeType':index}})
            // if(index==1){}
        },
        jumpPage(type){
            if(type == 'video'){
                if(this.baseinfo.is_play==1){
                    window.location.href = this.baseinfo.play_url
                    //this.$router.push({name:'LiveCenter'})
                }else{
                    Toast("暂无直播")
                }

            }else{
                this.$router.push({name:'Problem'})
            }
        },
    },
    created() {
      document.title = '玉石首页';
        let dataObj = {
            mode:'index',
            act:'jxkj',
            sid:'A011750'
        }
        AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
            console.log(data)
            let c=data.msg
            this.map.wheelPlantingList=c.banner
            this.map.jadeExhibitionList=c.hot_product
            this.map.noticeList=c.notice
            this.map.winningAreaList=c.winning_prize
            this.baseinfo=c.baseinfo
        })
    },
    mounted(){
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
            direction: 'vertical',
        })
    },
}
