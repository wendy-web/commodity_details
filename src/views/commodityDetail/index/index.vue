<template>
<div class="content">
    <van-nav-bar
        :title="nav_title"
        :left-arrow="true"
        :fixed="true"
        :safe-area-inset-top="true"
        :placeholder="true"
        @click-left="onClickLeft"
    >
        <template #right>
            <van-icon name="cross" size="18" @click="onClickLeft"/>
        </template>
    </van-nav-bar>
    <div  class="mescroll-body safe-area">
        <div class="swiper_box">
            <van-swipe
                :autoplay="3000"
                lazy-render
                :show-indicators="false"
                @change="changeHandle">
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="image" class="item_img" />
                </van-swipe-item>
            </van-swipe>
            <div class="swiper_pagination">{{ imgIndex + 1 }}/{{ images.length }}</div>
        </div>
        <div class="aui-content aui-module-bg">
            <div class="pro_toptit">
                <div class="pro_price flex justify-between" style="margin-bottom:0">
                    <div class="aui-font-size-20 aui-padded-r-5 text-theme text-price">
                        <span class="xq_danjia"><span id="price">59.90</span></span>
                        <sapn class="lab-product-voucher-price">
                            <span class="cu-tag bg-theme radius-30">
                                券后
                                <span class="text-price aui-padded-l-5 text-white">56.2
                                </span>
                            </span>
                        </sapn>
                        <span id="price_old">99</span>
                    </div>
                    <div class="color-999 aui-font-size-12">
                        <div class="xq_yishou">月销量：<span id="sale">100</span></div>
                    </div>
                </div>
                <div class="product_tags"></div>
            </div>
            <div class="pro_limit_time bg-gradient-theme">
                <div class="pro_limit_time_title">活动仅剩1天，售完即止！</div>
                <div class="pro-limit-time_right clearfix">
                    <van-count-down
                        :time="timeNum"
                        format="mm:ss"
                        @change="onChangeHandle"
                    >
                        <template #default="timeData">
                            <span class="block">{{ timeData.hours }}时</span>
                            <span class="block">{{ timeData.minutes }}分</span>
                            <span class="block">{{ timeData.seconds }}秒</span>
                            <span class="block_white">后结束</span>
                        </template>
                        </van-count-down>
                </div>
            </div>
            <div class="pro_title">
                <div class="xq_title">
                    <span class="vip_dd_img">
                        <img src="//douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/file/20240116/4ea54776fb5c473e804176b3b7c1a537.png" class="item_img" />
                    </span>
                    <span id="title">【工厂直发】高腰提臀显瘦收腹鲨鱼裤，透气休闲外穿无尴尬线！</span>
                </div>
            </div>
        </div>
        <div class="aui-content aui-module-bg">
            <div class="aui-font-size-12">
                <div class="pro_advtipname">
                    7天无理由退货·运费险·极速退款
                </div>
            </div>
        </div>
        <div class="aui-content aui-module-bg">
            <div class="aui-font-size-12">
                <div class="pro_advtipname"> 服务 </div>
                <div class="pro_advtiprigs">
                    <span class="pro_span" id="label">24小时内从工厂发货，全国包邮！</span>
                </div>
            </div>
        </div>


        <div class="aui-content aui-module-bg" id="index-rereviews-hide">
            <div class="mark_star">
                <span class="aui-font-size-16" style="font-weight: bold;">宝贝评分</span>
                <div class="show_number">
                        <div class="show_number_wrap">
                            <div class="atar_Show">
                                <p tip="4.7"></p>
                            </div>
                            <span>4.7</span>
                        </div>
                </div>
            </div>
            <div class="floor_title">
                <div class="floor_h3">
                    <span class="aui-font-size-16">宝贝评价</span>
                    <span class="aui-font-size-14 color-999 text-normal">(<span
                        class="lab-rereviews-number aui-font-size-14 color-999">94</span>条)</span>
                </div>
                <div class="more" onclick="toPageComment()">
                    <span class="product_rate">
                        商品好评率 98.0%
                        <van-icon name="arrow" color="#999" size="12" />
                    </span>
                </div>
            </div>
            <!--评价标签-->
            <div class="product_tag">
                <div class="product_tag_item">性价比高4.5W</div>
                <div class="product_tag_item">回头客3.8W</div>
                <div class="product_tag_item">用着舒服8833</div>
                <div class="product_tag_item">用着舒服8833</div>
            </div>
            <div class="aui-list aui-media-list bordernone aui-bg-transparent" id="index-rereviews">
                <div class="aui-list-item">
                    <div class="aui-info">
                        <div class="aui-info-item">
                            <div class="comment-img lab-rereviews-head">
                                <img src="http://douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/file/20240119/4f4210349d90441588b686842c3cf838.jpg" />
                            </div>
                            <span class="aui-margin-l-5 color-111 lab-rereviews-name">a**0</span>
                        </div>
                        <div class="aui-info-item color-999 lab-rereviews-time aui-font-size-12">2024-01-19</div>
                    </div>
                </div>
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-inner">
                        <div class="aui-ellipsis-2 color-111 aui-font-size-12 line-height12 lab-rereviews-detail">
                            穿上很服帖，走路也不紧绷这个厚度我感觉穿着刚刚好，而且裤子虽然是高腰收腹的 但是一点都不嘞人 真不错
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="operLine">
            <span class="line">商品详情</span>
        </div>
        <div class="product_detail" id="detail">
            <p>
                <img src="//douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/site/defaultparam1/news/20231219/1702964859831072409.jpg" />
            </p>
            <p>
                <img src="//douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/site/defaultparam1/news/20231219/1702964881251024958.jpg" />
            </p>
        </div>
    </div>
    <div class="cu-bar bg-white tabbar shop aui-fixed-bottom response" @click="buyHandle">
        <div class="bg-gradient-theme submit" id="btnSubmit">立即购买</div>
    </div>
    <sku-list
        :isShow="isShowSkuCom"
        @close="closeSkuHandle"
        @submit="submitHandle"
    ></sku-list>
