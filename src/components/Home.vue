<template>
  <van-pull-refresh class="van-pull" v-model="isLoading" @refresh="onRefresh">
    <div class="home">
      <!-- <input type="text" placeholder="搜索..." /> -->
      <div class="search">
        <div>
          <van-icon name="chat-o" badge="9" />
        </div>
        <div>
          <input
            v-model.trim="value"
            placeholder="请输入搜索关键词"
            @input="inputHandel"
            ref="getValue"
            @click="ToSearch"
            @blur="Leave"
          />
        </div>
        <div>
          <span @click="Search">搜索</span>
        </div>
      </div>
      <!-- <ul>
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
      </ul> -->
      <div class="search-box" v-show="ShowSearch">
        <!-- <van-loading color="#1989fa" v-show="loading"/> -->

        <ul>
          <div>
            <h2 v-show="historyShow">历史搜索</h2>
          </div>
          <li v-for="(item, index) in searchList" :key="index">{{ item }}</li>
        </ul>
      </div>

      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in swiperImg" :key="index">
          <img v-lazy="image.d.i" />
        </van-swipe-item>
      </van-swipe>

      <div class="classification">
        <h2 @click="setStateCount">热门活动</h2>
        <!-- {{ sort }} -->
        <van-swipe
          :loop="false"
          :width="300"
          :height="160"
          :show-indicators="false"
        >
          <div v-for="(hot, h) in hot.events" :key="h">
            <van-swipe-item>
              <img :src="hot.image" alt />
            </van-swipe-item>
            <p>{{ hot.name }}</p>
          </div>
        </van-swipe>
      </div>

      <!-- <div>
        <div v-for="(image,index) in swiperImg" :key="index">{{image.d.i}}</div>
      </div>-->
      <div class="recommend">
        <h2>每日推荐</h2>
        <div
          class="recommend-box"
          v-for="(item, index) in TodayDemo"
          :key="index"
          @click="ToMenuDtails(item.r.id)"
        >
          <div class="title">
            <img :src="item.a.p" alt />
            <h2>{{ item.r.an }}</h2>
            <span>Lv.{{ item.r.a.lvl }}</span>
          </div>
          <div class="content">
            <h2>{{ item.n }}</h2>
            <img :src="item.r.img" alt />
            <p>{{ item.recommend_label }} ID:{{ item.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  data() {
    return {
      count: 0,
      ShowSearch: false,
      isLoading: false,
      value: "",
      list: [],
      swiperImg: [],
      today: [],
      hot: [],
      loading: true,
      historyShow: true,
    };
  },
  created() {
    this.GetDataServe();
  },
  activated() {
    this.GetDataServe();
  },
  methods: {
    setStateCount() {
      //触发mutation必须使用$store所提供的commit方法提交一次mutation
      //commit方法接收两个参数参数一需要触发mutation的同名字符串参数二载荷
      this.$store.commit("addCount");
    },
    GetDataServe() {
      this.$axios
        .get(
          "http://120.55.28.235/public/getDifferentdataList.shtml?machine=595c6d26e89da93f055cbd6c8aca3cec&appid=cn.ecookxuezuofan&ids=60638,60637,60636,60623,60622,60621,60620,60619,60618,60617"
        )
        .then((res) => {
          console.log(res.data);
          this.menulist = res.data.list;
        });

      this.$axios
        .get("/home")
        .then((res) => {
          console.log(res.data);
          // console.log(this.today);
          this.today = res.data.result.features_list.list;
          this.today.splice(0, this.today.length);
          // console.log(res.data.result.features_list.list);

          let lt = res.data.result.features_list.list.length;
          for (let i = 0; i < this.today.length; i++) {
            // console.log(i);
            this.today.push(lt[i].r);
          }
          this.today.shift();
          this.today = [...new Set(this.today)];

          // console.log(res.data.result.header.dsps);
          this.swiperImg = res.data.result.header.dsps;
          // console.log(this.swiperImg);
          this.hot = res.data.result.header.hot_events;
          // console.log(this.today);
          
        })
        .catch(function (err) {
          console.log(err);
        });
      // var url = this.HOME + '/foodsApi/home';  //HOME变量为已挂载的可跨域域名，这里将其拼接完，成为一个完整路径
      // this.$axios({  //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
      //   method: 'get',
      //   url: url,
      //   data: {feedType: 1, page: 1, pagesize: 10}
      // }).then(function (res) {
      //   console.log(res);
      // }).catch(function (err) {
      //   console.log(err);
      // })
    },
    tovideo() {
      // console.log(1111)
      this.$router.push({ name: "VideoMenu" });
    },
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
        this.GetDataServe();
      }, 1000);
    },
    ToSearch() {
      console.log(1);
      // this.$nextTick(() => {
      //   //正确写法
      //   this.ShowSearch = true;
      //   this.historyShow = true;
      // });
      this.$router.push({ name: "SearchList" });
    },
    Leave() {
      this.ShowSearch = false;
      this.list.splice(0, this.list.length);
      // this.value=""
    },
    onSearch(val) {
      console.log(val);
    },
    // 搜索列表
    inputHandel(val) {
      if (val.length != 0) {
        this.ShowSearch = true;
      } else {
        this.ShowSearch = false;
      }
      // console.log(val);

      // if(this.list.length==0){
      //   this.loading=false
      // }else{
      //   this.loading=true

      // }
      this.$axios.get(`/recipe/list?keyword=${val}`).then((res) => {
        console.log(res.data.result);

        res.data.result.list.forEach((element) => {
          // console.log(element.r.n);
          this.list.push(element.r.n);
        });
      });
    },
    // 跳转菜谱详情
    ToMenuDtails(id) {
      this.$router.push({ name: "MenuDetails", params: { id: id } });
      console.log(id);
    },
    Search() {
      // this.$router.push({ name: "SearchList", params: { id: id } });
      //  console.log(this.$refs.history.value);
    },
  },
  computed: {
    searchList: function () {
      return this.list.filter((text) => {
        return text.match(this.value);
      });
    },
    TodayDemo: function () {
      return this.today;
    },
    ...mapState(["sort"]),
  },
};
</script>

