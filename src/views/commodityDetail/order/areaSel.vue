<template>
<van-popup
    v-model="isShow"
    position="bottom"
    :round="true"
    @close="closeHandle"
>
    <van-area
        title="选择所在地区"
        :area-list="areaLists"
        :value="codeValue"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @cancel="closeHandle"
        @change="changeHandle"
        @confirm="confirmHandle"
    />
</van-popup>
</template>

<script>
import { areaList } from '@vant/area-data';
    export default {
      props: {
        isShow: {
            type: Boolean,
            default: false
        },
        codeValue: {
            type: String,
            default: '110101'
        }
      },
      data() {
        return {
            areaLists: areaList
        }
      },
      computed: {
      },
      methods: {
        closeHandle() {
            this.$emit('close');
        },
        changeHandle() {
        },
        confirmHandle(event) {
            this.$emit('confirm', event)
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
    padding: 10px 6px 40px 100px;
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