</div>
</template>

<script>
import skuList from './skuList';
export default {
    name: 'detailIndex',
    components: {
        skuList,
    },
    data() {
        return {
            images: [
                '//douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/site/defaultparam1/news/20231219/1702964859831072409.jpg',
                '//douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/site/defaultparam1/news/20231219/1702964881251024958.jpg',
            ],
            imgIndex: 0,
            nav_title: "源头工厂专享福利",
            timeData: {},
            timeNum: 60*60*1000*24,
            isShowSkuCom: false
        };
    },
    created() {
    },
    mounted() {
        this.initRouteParams();
    },
    methods: {
        // 初始化路由参数
        initRouteParams() {
            let query = this.$route.query;
            console.log("query:", query);
        },
        buyHandle() {
            this.isShowSkuCom = true;
        },
        closeSkuHandle() {
            this.isShowSkuCom = false;
        },
        changeHandle(index) {
            this.imgIndex = index;
        },
        onClickLeft() {
            this.$router.go(-1);
            window.close();
        },
        submitHandle(item) {
            this.isShowSkuCom = false;
            this.$router.push({
                name: "idOrder",
            });
            console.log('item', item)
        },
        onChangeHandle(event) {
            let {
                hours,
                minutes,
                seconds,
                milliseconds,
                days
            } = event;
            hours = hours < 10 ? '0' + hours : hours
            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds
            milliseconds = Math.floor(milliseconds/100);
            // milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
            this.timeData = {
                hours,
                minutes,
                seconds,
                milliseconds,
                days
            }
        },
    },
};
</script>

<style lang="scss" scoped>
/deep/ .title-text {
    font-size: 32px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #333333;
}

