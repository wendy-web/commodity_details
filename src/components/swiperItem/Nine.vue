<template>
    <div class="page-box">
        <div class="lottie-box">
            <lottie
                :options="defaultOptions"
                :height="lottieHeight"
                :width="lottieWidth"
                v-on:animCreated="handleAnimation"
            />
        </div>

        <van-nav-bar
            v-if="!isMiniprogram"
            title=""
            left-text=""
            right-text=""
            :left-arrow="true"
            :fixed="false"
            :safe-area-inset-top="true"
            :placeholder="true"
            @click-left="onClickLeft"
        />
        <div class="content-box" :class="{ miniprogramTop: isMiniprogram }">
            <!-- logo+音频icon -->
            <div class="logo-box">
                <img
                    class="logo_bfyl"
                    src="@/assets/img/bill/2023/logo_bfyl.png"
                    alt=""
                />
                <img
                    class="icon_audio"
                    :class="{ 'rotate-center': isPlay }"
                    :src="isPlay ? icon_audio_play : icon_audio_pause"
                    alt=""
                    @click="audioPlay"
                />
            </div>
            <!-- 感恩相遇 -->
            <img
                class="ani page_title"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="1s"
                src="@/assets/img/bill/2023/page_9_title.png"
                alt=""
            />
            <!-- 结束语 -->
            <img
                class="ani page_end"
                swiper-animate-effect="fadeIn"
                swiper-animate-duration="1s"
                swiper-animate-delay="2s"
                src="@/assets/img/bill/2023/page_9_end.png"
                alt=""
            />
        </div>
        <!-- 动画结束以后显示的内容 -->
        <div
            class="ani lottie-end-box"
            swiper-animate-effect="fadeIn"
            swiper-animate-duration="1s"
            swiper-animate-delay="2s"
        >
            <img
                class="bg_page_9"
                src="@/assets/img/bill/2023/bg_page_9.png"
                alt=""
            />
            <img
                class="bg_page_9_inner"
                src="@/assets/img/bill/2023/bg_page_9_inner.png"
                alt=""
            />
        </div>
        <div
            class="ani footer-box safe-area"
            swiper-animate-effect="fadeIn"
            swiper-animate-duration="1s"
            swiper-animate-delay="2s"
        >
            <!-- <div @click="downImg" class="btn-save">保存账单</div> -->
            <div @click="initPoster" class="btn-save">保存账单</div>
            <div @click="lookAgain" class="btn-look">
                <span>再看一次</span>
                <van-icon class="arrow-right" name="arrow" color="#e6e6e6" />
            </div>
            <img :src="dataURL" alt="" v-show="!firstFlag" />
        </div>
        <!-- 海报内容 start -->

        <div class="px-posterBox" ref="posterBox">
            <!-- 背景图 -->
            <img
                class="px-bg_page_8"
                src="@/assets/img/bill/2023/bg_loading.jpg"
                style="object-fit: fill"
            />

            <div>
                <!-- logo -->
                <div class="px-logo-box">
                    <img
                        class="px-logo_bfyl"
                        src="@/assets/img/bill/2023/logo_bfyl.png"
                        alt=""
                    />
                </div>

                <!-- 努力的一年 -->
                <img
                    class="px-page_8_title"
                    src="@/assets/img/bill/2023/page_8_title.png"
                    alt=""
                />
                <!-- 遥遥领先 -->
                <div class="px-far-ahead">
                    <span>超过了全市</span>
                    <span class="px-color-orange"
                        >{{ shopReport.topPercent || 0 }}%</span
                    >
                    <span>的店铺</span>
                </div>
                <!-- 累计收益相关····需要判断点击显示隐藏  -->
                <div class="px-total-earn-box px-mt-13">
                    <div class="px-total-earn-item">
                        <img
                            class="px-earn_icon"
                            src="@/assets/img/bill/2023/icon_reward.png"
                            alt=""
                        />
                        <div>
                            <span>累计收益：</span>
                            <span
                                class="px-earn-num"
                                v-if="posterSetting.eye_ljshouyi"
                                >{{ ljshouyi | formatMoney }}</span
                            >
                            <span class="px-earn-num" v-else>{{
                                posterSetting.ljshouyi_eye
                            }}</span>
                            <span class="px-earn-unit">元</span>
                        </div>
                    </div>
                    <div class="px-total-earn-tip-poster">
                        * 累计收益=箱内码活动+消费者促销活动+营销活动<span
                            v-if="shopReport.hsFlag > 0"
                            >+惠商活动</span
                        >
                    </div>
                </div>
                <div class="px-total-earn-box px-mt-7">
                    <div class="px-total-earn-item">
                        <img
                            class="px-earn_icon"
                            src="@/assets/img/bill/2023/icon_exchange.png"
                            alt=""
                        />
                        <div>
                            <span>累计兑奖：</span>
                            <span
                                class="px-earn-num"
                                v-if="posterSetting.eye_ljexc"
                                >{{ ljexc | formatAmount }}</span
                            >
                            <span class="px-earn-num" v-else>{{
                                posterSetting.ljexc_eye
                            }}</span>
                            <span class="px-earn-unit">人</span>
                        </div>
                    </div>
                </div>
                <!-- 累计卡券 -->
                <div class="px-total-earn-box px-mt-19">
                    <div class="px-total-earn-item">
                        <img
                            class="px-earn_icon"
                            src="@/assets/img/bill/2023/icon_coupon.png"
                            alt=""
                        />
                        <div>
                            <span>累计卡券：</span>
                            <span
                                class="px-earn-num"
                                v-if="posterSetting.eye_ljcoupon"
                                >{{ ljcoupon | formatAmount }}</span
                            >
                            <span class="px-earn-num" v-else>{{
                                posterSetting.ljcoupon_eye
                            }}</span>
                            <span class="px-earn-unit">张</span>
                        </div>
                    </div>
                </div>
                <!-- 累计返货 -->
                <div class="px-total-earn-box px-mt-19">
                    <div class="px-total-earn-item">
                        <img
                            class="px-earn_icon"
                            src="@/assets/img/bill/2023/icon_deliver.png"
                            alt=""
                        />
                        <div>
                            <span>累计返货：</span>
                            <span
                                class="px-earn-num"
                                v-if="posterSetting.eye_ljfanhuo"
                                >{{ ljfanhuo | formatAmount }}</span
                            >
                            <span class="px-earn-num" v-else>{{
                                posterSetting.ljfanhuo_eye
                            }}</span>
                            <span class="px-earn-unit">罐</span>
                        </div>
                    </div>
                </div>
                <template v-if="shopReport.hsFlag > 0">
                    <!-- 采购订单 -->
                    <div class="px-total-earn-box px-mt-19">
                        <div class="px-total-earn-item">
                            <img
                                class="px-earn_icon"
                                src="@/assets/img/bill/2023/icon_shop_cart.png"
                                alt=""
                            />
                            <div>
                                <span>采购订单：</span>
                                <span
                                    class="px-earn-num"
                                    v-if="posterSetting.eye_cgorder"
                                    >{{ cgorder | formatAmount }}</span
                                >
                                <span class="px-earn-num" v-else>{{
                                    posterSetting.cgorder_eye
                                }}</span>
                                <span class="px-earn-unit">笔</span>
                            </div>
                        </div>
                    </div>
                    <!-- 采购商品 -->
                    <div class="px-total-earn-box px-mt-19">
                        <div class="px-total-earn-item">
                            <img
                                class="px-earn_icon"
                                src="@/assets/img/bill/2023/icon_buy_good.png"
                                alt=""
                            />
                            <div>
                                <span>采购商品：</span>
                                <span
                                    class="px-earn-num"
                                    v-if="posterSetting.eye_cggood"
                                    >{{ cggood | formatAmount }}</span
                                >
                                <span class="px-earn-num" v-else>{{
                                    posterSetting.cggood_eye
                                }}</span>
                                <span class="px-earn-unit">箱</span>
                            </div>
                        </div>
                    </div>
                    <!-- 累计支付 -->
                    <div class="px-total-earn-box px-mt-19">
                        <div class="px-total-earn-item">
                            <img
                                class="px-earn_icon"
                                src="@/assets/img/bill/2023/icon_buy_good.png"
                                alt=""
                            />
                            <div>
                                <span>累计支付：</span>
                                <span
                                    class="px-earn-num"
                                    v-if="posterSetting.eye_ljpay"
                                    >{{ ljpay | formatMoney }}</span
                                >
                                <span class="px-earn-num" v-else>{{
                                    posterSetting.ljpay_eye
                                }}</span>
                                <span class="px-earn-unit">元</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 海报底部 -->
            <img
                class="px-poster_footer"
                src="@/assets/img/bill/2023/poster_footer.png"
                alt=""
            />
        </div>
        <!-- 海报内容 end -->
    </div>
