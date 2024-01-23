<template>
    <div class="page-box">
        <div class="lottie-box">
            <lottie
                :options="defaultOptions"
                :height="lottieHeight"
                :width="lottieWidth"
                @animCreated="handleAnimation"
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
            <!-- 收获的一年 -->
            <img
                class="page_4_title ani"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="1.2s"
                src="@/assets/img/bill/2023/page_4_title.png"
                alt=""
            />
            <div
                class="ani total-earn"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="2.2s"
            >
                累计收益合计
            </div>

            <div
                class="ani mt-5"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="3.2s"
            >
                <span class="total-earn-num">{{
                    shopReport.totalIncomeAmt | formatMoney
                }}</span>
                <span class="total-earn-unit">元</span>
            </div>
            <!-- 饼图 -->
            <div
                class="ani pie-box"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="4.2s"
            >
                <!-- <canvas
                    id="pieContainer"
                    style="width: 100%; height: 100%"
                ></canvas> -->
                <div id="echart-pie" class="px-echart-pie"></div>
            </div>
            <!-- 商品奖励 -->
            <div
                class="ani reward-tips"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="5.2s"
            >
                *商品奖励收益=1元换购+兑换券+活动券+折扣券
            </div>
            <!-- 收入最多的月份 -->
            <div
                class="ani reward-max"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="6.2s"
            >
                <span>收益最多的是</span>
                <span class="month">{{ shopReport.maxIncomeMonth }}</span>
                <span>月份，累计获得收益</span>
            </div>

            <div
                class="ani mt-5"
                swiper-animate-effect="fadeInUp"
                swiper-animate-duration="1s"
                swiper-animate-delay="7.2s"
            >
                <span class="total-earn-num">{{
                    shopReport.maxMonthIncome | formatMoney
                }}</span>
                <span class="total-earn-unit">元</span>
            </div>
            <!-- 固定箭头 -->
            <img
                v-if="swiperItemLoaded_3"
                class="icon_arrow_up slide-in-bottom"
                src="@/assets/img/bill/2023/icon_arrow_up.png"
                alt=""
            />
        </div>
    </div>
</template>

