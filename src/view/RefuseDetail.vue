<template>
  <div class="refusedetail">
    <div class="header">
      <img src="../../public/images/timg2.jpg" alt />

      <div class="content" v-for="item in arr" :key="item.title" v-show="item.title==title">
        <div class="top">
          <div class="left">
            <i class="iconfont" v-if="item.title=='湿垃圾'" style="color: #d6825d;">&#xe622;</i>
            <i class="iconfont" v-if="item.title=='干垃圾'" style="color: #7da0dd;">&#xe604;</i>
            <i class="iconfont" v-if="item.title=='有害垃圾'" style="color: #f47f75;">&#xe605;</i>
            <i class="iconfont" v-if="item.title=='可回收物'" style="color: #62d1b8;">&#xe627;</i>
          </div>
          <div class="right">
            <h2>{{title}}</h2>
            <p>{{item.text}}</p>
          </div>
        </div>

        <div class="Launch">
          <h2>投放要求</h2>
          <div class="item">
            <p v-for="(p,i) in item.requirement" :key="i">
              <i class="iconfont">&#xe62d;</i>
              {{p}}
            </p>
          </div>
        </div>

        <div class="goods">
          <h2>常见物品</h2>
          <div>
            <div class="goods-item" v-for="g in item.goods" :key="g.name">
              <svg class="icon goods-icon" aria-hidden="true">
                <use :xlink:href="g.icon" />
              </svg>
              <p>{{g.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      arr: [
        {
          title: "湿垃圾",
          text:
            "湿垃圾是指日常生活垃圾产生的容易腐烂的生物质废弃物，主要包括:食材废料，剩菜剩饭，过期食品，瓜皮等",
          requirement: [
            "轻投轻放",
            "清洁干燥、避免污染，废纸尽量平整",
            "立体包装请清空内容物，清洁后压扁投放",
            "有尖锐边角的，应包裹后投放"
          ],
          goods: [
            {
              name: "面包",
              icon: "#icon-mianbao"
            },
            {
              name: "水果",
              icon: "#icon-shuiguo"
            },
            {
              name: "饼干",
              icon: "#icon-quqibinggan"
            },
            {
              name: "炸鸡",
              icon: "#icon-mbefengge_zhaji"
            },
            {
              name: "辣椒",
              icon: "#icon-shucai-"
            },
            {
              name: "蔬菜",
              icon: "#icon-shengxian-shucai"
            }
          ]
        },
        {
          title: "干垃圾",
          text:
            "干垃圾即其他垃圾,指除可回收物,有害垃圾，厨余垃圾（湿垃圾)以外的其他生活废物",
          requirement: ["尽量沥干水分", "难以辨别类别的生活垃圾入干垃圾容器内"],
          goods: [
            {
              name: "烟蒂",
              icon: "#icon-xiangyan"
            },
            {
              name: "破碎陶瓷杯",
              icon: "#icon-qitalaji-pojiutaocipin"
            },
            {
              name: "眼镜",
              icon: "#icon-yanjing"
            },
            {
              name: "污损垃圾袋",
              icon: "#icon-laji"
            },
            {
              name: "创可贴",
              icon: "#icon-chuangketie"
            },
            {
              name: "笔",
              icon: "#icon-shengxian-shucai"
            }
          ]
        },
        {
          title: "有害垃圾",
          text:
            "废电池、废灯管、废药品、废油漆及其容器对人体健康或者自然环境造成直接或者潜在危害的生活废弃物",
          requirement: [
            "投放时注意轻放",
            "易破损的请连带包装或包裹后轻放",
            "如易挥发，请密封后轻放"
          ],
          goods: [
            {
              name: "可充电电池",
              icon: "#icon-xudianchidianya"
            },
            {
              name: "过期药物",
              icon: "#icon-yaowan"
            },
            {
              name: "过期指甲油",
              icon: "#icon-meizhuangxilie-"
            },
            {
              name: "药品",
              icon: "#icon-yaopin"
            },
            {
              name: "杀虫剂",
              icon: "#icon-qingjieji"
            },
            {
              name: "体温计",
              icon: "#icon-tiwenji"
            }
          ]
        },
        {
          title: "可回收物",
          text:
            "指费报纸张,废塑料，废玻璃制品,废金属废织物等适宜回收,可循环利用等生活废弃物",
          requirement: [
            "轻投轻放",
            "清洁干燥,避免污染",
            "废纸尽量平整",
            "立体包装请清空内容物，清洁后压扁投放",
            "有尖锐边角的，应包裹后投放"
          ],
          goods: [
            {
              name: "文件夹",
              icon: "#icon-weibiaoti-_huabanfuben"
            },
            {
              name: "公文包",
              icon: "#icon-gongwenbao"
            },
            {
              name: "笔记本",
              icon: "#icon-bijiben_"
            },
            {
              name: "夹子",
              icon: "#icon-jiazi"
            },
            {
              name: "计算器",
              icon: "#icon-jisuanqi"
            },
            {
              name: "耳机",
              icon: "#icon-erji1"
            }
          ]
        }
      ],
      goods: [
        {
          title: "有害垃圾"
        }
      ]
    };
  },
  activated() {
    this.title = this.$route.params.title;
    console.log(this.title);
  }
};
</script>

<style lang="scss" scoped>
.refusedetail {
  display: flex;
  .header {
    position: relative;
    display: flex;
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
    }

    .content {
      position: absolute;
      left: 50%;
      top: 136px;
      transform: translateX(-50%);
      width: 320px;
      padding: 0 12px;
      padding-bottom: 46px;
      // padding-top: 16px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 14px;

      .top {
        display: flex;
        .left {
          display: flex;
          align-items: center;
          i {
            font-size: 72px;
          }
        }

        .right {
          margin-top: 20px;
          letter-spacing: 1px;
          margin-left: 5px;
          h2 {
            margin-bottom: 8px;
            font-weight: bold;
          }

          p {
            font-size: 14px;
            line-height: 18px;
            color: #999;
          }
        }
      }

      .Launch {
        margin-top: 28px;
        h2 {
          font-weight: bold;
          letter-spacing: 1px;
          position: relative;
        }
        h2::after {
          content: "";
          position: absolute;
          top: 11px;
          left: 0;
          width: 25px;
          height: 7px;
          background-color: #38d798;
          z-index: -1;
        }
        p {
          color: #999;
          margin: 22px 0;
          letter-spacing: 1.5px;
          font-size: 14px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          i {
            color: #38d798;
            margin-right: 5px;
            font-size: 12px;
          }
        }
      }

      .goods {
        margin-top: 22px;
        h2 {
          position: relative;
          font-weight: bold;
        }
        h2::after {
          content: "";
          position: absolute;
          top: 11px;
          left: 0;
          width: 25px;
          height: 7px;
          background-color: #38d798;
          z-index: -1;
        }
        & > div {
          display: flex;
          flex-wrap: wrap;
          margin-top: 16px;

          .goods-item {
            flex: 0 0 33.33%;
            text-align: center;
            p {
              margin-top: 16px;
              letter-spacing: 1px;
              color: #888;
              font-size: 14px;
            }
            .goods-icon {
              font-size: 50px;
            }
          }

          .goods-item:nth-child(n + 4) {
            margin-top: 22px;
          }
        }
      }
    }
  }
}
</style>