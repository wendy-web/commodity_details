<template>
<div class="page-box" id="invite-box">
    <van-nav-bar
        :title="nav_title"
        :left-arrow="true"
        :fixed="true"
        :safe-area-inset-top="true"
        :placeholder="true"
        :border="false"
        @click-left="onClickLeft"
    >
        <template #right>
            <van-icon name="cross" size="18" @click="onClickLeft"/>
        </template>
    </van-nav-bar>
    <div class="aui-content bg-order bg_color"></div>
    <div class="pretop-pannel">
        <!-- 收货地址 -->
        <div class="aui-module-bg form-address">
            <div class="cu-form-group">
                <div class="title">收货人</div>
                <input type="text" placeholder="请填写收货人姓名" v-model="nickName" />
            </div>
            <div class="cu-form-group">
                <div class="title">联系电话</div>
                <input type="text" placeholder="请填写联系电话" v-model="telNum" />
            </div>
            <div class="cu-form-group cu-form-select address-div" @click="isShowAreaSel = true">
                <div class="title">所在地区</div>
                <input data-required="true" v-model="areaText" placeholder="请选择省市区" readonly />
                <van-icon name="arrow" size="12" color="#999"/>

            </div>
            <div class="cu-form-group address-div">
                <div class="title">详细地址</div>
                <input type="text" placeholder="请填写详细地址" v-model="addressText" />
            </div>
        </div>
        <!-- 收货地址end -->
        <div class="aui-content aui-module-bg">
            <!-- 商品列表 -->
            <div class="aui-list aui-media-list order_productcon" id="order_items">
                <div class="aui-list-item">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media" style="width: 100px;">
                            <div class="proimg-pan lab-product-img">
                                <img src="http://douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/file/20231219/77ae0d5d4e82437c9fa70778dadb4b32.png" class="radius-10 img" />
                            </div>
                        </div>
                        <div class="aui-list-item-inner">
                            <div class="aui-font-size-14 color-000 aui-ellipsis-2 lab-product-name">
                                【工厂直发】高腰提臀显瘦收腹鲨鱼裤，透气休闲外穿无尴尬线！
                            </div>
                            <div class="aui-clearfix"></div>
                            <div class="aui-font-size-12 color-999 aui-ellipsis select-attribute-names">
                                黑色不加绒（穿到15度）M码建议80~100斤
                            </div>
                            <div class="aui-info aui-margin-t-5" style="padding:0;">
                                <div class="aui-info-item">
                                    <div class="aui-font-size-16 text-theme">
                                        <span class="text-price default-sku-saleprice">59.9</span>
                                    </div>
                                </div>
                                <div class="aui-info-item aui-text-right color-999 aui-font-size-12">
                                    x <span class="lab-product-number">1</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 商品列表end -->
            <!-- 订单信息统计 start -->
            <div class="aui-content color-666">
                <div class="aui-font-size-12 line-height18" id="voucherPannel" style="display: none;">
                    <div class="aui-col-xs-4 color-999">优惠券</div>
                    <div class="aui-col-xs-8 aui-text-right aui-font-size-12 text-theme"><span class="lab-youhuiquan-price">0</span>元抵扣劵
                    </div>
                </div>

                <div class="aui-font-size-12 line-height18">
                    <div class="aui-col-xs-4 color-999">配送服务</div>
                    <div class="aui-col-xs-8 aui-text-right order-freight-price aui-font-size-12 color-111">快递免邮
                    </div>
                </div>
                <div class="aui-font-size-12 line-height18 form-input">
                    <div class="aui-col-xs-4 color-999">备注</div>
                    <div class="aui-col-xs-8 aui-text-right" style="padding-top: 2px;">
                        <input class='aui-font-size-12 line-height18 text-right'
                            type="text" style="height:0.96rem;color:#666;"
                            placeholder="建议留言前先与商家沟通确认"
                            v-model="leaveMessage"
                        />
                    </div>
                </div>
            </div>
            <!-- 订单信息统计 end -->
            <div class="text-right padding-top aui-font-size-14">
                <span class="color-999">共<span class="lab-product-number"></span>件</span>
                <span class="color-111">小计：56.90</span>
            </div>
        </div>
        <div class="aui-content aui-module-bg paytype-pannel">
            <div class="cu-list menu">
                <label for="selecteds">
                    <div class="cu-item aui-padded-0 border-b">
                    <div class="content">
                        <div class="color-111 aui-font-size-14">
                                <i class="wxpay-icon">
                                    <img src="//cloudtemplate.weiunity.com/websiteTemplate/wangmarket_shop_2/images/common/wxpay.png" alt="" />
                                </i>
                                <span >微信支付</span>
                            </div>
                        </div>
                        <div class="action" >
                            <input type="radio" name="pay" value="wxPay" v-model="radioVal" class="aui-radio bg-info aui-lg" checked="checkedHandle" @change="checkedHandle"/>
                        </div>
                    </div>
				</label>
                <label for="selected">
                    <div class="cu-item aui-padded-0">
                        <div class="content">
                            <div class="color-111 aui-font-size-14">
                                <i class="wxpay-icon">
                                    <img src="//cloudtemplate.weiunity.com/websiteTemplate/wangmarket_shop_2/images/common/zfbpay.png" alt="" />
                                </i>
                                支付宝支付
                            </div>
                        </div>
                        <div class="action">
                            <input type="radio" name="pay" value="zfbPay" v-model="radioVal" class="aui-radio bg-info aui-lg" @change="checkedHandle" />
                        </div>
                    </div>
				</label>
            </div>
        </div>
    </div>
    <div class="aui-bar aui-bar-tab aui-margin-t-15 border-t shop">
        <div class="aui-bar-tab-item" style="width: auto;">
            <div class="aui-text-left aui-margin-l-15">
                <div class="aui-list-item-text">
                    <div class="aui-font-size-14">
                        <div class='fl color-111'>合计：</div>
                        <div class="aui-font-size-16 text-theme text-price text-bold order-pay-amount">0.00</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="aui-bar-tab-item" style="width: 120px;" @click="submitHandle">
            <div class="bg-theme radius-30 submit aui-font-size-14">
                提交订单
            </div>
        </div>
    </div>
    <areaSel
        :isShow="isShowAreaSel"
        :codeValue="codeValue"
        @close="isShowAreaSel = false"
        @confirm="areaConfirmHandle"
    ></areaSel>