/deep/ .van-nav-bar {
    background-color: transparent;
    z-index: 999;

    .van-icon-arrow-left {
        font-size: 24px;
    }

    .van-icon {
        color: #333333;
    }

    .van-nav-bar__text {
        color: #333333;
    }
}
.swiper_box {
    width: 100%;
    position: relative;
    .item_img {
        width: 100%;
    }
    .swiper_pagination {
        position: absolute;
        text-align: center;
        transition: .3s opacity;
        right: 10px;
        bottom: 10px;
        padding: 0 10px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 30px;
        font-size: 12px;
        color: #fff;
        height: 24px;
        line-height: 24px;
    }
}

.content {
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    max-width: 750px;
    margin: 0 auto;
    background-color: #f5f7fa;
    padding-top: var(--window-top);
    height: 100vh;
    overflow: hidden;
}
.aui-content {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    word-break: break-all;
}
.aui-module-bg {
    background-color: #fff;
    border-radius: 10px;
    margin: 10px 10px 0 10px !important;
    padding: 15px !important;
}
.pro_toptit {
    line-height: 32px;
}
.pro_price {
    font-size: 20px;
    line-height: 32px;
    width: 100%;
    margin-bottom: 10px;
}

.text-theme {
    color: #f54319!important;
}
.text-price::before {
    content: "¥";
    font-size: 80%;
    margin-right: 2px;
}
.pro_toptit .xq_danjia {
    float: none;
    width: auto;
    text-align: left;
    padding: 0;
}
.lab-product-voucher-price{
    margin: 0 5px;
}
.xq_danjia {
    float: right;
    width: 50%;
    text-align: center;
    padding: 20px 0;
}
.cu-tag {
    font-size: 12px;
    vertical-align: middle;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 8px;
    height: 24px;
    font-family: Helvetica Neue,Helvetica,sans-serif;
    white-space: nowrap;
}

