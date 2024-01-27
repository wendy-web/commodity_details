<template>
<div class="page-box" id="invite-box">
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
    <div class="content-box safe-area" ref="inviteBox">
        666
    </div>
</div>
</template>

<script>
import { getNavbarData } from "@/utils/xhNavbar.js";
import VueQr from "vue-qr";
export default {
    name: "ZXInvite",
    computed: {
    },
    data() {
        return {
            nav_title: "确认订单",
            screenHeight: 0, //屏幕高度
            posterHeight: 0, //海报的高度
            shareBoxHeight: 0, //分享弹窗的高度
            isScroll: false,
            navHeight: 0,
        };
    },
    components: {
        VueQr,
    },
    created() {
        /*导航栏高度*/
        getNavbarData().then((res) => {
            console.log("导航栏高度：", res);
            let { screenHeight, navBarHeight } = res;
            this.screenHeight = screenHeight - navBarHeight;
            this.navHeight = navBarHeight;
        });
    },
    mounted() {
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
            window.close();
            // 调用ios方法返回
            closeWebview();
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
    // background-color: transparent;
    z-index: 999;

    .van-icon {
        color: #333333;
    }

    .van-icon-arrow-left {
        font-size: 24px;
    }

    .van-nav-bar__text {
        color: #333333;
    }
}

.navbar-bg-color {
    background-color: #ffffff;
}

/deep/.van-share-sheet__options {
    justify-content: center;
}

.page-box {
    box-sizing: border-box;
    // background-color: #f5f7fa;
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
.content-box {
    position: relative;
    flex: 1;
    flex-shrink: 0;
    overflow: scroll;
}
.banner-box {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    position: relative;
    top: 0;
    .banner_invite {
        width: 375px;
        height: 358px;
    }
}

.flex-row {
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon_bar_left {
    width: 94px;
    height: 16px;
    margin-right: 8px;
}

.invite-title {
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #6f0203;
}

.icon_bar_right {
    width: 94px;
    height: 16px;
    margin-left: 8px;
}

.invite-box {
    box-sizing: border-box;
    margin: 16px;

    .invite-item {
        position: relative;
        z-index: 1;
        padding: 20px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .qrcode-box {
            margin: 0 auto;
            box-sizing: border-box;
            position: relative;
            z-index: 1;

            .img-qrcode {
                box-sizing: border-box;
                width: 150px;
                height: 150px;
                border: 0.5px solid #e1e1e1;
                // background-color: tan;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                .icon_gift {
                    width: 30px;
                    height: 30px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
            }

            .qrcode-border {
                width: 144px;
                height: 152px;
                opacity: 0.5;
                border: 0.5px solid #e3ae8b;
                position: absolute;
                z-index: -1;
                bottom: -10px;
                right: -10px;
            }
        }

        // 背景
        .bg_invite {
            width: 100%;
            height: 389px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .btn-invite {
            width: 198px;
            height: 45px;
            background: #f3242a;
            border-radius: 26px;
            font-size: 16px;
            font-family: HONOR Sans CN, HONOR Sans CN-Black;
            font-weight: 900;
            text-align: center;
            color: #ffffff;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 34px;
        }
    }
}

.invite-subtitle {
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #333333;
}

.mt-72 {
    margin-top: 36px;
}

.icon_greybar_left {
    width: 86px;
    height: 10px;
    margin-right: 8px;
}

.icon_greybar_right {
    width: 86px;
    height: 10px;
    margin-left: 8px;
}

.step-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;

    .step-item {
        position: relative;
        z-index: 1;
        font-size: 13px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: center;
        color: #333333;

        .icon_step {
            width: 20px;
            height: 20px;
            margin-bottom: 8px;
        }

        .icon_num {
            width: 40px;
            height: 42px;
            // opacity: 0.04;
            position: absolute;
            z-index: -1;
            top: 5px;
            right: 0px;
        }

        .icon_arrow_right {
            width: 11px;
            height: 11px;
            position: absolute;
            top: 5px;
            right: -18px;
        }
    }
}

.faq-box {
    background: #ffffff;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 20px 13px;
    margin: 0 16px;

    .img-park-box {
        margin-top: 16px;
        margin-bottom: 23px;
        justify-content: space-between;
    }

    .img_park {
        width: 151px;
        height: 72px;
    }

    .faq-title {
        position: relative;
        z-index: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #333333;
        margin: 22px 0 8px 10px;
    }

    .faq-title::before {
        content: "";
        width: 3px;
        height: 15px;
        background: #f3242a;
        border-radius: 2px;
        position: absolute;
        left: -9px;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }

    .faq-subtitle {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #666666;
    }
}

// 报名成功弹窗 start
.pop-box {
    box-sizing: border-box;
    width: 311px;
    min-height: 190px;
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .pop-title {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Semibold;
        font-weight: 600;
        text-align: center;
        color: #333333;
        margin-top: 37px;
    }

    .pop-tips {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: center;
        color: #333333;
        margin-top: 10px;
    }

    .btn-iknow {
        width: 236px;
        height: 40px;
        background: #f3242a;
        border-radius: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Semibold;
        font-weight: 600;
        text-align: center;
        color: #ffffff;
        margin-top: 38px;
    }
}

// 报名弹窗 end

// 海报图片弹窗 start
.pop-poster-box {
    z-index: 999999;
    box-sizing: border-box;
    max-height: var(--posterHeight);
    position: fixed;
    bottom: var(--shareBoxHeight);
    left: 29px;
    right: 29px;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .img_poster {
        height: var(--posterHeight);
    }
}

// 海报图片弹窗 end

// 分享面板 start
.pop-share-box {
    max-width: 750px;
    left: 0;
    right: 0;
    margin: 0 auto;
}

// 分享面板 end
</style>