</div>
</template>

<script>
import { checkName, checkUserPhone } from '@/utils/auth.js';
import { Toast } from 'vant';
import areaSel from './areaSel';
export default {
    name: 'idOrder',
    components: {
        areaSel
    },
    data() {
        return {
            nav_title: "确认订单",
            nickName: '',
            telNum: '',
            addressText: '',
            leaveMessage: '',
            radioVal: 'wxPay',
            isShowAreaSel: false,
            areaText: '',
            codeValue: ''

        };
    },
    created() {
    },
    mounted() {
    },
    methods: {
        submitHandle() {
            const params = this.validateInfo();
            if(!params) return;
            Toast('支付成功');
        },
        validateInfo() {
            if(!this.nickName.trim()) {
                Toast('请输入姓名');
                return false;
            }
            if (!checkName(this.nickName.trim())) {
                Toast('姓名格式不正确');
                return false;
            }
            if(!this.telNum.trim()) {
                Toast('请输入手机号码');
                return false;
            }
            if(!this.codeValue) {
                Toast('请选择省市区');
                return false;
            }
            if(!checkUserPhone(this.telNum.trim())) {
                Toast('手机号码格式有误！');
                return false;
            }
            if(!this.addressText.trim()) {
                Toast('请输入家庭或工作地址');
                return false;
            }
            return {
                nick_name: this.nickName,
                mobile: this.telNum,
                address: this.addressText,
                leaveMessage: this.leaveMessage,
                payType: this.radioVal,
            }
        },
        areaConfirmHandle(areaEvent){
            console.log('areaEvent', areaEvent);
            this.areaText = '';
            this.isShowAreaSel = false;
            // this.codeValue = areaEvent[areaEvent.length - 1].code;
            if(!areaEvent.length) return;
            // 使用forEach方法遍历数组并累加字段
            areaEvent.forEach(res => {
                if(res) {
                    if(res.code) this.codeValue = res.code;
                    this.areaText += res.name;
                }
            });
        },
        onClickLeft() {
            this.$router.go(-1);
            window.close();
        },
        checkedHandle() {
            console.log('event', this.radioVal)
        }
    },
};
</script>

<style lang="scss" scoped>
/deep/ .title-text {
    font-size: 32px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #fff;
}
/deep/ .van-nav-bar__title {
    color: #fff;
}
/deep/ .van-nav-bar {
    background-color: #ff6d20;
    z-index: 999;

    .van-icon {
        color: #fff;
    }

    .van-icon-arrow-left {
        font-size: 24px;
    }

    .van-nav-bar__text {
        color: #fff;
    }
}

/deep/.van-share-sheet__options {
    justify-content: center;
}

