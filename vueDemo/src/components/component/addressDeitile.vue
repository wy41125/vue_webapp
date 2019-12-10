<template>
    <div>
        <div class="addList-detile">
            <p class="top-detile-name">
                {{addressObj.name}}<span>{{addressObj.phone}}</span>
            </p>
            <p class="top-detile-text">
                {{addressObj.s_city}}{{addressObj.address}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:['addressObj'],

    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.addList-detile{
                color: #333;
                .top-detile-name{
                    &{
                        .rem(18);
                        font-size: @rv;
                    }
                    span{
                        float: right;
                        .rem(16);
                        font-size: @rv;
                    }
                }
                .top-detile-text{
                    .rem(14);
                    font-size: @rv;
                }
            }
</style>