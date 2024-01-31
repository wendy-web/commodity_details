<template>
<van-popup
    v-model="isShow"
    position="bottom"
    :round="true"
    closeable
    close-icon-position="top-right"
    close-icon="cross"
    @close="closeHandle"
>
    <div class="att-popup-container">
        <div class="att-popup-header" id="defaultSkuInfo">
            <div class="thumb pull-left default-sku-image">
                <img class="default-sku-image" src="http://douyin-h5-shop.oss-cn-shenzhen.aliyuncs.com/file/20231219/77ae0d5d4e82437c9fa70778dadb4b32.png"
            style="border-width:0px;" />
            </div>
            <div class="info pull-left" style="min-height:2.25rem;">
                <!--现金价格-->
                <div class="p_price_1">
                    <span class="aui-font-size-18 text-theme"> <span
                        class="text-price text-theme default-sku-saleprice">0.00</span> </span>

                </div>
                <!--现金价格-->
                <div class="selected color-666" style="margin-top:3px;">
                    已选：<span class="select-attribute-names">
                        黑色不加绒（穿到15度）M码建议80~100斤
                    </span>
                </div>
            </div>
        </div>
        <div class="att-popup-body" id="buySkuInfo">
            <div class="item">
                <!-- 规格 -->
                <div >
                    <div class="spec_pro">
                        <div class="text-muted">规格：</div>
                        <div class="list clearfix">
                            <div
                                v-for="(item, index) in SKUValueList" :key="index"
                                :class="['SKUValueClass', skuIndex == index ? 'active' : '']"
                                @click="skuSelHandle(item, index)"
                            >{{item.text}}</div>

                        </div>
                    </div>
                </div>
                <div >
                    <div class="spec_pro">
                        <div class="text-muted">尺码：</div>
                        <div class="list clearfix">
                            <div
                                v-for="(item, index) in sizeValueList" :key="index"
                                :class="['SKUValueClass', sizeIndex == index ? 'active' : '']"
                                @click="sizeSelHandle(item, index)"
                            >{{item.text}}</div>

                        </div>
                    </div>
                </div>
                <!-- 规格end -->
                <div class="goods-num" id="panelGoogsNum">
                    <div class="text-muted color-111 line-height16">
                        购买数量：
                    </div>
                    <div class="goods-input-box">
                        <div :class="['shopcart-add', (inputValue > 1) ? 'active' : '']" @click="changeHandle(-1)">
                            -
                        </div>
                        <input
                            class="product-buy-number"
                            type="number" id="buyNum" size="10"
                            :value="inputValue"
                            readonly="readonly"
                            min="1"
                        >
                        <div class="shopcart-minus active" @click="changeHandle(1)">
                            +
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="att-popup-footer operbtns" @click="subConfirmHandle">
            <div class="aui-margin-10">
                <div id="buyButton" class="aui-btn aui-btn-block bg-gradient-theme radius-30 text-white aui-font-size-16">确 定
                </div>
            </div>
        </div>
    </div>
</van-popup>
</template>
<script>
    export default {
      props: {
        isShow: {
            type: Boolean,
            default: false
        }
      },
      data() {
        return {
            skuIndex: 0,
            SKUValueList: [
                {
                    id: 0,
                    text: '黑色不加绒（穿到15度）'
                },
                {
                    id: 1,
                    text: '灰色不加绒（穿到15度）'
                },
                {
                    id: 2,
                    text: '黑色薄绒（穿到5度）'
                },
                {
                    id: 3,
                    text: '灰色薄绒（穿到5度）'
                },
                {
                    id: 4,
                    text: '黑色不加绒（穿到15度）'
                },
                {
                    id: 5,
                    text: '黑色厚绒（穿到0度）'
                },
                {
                    id: 6,
                    text: '灰色厚绒（穿到0度）'
                }
            ],
            sizeIndex: 0,
            sizeValueList: [
                {
                    id: 0,
                    text: 'M码建议80~100斤'
                },
                {
                    id: 1,
                    text: 'L码建议100~125斤'
                },
                {
                    id: 2,
                    text: 'XL码建议125~150斤'
                },
                {
                    id: 3,
                    text: '2XL码建议145~160斤'
                },
                {
                    id: 4,
                    text: 'S码建议75~90斤'
                }
            ],
            inputValue: 1
        }
      },
      computed: {
        
      },
      methods: {
        closeHandle() {
            this.$emit('close');
        },
        skuSelHandle(item, index) {
            this.skuIndex = index;
        },
        sizeSelHandle(item, index) {
            this.sizeIndex = index;
        },
        changeHandle(changeNum) {
            if(this.inputValue < 1) return;
            if(changeNum < 0 && this.inputValue <= 1) return;
            this.inputValue += changeNum;
        },
        subConfirmHandle() {
            this.$emit('submit', {
                num: this.inputValue,
                skuItem: this.SKUValueList[this.skuIndex],
                sizeItem: this.sizeValueList[this.sizeIndex]
            })
        }
      },
    }