.page-box {
    box-sizing: border-box;
    background-color: #f3f4f6;
    max-width: 750px;
    margin: 0 auto;
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-top: var(--window-top);
    z-index: 1;
}
.bg_color{
    position: absolute;
    width: 100%;
    top: 40px;
}
.content-box {
    position: relative;
    flex: 1;
    flex-shrink: 0;
    overflow: scroll;
}
.bg-order {
    background: -webkit-linear-gradient(top, #FF6D20, #F3F4F6) !important;
    background: -o-linear-gradient(bottom, #FF6D20, #F3F4F6) !important;
    background: -moz-linear-gradient(bottom, #FF6D20, #F3F4F6) !important;
    background: linear-gradient(to bottom, #FF6D20, #F3F4F6) !important;
    height: 100px;
}
.aui-content {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    word-break: break-all;
}
.pretop-pannel {
    position: relative;
}
.aui-module-bg {
    background-color: #fff;
    border-radius: 10px;
    margin: 10px 10px 0 10px !important;
    padding: 15px 15px !important;
}
.form-address .cu-form-group {
    padding-left: 0;
    padding-right: 0;
    justify-content: left;
}
.cu-form-group {
    background-color: #ffffff;
    padding: 1px 15px;
    display: flex;
    align-items: center;
    min-height: 50px;
    justify-content: space-between;
}
.form-address .cu-form-group .title {
    width: 80px;
    font-size: 14px;
    color: #111;
}

.cu-form-group .title {
    text-align: justify;
    padding-right: 15px;
    font-size: 15px;
    position: relative;
    height: 30px;
    line-height: 30px;
}
.cu-form-group input {
    flex: 1;
    font-size: 14px;
    color: #555;
    padding-right: 10px;
    border: none;
    outline: none;
}
.form-address .cu-form-group+.cu-form-group {
    border-top: none;
}

.cu-form-group.cu-form-select {
    position: relative;
}
.form-address .cu-form-group {
    padding-left: 0;
    padding-right: 0;
    justify-content: left;
}
.form-address .cu-form-group+.cu-form-group {
    border-top: none;
}

.form-address .cu-form-group {
    padding-left: 0;
    padding-right: 0;
    justify-content: left;
}
.aui-content {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    word-break: break-all;
}
.order_productcon.aui-list {
    background-color: transparent;
    border-top: none;
}



.aui-list .aui-list-item {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 15px;
    color: #212121;
    border-bottom: 1px solid #ddd;
    position: relative;
    min-height: 44px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}

.aui-media-list .aui-list-item {
    display: block;
}

.aui-module-bg .aui-list .aui-list-item {
    padding-left: 0;
    border-bottom: none;
}
.order_productcon.aui-list .aui-list-item {
    border-bottom: none;
    background-color: #fff;
}
.order_productcon.aui-list .aui-list-item-media {
    padding-top: 0;
}
.aui-list .aui-list-item-media {
    width: 90px;
    position: relative;
    padding: 10px 0;
    padding-right: 15px;
    display: inherit;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    -webkit-align-items: flex-start;
    align-items: flex-start;
}
.proimg-pan {
    position: relative;
    width: 100%;
    padding-top: 100%;
}
.order_productcon.aui-list.aui-media-list .aui-list-item-inner {
    padding-top: 0;
}
.order_productcon.aui-list .aui-list-item-inner {
    padding-right: 0;
}
.aui-module-bg .aui-media-list .aui-list-item-inner {
    padding-right: 0;
}
.aui-media-list .aui-list-item-inner {
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
}
.aui-list .aui-list-item-media img {
    width: 100%;
    display: block;
}
.proimg-pan .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.aui-media-list-item-inner {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.aui-ellipsis-2 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.aui-ellipsis {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
.aui-margin-t-5 {
    margin-top: 5px!important;
}

.text-price::before {
    content: "¥";
    font-size: 80%;
    margin-right: 2px;
}
.cu-list.menu {
    display: block;
    overflow: hidden;
}

.paytype-pannel .cu-list .cu-item {
    position: relative;
    display: flex;
    padding: 0 15px;
    min-height: 50px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
}
.border-b {
    border-bottom: 1px solid #f5f5f5;
}
.wxpay-icon{
    width: 22px;
    margin-right: 10px;
    img {
        width: 22px;
    }
}
.aui-bar-tab {
    position: fixed;
    top: auto;
    bottom: 0;
    table-layout: fixed;
    background-color: #fff;
    color: #757575;
}
.aui-bar {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    min-height: 50px;
    font-size: 18px;
    text-align: center;
    display: table;
}
.border-t {
    border-top: 1px solid #f5f5f5;
}
.aui-bar-tab .aui-bar-tab-item {
    display: table-cell;
    position: relative;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
}
.aui-text-left {
    text-align: left!important;
}

.aui-margin-l-15 {
    margin-left: 15px!important;
}

.shop .submit {
    margin: 10px;
    height: 40px;
    border-radius: 30px;
    line-height: 40px;
}
.aui-font-size-14 {
    font-size: 14px!important;
}
.radius-30 {
    border-radius: 30px !important;
}
.bg-theme {
    background-color: #ff6d20!important;
    color: #fff!important;
}
</style>