<style lang="scss" scoped>
.home {
  // .van-pull {
  //   height: 100%;
  // }
  padding: 0 5px;
  padding-top: 8px;
  padding-bottom: 46px;
  box-sizing: border-box;
  .search {
    display: flex;
    & > div {
      flex: 1;
    }
    & > div:nth-of-type(1),
    & > div:nth-of-type(3) {
      flex: 0 0 12%;
      margin: auto;
      text-align: center;
    }

    input {
      width: 100%;
      border: 0px;
      padding: 4px 0;
      padding-left: 14px;
      box-sizing: border-box;
      border-radius: 6px;
      background-color: #f7f8fa;
    }
    input::placeholder {
      font-size: 13px;
      color: #c8c9cc;
    }
  }
  .my-swipe {
    margin-top: 16px;
    border-radius: 6px;
    height: 200px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      // line-height: 150px;
      text-align: center;
      // background-color: #39a9ed;
      font-size: 0;
      width: 100%;
      padding-bottom: 100px;
      img {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }

  .van-search {
    padding: 0;

    .van-search__content {
      border-radius: 18px;
    }
  }

  .search-box {
    position: relative;
    height: 100%;

    & > ul {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      height: 300px;
      width: 100%;
      overflow: auto;
      background-color: pink;
    }
  }

  & > input {
    width: 100%;
    border-radius: 18px;
    outline: none;
    border: 0;
    background-color: #f7f7f7;
    padding: 8px 0;
    padding-left: 18px;
    box-sizing: border-box;
  }

  & > input::placeholder {
    color: #ababab;
  }

  .classification {
    margin-top: 20px;
    h2 {
      margin-bottom: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      font-size: 18px;
    }
    .van-swipe {
      padding-bottom: 27px;
      box-sizing: border-box;
    }
    .van-swipe-item {
      font-size: 0;

      img {
        width: 100%;
        object-fit: cover;
        padding: 0 5px;
        border-radius: 25px;
        box-sizing: border-box;
      }
    }
    p {
      font-size: 14px;
      margin-top: 12px;
      letter-spacing: 1px;
    }
  }

  .recommend {
    margin-top: 33px;

    & > h2 {
      font-weight: bold;
      margin-bottom: 18px;
      margin-top: 22px;
      letter-spacing: 2px;
      font-size: 18px;
    }

    .recommend-box {
      margin-bottom: 35px;
      .title {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        h2 {
          color: #0d0d0d;
          font-size: 14px;
          margin: 0 8px;
          letter-spacing: 1px;
        }

        span {
          display: flex;
          color: #dbbf76;
          font-size: 12px;
          font-weight: 600;
          font-style: italic;
        }
      }

      .content {
        img {
          width: 100%;
          object-fit: cover;
          border-radius: 14px;
        }

        h2 {
          margin: 13px 0;
          font-weight: bold;
          line-height: 20px;
        }

        p {
          color: #a2a2a2;
          font-weight: 400;
          margin-top: 8px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