<script>
import { closeWebview } from "@/utils/dsBridge";
import { formatAmount } from "@/utils/index";
import { lottieFourData } from "@/assets/lottie/four/index.js";
import { mapGetters } from "vuex";
// 按需引入echarts
import * as echarts from "echarts/core";
import { TitleComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([TitleComponent, PieChart, CanvasRenderer, LabelLayout]);
export default {
    name: "Four",
    props: {
        isPlay: {
            type: Boolean,
            default: false,
        },
        swiperIndex: {
            type: Number,
            default: 0,
        },
        swiperItemLoaded_3: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        swiperIndex() {
            setTimeout(() => {
                this.$emit("swiperItemLoaded");
            }, 6000);
        },
    },
    computed: {
        ...mapGetters(["isMiniprogram", "billInfo"]),
        shopReport() {
            if (this.billInfo.shopReport) {
                return this.billInfo.shopReport;
            }
            return null;
        },
    },
    data() {
        return {
            lottieHeight: "100vh",
            lottieWidth: "100vw",
            anim: {},
            defaultOptions: { animationData: lottieFourData },
            manyDay: "2222",
            icon_audio_play: require("@/assets/img/bill/2023/img_audio_play.png"),
            icon_audio_pause: require("@/assets/img/bill/2023/img_audio_pause.png"),
        };
    },
    filters: {
        formatAmount,
        formatMoney(val) {
            if (val) {
                return formatAmount(val.toFixed(2));
            }
            return 0;
        },
    },
    created() {},
    activated() {},
    mounted() {
        this.$nextTick(() => {
            this.initEchartPie();
        });
    },
    deactivated() {},
    beforeDestroy() {},
    methods: {
        onClickLeft() {
            this.$emit("stopAudio");
            window.close();
            // 调用ios方法返回
            closeWebview();
        },
        handleAnimation: function (anim) {
            this.anim = anim;
        },
        audioPlay() {
            this.$emit("audioPlay");
        },
        // 初始化echart
        initEchartPie() {
            var dom = document.getElementById("echart-pie");
            var myChart = echarts.init(dom, null, {
                renderer: "canvas",
                useDirtyRect: false,
            });
            var option;
            let {
                redpacketIncomeAmt,
                cashticketIncomeAmt,
                warerewardIncomeAmt,
            } = this.shopReport;
            var data = [
                // { name: "表象与本质", value: 0.5 },
            ];
            if (warerewardIncomeAmt > 0) {
                data.push({
                    name: "商品奖励收益",
                    value: warerewardIncomeAmt.toFixed(2),
                });
            }
            if (cashticketIncomeAmt > 0) {
                data.push({
                    name: "现金券收益",
                    value: cashticketIncomeAmt.toFixed(2),
                });
            }
            if (redpacketIncomeAmt > 0) {
                data.push({
                    name: "红包收益",
                    value: redpacketIncomeAmt.toFixed(2),
                });
            }
            option = {
                title: {
                    text: "",
                    left: "center",
                    textStyle: {
                        color: "#999",
                        fontWeight: "normal",
                        fontSize: 14,
                    },
                },
                color: ["#987344", "#295877", "#a61919"],
                series: [
                    {
                        type: "pie",
                        data: data,
                        radius: [40, 60],
                        height: "100%",
                        // left: "center",
                        width: "100%",
                        itemStyle: {
                            borderColor: "",
                            borderWidth: 0,
                        },
                        label: {
                            alignTo: "edge",
                            formatter: "{name|{b}}\n{time|{c} 元}",
                            minMargin: 5,
                            edgeDistance: 10,
                            lineHeight: 25,
                            rich: {
                                name: {
                                    color: "#ffffff",
                                },
                                time: {
                                    fontSize: 14,
                                    color: "inherit",
                                },
                            },
                        },
                        labelLine: {
                            length: 15,
                            length2: 0,
                            maxSurfaceAngle: 80,
                        },
                        labelLayout: function (params) {
                            const isLeft =
                                params.labelRect.x < myChart.getWidth() / 2;
                            const points = params.labelLinePoints;
                            // Update the end point.
                            points[2][0] = isLeft
                                ? params.labelRect.x
                                : params.labelRect.x + params.labelRect.width;
                            return {
                                labelLinePoints: points,
                            };
                        },
                    },
                ],
            };
            console.log("initEchartPie:", option);
            option && myChart.setOption(option);
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
    position: relative;
    z-index: 10;
    overflow: hidden;
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
        background-color: #09132e;
    
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
        z-index: 10;
        .page_4_title {
            margin-top: 35px;
            width: 284px;
            height: 25px;
        }
        .total-earn {
            font-size: 26px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #cfcdd3;
            letter-spacing: 0.78px;
            margin-top: 10px;
        }
        .total-earn-num {
            font-size: 30px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #f26d00;
            letter-spacing: 0.9px;
        }
        .total-earn-unit {
            font-size: 17px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #a6a5b5;
            letter-spacing: 0.51px;
        }
        .pie-box {
            width: 100%;
            height: 220px;
            // height: auto;
            box-sizing: border-box;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .reward-tips {
            font-size: 11px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #a6a5b5;
            letter-spacing: 0.33px;
        }
        .reward-max {
            font-size: 18px;
            font-family: Source Han Sans SC, Source Han Sans SC-Medium;
            font-weight: 500;
            text-align: left;
            color: #cfcdd3;
            letter-spacing: 0.54px;
            margin-top: 14px;
            .month {
                color: #f26d00;
            }
        }
    }
    .miniprogramTop {
        padding-top: 20px;
    }

    .icon_arrow_up {
        width: 12px;
        height: 29px;
        position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 10;
    }
    .slide-in-bottom {
        -webkit-animation: slide-in-bottom 1.5s infinite;
        animation: slide-in-bottom 1.5s infinite;
    }
}
.mt-15 {
    margin-top: 15px;
}
.mt-5 {
    margin-top: 5px;
}
.px-echart-pie {
    width: 100%;
    height: 300px;
}
</style>