.radius-30 {
    border-radius: 30px !important;
}
.bg-theme {
    background-color: #ff6d20!important;
    color: #fff!important;
}
.aui-padded-l-5 {
    padding-left: 5px!important;
}
.text-white {
    color: #fff!important;
}
#price_old {
    font-size: 16px;
    text-decoration: line-through;
    color: #999;
}
.pro_limit_time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius:6px;
    padding: 6px;
    font-weight: bold;
    margin: 5px 0;
}
.pro_limit_time_title {
    font-size: 12px;
    color: #FFF;
}
.bg-gradient-theme {
    background: -webkit-linear-gradient(left,#fbb90b,#ff6d20)!important;
    background: -o-linear-gradient(right,#fbb90b,#ff6d20)!important;
    background: -moz-linear-gradient(right,#fbb90b,#ff6d20)!important;
    background: linear-gradient(to right,#fbb90b,#ff6d20)!important;
    color: #fff!important;
}
.pro-limit-time_right {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.block {
    display: inline-block;
    font-size: 0.8rem;
    width: 33px;
    border-radius: 3px;
    background: #FFF;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin-right: 2px;
    font-weight: bold;
    color: #fd4d09;
    font-size: 14px;
}
.block_white{
    color: #fff;
    margin-left: 3px;
}
.pro_title {
    font-size: 16px;
    color: #111;
    line-height: 24px;
    font-weight: 600;
    padding-top: 5px;
}
.vip_dd_img {
    display: inline-block;
    width: 64px;
    height: 24px;
    vertical-align: bottom;
    background: antiquewhite;
    border-radius: 5px;
    overflow: hidden;
    img {
        width: 100%;
    }
}
.pro_toptit .xq_title {
    border-bottom: none;
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: auto;
    line-height: 24px;
    margin: 0;
    color: #111111;
}
.pro_advtipname {
    font-size: 14px;
    color: #111111;
    float: left;
    line-height: 28px;
    clear: both;
    font-weight: 600;
}
.pro_advtiprigs {
    margin-left: 20px;
    line-height: 28px;
}
.pro_advtiprigs .pro_span {
    font-size: 12px;
    padding-left: 10px;
    float: left;
    color: #111111;
}
.mark_star {
    position: relative;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #ededed;
    display: flex;
    align-items: center;
}
/*星星样式*/

.show_number {
    font-size: 16px;
}

.show_number .show_number_wrap {
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.atar_Show {
    background: url(https://douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/dev/img/stark2.png);
    width: 160px;
    height: 21px;
    position: relative;
    margin-right: 10px
}

.atar_Show p {
    background: url(https://douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/dev/img/stars2.png);
    left: 0;
    height: 21px;
    width: 134px;
    padding: 0;
    margin: 0;
}

.show_number .show_number_wrap span {
    display: inline-block;
    color: #eb3838;
    font-weight: bold;
}
/*商品好评率*/
.floor_title {
    position: relative;
    clear: both;
    height: 44px;
    line-height: 44px;
}
.floor_title .more span {
    color: #999;
    vertical-align: middle;
}

.floor_title .more .product_rate {
    color: #fd4d09;
    font-size: 16px;
    font-weight: bold;
}
.floor_title .floor_h3 {
    font-size: 16px;
    float: left;
    font-weight: bold;
    color: #111111;
}
.floor_title .more {
    float: right;
    font-size: 12px;
    font-weight: normal;
    text-align: right;
    color: #999;
}
.floor_title .more span {
    color: #999;
    vertical-align: middle;
}
.icon-arrow-right:before {
    content: "\e7bd";
}
.product_tag {
    display: flex;
    align-items: center;
    clear: both;
    flex-wrap: wrap;
}

.product_tag .product_tag_item {
    background: #ffeded;
    color: #4f4443;
    padding: 6px 10px;
    margin: 0 10px 10px 0;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
}
.product_tag {
    display: flex;
    align-items: center;
    clear: both;
    flex-wrap: wrap;
}
.product_tag .product_tag_item {
    background: #ffeded;
    color: #4f4443;
    padding: 6px 10px;
    margin: 0 10px 10px 0;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 500;
}
.aui-module-bg .aui-list .aui-list-item {
    padding-left: 0;
    border-bottom: none;
}

.aui-media-list .aui-list-item {
    display: block;
}
.aui-module-bg .aui-list .aui-info {
    width: 100%;
}

.aui-info {
    position: relative;
    padding: 10px 0;
    font-size: 14px;
    color: #757575;
    background-color: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.comment-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}
.comment-img img {
    width: 100%;
}
.aui-info {
    position: relative;
    padding: 10px 0;
    font-size: 14px;
    color: #757575;
    background-color: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.aui-info-item {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.mescroll-body {
    flex: 1;
    flex-shrink: 0;
    overflow: scroll;
    font-size: 16px;
}
.operLine {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin: 10px auto;
}
.operLine .line {
    position: relative;
    display: inline-block;
    padding: 0px 30px;
    color: #666;
}
.operLine .line::before {
    content: '';
    width: 40px;
    position: absolute;
    top: 20px;
    left: -20px;
    border-bottom: 1px solid #CCCCCC;
}
.operLine .line::after {
    content: '';
    width: 40px;
    position: absolute;
    top: 20px;
    right: -20px;
    border-bottom: 1px solid #CCCCCC;
}
#detail {
    min-height: 300px;
    margin: 1px;
    padding: 1px;
    margin-top: 30px;
}
.product_detail {
    background-color: #fff;
    margin-top: 0 !important;
    img {
        width: 100%;
    }
}
.cu-bar.tabbar {
    padding: 0;
}
.response {
    width: 100%;
}
.aui-fixed-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
}
.bg-white {
    background-color: #fff!important;
    color: #666;
}
.cu-bar.tabbar .submit:last-child {
    flex: 2.6;
}
.cu-bar.tabbar .submit {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
    position: relative;
    flex: 2;
    align-self: stretch;
    font-size: 16px;
}

.shop .submit {
    margin: 10px;
    height: 40px;
    border-radius: 30px;
    line-height: 40px;
}
</style>