</script>
<style lang="scss" scoped>
.att-popup-container{
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
    overflow: hidden;
}
.att-popup-container1 {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgb(255,255,255);
    box-shadow: 0 0 20px rgba(0,0,0,.2);
    -webkit-transform: translateY(110%);
    -moz-transform: translateY(110%);
    -ms-transform: translateY(110%);
    -o-transform: translateY(110%);
    transform: translateY(110%);
    -webkit-backface-visibility: hidden;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
    transition-duration: 0.3s;
}
.att-popup-header {
    display: inline-block;
    position: relative;
    padding: 10px 6px 0px 100px;
    width: 72%;
    float: left;
}
.att-popup-header .thumb {
    position: absolute;
    width: 74px;
    height: 74px;
    top: inherit;
    left: 15px;
    margin-right: 6px;
    background-color: rgb(255,255,255);
    border: 1px solid rgb(255,255,255);
    border-radius: 4px;
}
.att-popup-header .thumb img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    padding: 2px;
}
.att-popup-header .info {
    float: left !important;
    padding-top: 10px;
}
.aui-font-size-18 {
    font-size: 18px!important;
}
.text-theme {
    color: #f54319!important;
}
.text-theme {
    color: #f54319!important;
}
.text-price::before {
    content: "¥";
    font-size: 80%;
    margin-right: 2px;
}
.att-popup-header .info .selected {
    font-size: 12px;
    height: 16px;
}
.color-666 {
    color: #666 !important;
}
.att-popup-body {
    width: calc(100% - 30px);
}
.att-popup-body {
    padding: 0 15px 0 15px;
    max-height: 320px;
    overflow-y: scroll;
    display: inline-block;
    float: left;
    -webkit-overflow-scrolling: touch !important;
}
.att-popup-body .item {
    float: left;
    width: 100%;
}
.spec_pro {
    display: inline-block;
    width: 100%;
}
.spec_pro .text-muted:first-child {
}
.spec_pro .text-muted {
    border-top: 1px solid #ededed;
    padding: 15px 0 15px 0;
    font-size: 14px;
    float: left;
    display: inline-block;
    width: 100%;
}
.text-muted {
    color: #333;
}
.spec_pro .list > div.active {
    background-color: #FFF6F3;
    border: 1px #FF6D20 solid;
    color: #FF6D20;
}
.spec_pro .list > div {
    padding: 4.2px 10px;
    border: 1px #F3F4F6 solid;
    margin-right: 15px;
    border-radius: 3px;
    background-color: #F3F4F6;
    margin-bottom: 15px;
    display: inline-block;
    font-size: 12px;
    color: #999;
}
.goods-num {
    border-top: 1px solid #ededed;
    padding: 15px 0 15px 0;
    font-size: 14px;
    float: left;
    display: inline-block;
    width: 100%;
}
.goods-num {
    display: flex;
    float: left;
    width: 100%;
    justify-content: space-between;
}
.goods-input-box {
    border: 1px solid #E6E6E6;
    border-radius: 30px;
    display: flex;
    padding: 4px 7px;
}
.goods-num .shopcart-add {
    background-color: #f3f4f6;
    color: #999;
    line-height: 20px;
}

.shopcart-add, .shopcart-minus {
    font-size: 20px;
    text-align: center;
    width: 25px;
    height: 25px;
    line-height: 25px;
    color: #333;
    display: inline-block;
    float: left;
    border: 1px solid #f3f4f6;
    background-color: #f3f4f6;
    border-radius: 50%;
    &.active {
        background-color: #ff6d20;
        color: #fff;
    }
}
.goods-num #buyNum {
    width: 36px;
    height: 26px;
    float: left;
    text-align: center;
    border-radius: 0 !important;
    border: none;
    font-size: 16px;
}

.shopcart-add, .shopcart-minus {
    font-size: 20px;
    text-align: center;
    width: 25px;
    height: 25px;
    line-height: 25px;
    color: #333;
    display: inline-block;
    float: left;
    border: 1px solid #f3f4f6;
    background-color: #f3f4f6;
    border-radius: 50%;
}
.att-popup-footer {
    float: left;
    width: 100%;
}

.aui-btn, button {
    position: relative;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    font-family: inherit;
    text-decoration: none;
    text-align: center;
    margin: 0;
    background: #ddd;
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;
}
.aui-btn-block {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-bottom: 0;
    font-size: 18px;
}
.bg-gradient-theme {
    background: -webkit-linear-gradient(left,#fbb90b,#ff6d20)!important;
    background: -o-linear-gradient(right,#fbb90b,#ff6d20)!important;
    background: -moz-linear-gradient(right,#fbb90b,#ff6d20)!important;
    background: linear-gradient(to right,#fbb90b,#ff6d20)!important;
    color: #fff!important;
}

</style>