</template>

<script>
import { closeWebview } from "@/utils/dsBridge";
import { lottieNineData } from "@/assets/lottie/nine/index.js";
import { getLocalStorage,formatAmount } from "@/utils/index";
import { wxShareBridge } from "@/utils/dsBridge.js";
import { mapGetters } from "vuex";
import html2canvas from "html2canvas";
var wx = require("weixin-js-sdk");

export default {
    name: "Nine",
    props: {
        isPlay: {
            type: Boolean,
            default: false,
        },
        swiperIndex: {
            type: Number,
            default: 0,
        },
        swiperLength: {
            type: Number,
            default: 0,
        },
    },
    filters: {
        formatAmount,
        formatMoney(val){
            if(val){
                return formatAmount(val.toFixed(2))
            }
            return 0;
        }
    },
    watch: {
        swiperIndex() {
            setTimeout(() => {
                this.$emit('swiperItemLoaded','swiperItemLoaded_8')
            },3000)   
            if (this.swiperIndex < this.swiperLength - 1) return;
            this.lottiePlay();
        },
    },
    computed: {
        ...mapGetters(["isMiniprogram", "billInfo", "posterSetting"]),
        shopReport() {
            if (this.billInfo.shopReport) {
                return this.billInfo.shopReport;
            }
            return null;
        },
        ljshouyi() {
            let ljshouyi = 0;
            if (this.shopReport.totalAmt) {
                ljshouyi = this.shopReport.totalAmt;
            }
            return ljshouyi;
        },
        ljexc() {
            let ljexc = 0;
            if (this.shopReport.totalExUser) {
                ljexc = this.shopReport.totalExUser;
            }
            return ljexc;
        },
        ljcoupon() {
            let ljcoupon = 0;
            if (this.shopReport.totalTicketNum) {
                ljcoupon = this.shopReport.totalTicketNum;
            }
            return ljcoupon;
        },
        ljfanhuo() {
            let ljfanhuo = 0;
            if (this.shopReport.totalVerifyNum) {
                ljfanhuo = this.shopReport.totalVerifyNum;
            }
            return ljfanhuo;
        },
        cgorder() {
            let cgorder = 0;
            if (this.shopReport.totalOrderQty) {
                cgorder = this.shopReport.totalOrderQty;
            }
            return cgorder;
        },
        cggood() {
            let cggood = 0;
            if (this.shopReport.totalBuyQty) {
                cggood = this.shopReport.totalBuyQty;
            }
            return cggood;
        },
        ljpay() {
            let ljpay = 0;
            if (this.shopReport.totalPayAmt) {
                ljpay = this.shopReport.totalPayAmt;
            }
            return ljpay;
        },
    },
    data() {
        return {
            lottieHeight: "100vh",
            lottieWidth: "100vw",
            imageUrl: "https://www.baidu.com/img/flexible/logo/pc/result@2.png",
            firstFlag: true,
            dataURL: "",
            anim: {},
            defaultOptions: {
                animationData: lottieNineData,
                loop: false,
                autoplay: false,
            },
            icon_audio_play: require("@/assets/img/bill/2023/img_audio_play.png"),
            icon_audio_pause: require("@/assets/img/bill/2023/img_audio_pause.png"),
        };
    },
    created() {},
    activated() {},
    mounted() {},
    deactivated() {},
    beforeDestroy() {},
    methods: {
        onClickLeft() {
            this.$emit("stopAudio");
            window.close();
            // 调用ios方法返回
            closeWebview();
        },
        handleAnimation(anim) {
            this.anim = anim;
        },
        lottiePlay() {
            // 先暂停再播放
            this.anim.stop();
            setTimeout(() => {
                this.anim.play();
            }, 1000);
        },
        audioPlay() {
            this.$emit("audioPlay");
        },
        lookAgain() {
            console.log("再看一次");
            this.$emit("lookAgain");
        },
        downImg() {
            let bill_poster_base64 = getLocalStorage("bill_poster_base64");
            console.log("取本地缓存图片:", bill_poster_base64);
            if (bill_poster_base64) {
                let obj = {
                    type: 4,
                    imgUrl: bill_poster_base64.slice(22),
                };
                const str = JSON.stringify(obj);
                console.log("app 传参:", bill_poster_base64.slice(22));

                wxShareBridge(str);
                // dsBridge.call("getWXShare", str, function(res) {
                // 	console.log(res)
                // })
                if (window.launcher) {
                    // 判断 launcher 对象是否存在
                    // 此处的 launcher 要和 第3步中定义的 launcher 保持一致
                    // JS 调用 Android 的方法
                    window.launcher.getWXShare(str);
                }
                // 微信小程序
                wx.miniProgram.postMessage({
                    data: {
                        imgData: bill_poster_base64, // 刚才拿到的base64 数据
                    },
                });
                // 返回页面才能触发小程序接受参数
                wx.miniProgram.navigateBack();
            }
        },
        initPoster() {
            //为避免出现位置偏移的情况，将滚动条置顶
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            html2canvas(this.$refs.posterBox, { scrollY: 0 }).then((canvas) => {
                let bill_poster_base64 = canvas.toDataURL("image/png");
                console.log("图片信息：", bill_poster_base64);
                if (bill_poster_base64) {
                    let obj = {
                        type: 4,
                        imgUrl: bill_poster_base64.slice(22),
                    };
                    const str = JSON.stringify(obj);
                    wxShareBridge(str);
                    // dsBridge.call("getWXShare", str, function(res) {
                    // 	console.log(res)
                    // })
                    if (window.launcher) {
                        // 判断 launcher 对象是否存在
                        // 此处的 launcher 要和 第3步中定义的 launcher 保持一致
                        // JS 调用 Android 的方法
                        window.launcher.getWXShare(str);
                    }
                    // 微信小程序
                    wx.miniProgram.postMessage({
                        data: {
                            imgData: bill_poster_base64, // 刚才拿到的base64 数据
                        },
                    });
                    // 返回页面才能触发小程序接受参数
                    wx.miniProgram.navigateBack();
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar {
    background-color: transparent;
    z-index: 999;
    .van-icon-arrow-left {
        font-size: 24px;
    }
    .van-icon {
        color: #cecde0;
    }
    .van-nav-bar__text {
        color: #cecde0;
    }
}
/deep/.van-hairline--bottom::after {
    border-bottom: unset;
}
.page-box {
    box-sizing: border-box;
    height: 100%;
    padding-bottom: 28px;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .lottie-box {
        position: absolute;
        z-index: -2;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        /deep/.lottie-container {
            position: absolute;
            left: 0px;
            right: 0px;
            width: 100%;
            bottom: 0px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
    .logo-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo_bfyl {
            width: 110px;
            height: 31px;
        }
        .icon_audio {
            width: 25px;
            height: 25px;
        }
    }

    .content-box {
        padding: 0 21px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        position: relative;
        z-index: 1;
        flex: 1;
        .page_title {
            margin-top: 35px;
            width: 169px;
            height: 26px;
        }
        .page_end {
            margin-top: 35px;
            width: 169px;
            height: 181px;
        }
    }
    .miniprogramTop {
        padding-top: 20px;
    }
    .footer-box {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 18px;
        .btn-save {
            width: 270px;
            height: 48px;
            background: linear-gradient(0deg, #eb0000, #fc3c3c 50%, #f17259);
            border: 1px solid #fbcfa0;
            border-radius: 25px;
            box-shadow: 0px 2px 10px 0px #ffffff inset;
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #ffffff;
        }
        .btn-look {
            margin-top: 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .arrow-right {
                margin-left: 2px;
            }
        }
    }
    .lottie-end-box {
        position: absolute;
        z-index: -2;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .bg_page_9 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -3;
        }
        .bg_page_9_inner {
            width: 375px;
            height: 402px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: -2;
        }
    }
}
.px-posterBox {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 375px;
    // z-index: 999;
    height: 100%;
    box-sizing: border-box;
    z-index: -999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background-color: #0f1c47;
    .px-bg_page_8 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0px;
        width: 375px;
        height: 100%;
        z-index: -2;
    }
    .px-page_8_title {
        margin-left: 20px;
        margin-top: 30px;
        width: 258px;
        height: 25px;
    }
    .px-logo-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 54px;
        .px-logo_bfyl {
            width: 110px;
            height: 31px;
        }
    }
    .px-logo-box,
    .px-total-earn-item,
    .px-far-ahead {
        padding: 0 10px 0 20px;
    }
    .px-far-ahead {
        font-size: 26px;
        font-family: Source Han Sans SC, Source Han Sans SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #cfcdd3;
        letter-spacing: 1px;
        margin-top: 14px;
    }
    .px-color-orange {
        color: #f26d00;
    }
    .px-mt-7 {
        margin-top: 7px;
    }
    .px-mt-13 {
        margin-top: 13px;
    }
    .px-mt-14 {
        margin-top: 14px;
    }
    .px-mt-19 {
        margin-top: 19px;
    }
    .px-total-earn-box {
        box-sizing: border-box;
        font-family: Source Han Sans SC, Source Han Sans SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #cfcdd3;
        letter-spacing: 0.51px;
        .px-total-earn-item {
            font-size: 16px;
            display: flex;
            align-items: center;
        }
        .px-total-earn-tip-poster {
            padding-left: 52px;
            opacity: 0.39;
            font-size: 10px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #ffffff;
        }
        .px-earn_icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        .px-earn-num {
            font-size: 16px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #f26d00;
            letter-spacing: 0.51px;
        }
        .px-earn-unit {
            font-size: 14px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #a6a5b5;
            letter-spacing: 0.42px;
            margin-left: 4px;
            margin-right: 4px;
        }
    }

    .px-poster_footer {
        width: 375px;
        height: 300px;

    }
}
</style>
