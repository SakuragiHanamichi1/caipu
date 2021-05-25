<template>
  <div class="search-demo">
    <div class="header">
      <div>
        <span class="iconfont" @click="goback">&#xe67c;</span>
      </div>
      <div>
        <van-search
          type="text"
          v-model="value"
          placeholder="请搜索"
          @input="inputHandel"
        />
      </div>
      <div><span @click="SearchDemo">搜索</span></div>
    </div>
    <ul>
      <div class="hoisy">
        <h2>
          <div>
            <i class="iconfont">&#xe8ad;</i>
            <span>历史搜索</span>
          </div>
          <span class="iconfont" @click="Clear">&#xe946;</span>
        </h2>
        <ul>
          <li v-for="(list, i) in hoisylist" :key="i" @click="HoisyDemo(list)">
            {{ list }}
          </li>
        </ul>
      </div>
      <div class="hoisy">
        <h2><i class="iconfont">&#xe889;</i> 搜索内容</h2>
      </div>

      <div class="list">
        <li
          v-for="(item, index) in searchList"
          :key="index"
          @click="Getid(item.id, item.title)"
        >
          <i class="iconfont">&#xe634;</i>
          <span>{{ item.title }}</span>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      list: [],
      hoisy: []
    };
  },
  methods: {
    EmptyDemo() {
      this.list.splice(0, this.list.length);
    },
    inputHandel(val) {
      if (val.length != 0) {
        this.ShowSearch = true;
      } else {
        this.ShowSearch = false;
        this.EmptyDemo();
      }
      console.log(val);

      // if(this.list.length==0){
      //   this.loading=false
      // }else{
      //   this.loading=true

      // }
      this.$axios.get(`/recipe/list?keyword=${val}`).then(res => {
        console.log(res.data.result);

        res.data.result.list.forEach(element => {
          // console.log(element.r.n);
          this.list.push({ title: element.r.n, id: element.r.id });
        });
      });
    },
    Getid(id, title) {
      console.log(id);
      this.$router.push({ name: "MenuDetails", params: { id: id } });
      this.hoisy.push(title);
      this.value = "";
    },
    SearchDemo() {
      console.log(this.value);
      this.$router.push({
        name: "SearchResult",
        params: { title: this.value }
      });
      this.hoisy.push(this.value);
      this.value = "";
      this.hoisylist=[...new Set(this.hoisylist)]
    },
    HoisyDemo(val) {
      console.log(val);
      this.$router.push({
        name: "SearchResult",
        params: { title: val }
      });
    },
    Clear() {
      if (this.hoisylist.length != 0) {
        this.hoisylist.splice(0, this.hoisylist.length);
      }
      console.log("清除");
    },
    goback() {
      this.$router.go(-1);
    }
  },
  activated() {
    this.hoisylist();
  },
  computed: {
    searchList: function() {
      return this.list.filter(text => {
        return text.title.match(this.value);
      });
    },
    hoisylist: function() {
      return this.hoisy;
    }
  },
  beforeRouteLeave(to, form, next) {
    next(this.EmptyDemo());
  }
};
</script>

<style lang="scss" scoped>
.search-demo {
  padding: 0 10px;

  padding-top: 14px;
  .header {
    display: flex;

    .van-search {
      padding: 0;
      width: 100%;
      .van-search__content {
        border-radius: 8px;
      }
    }

    & > div {
      display: flex;
      align-items: center;
    }
    & > div:first-of-type,
    & > div:last-of-type {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & > div:first-of-type {
      justify-content: flex-start;
      span {
        font-size: 20px;
      }
    }
    & > div:nth-of-type(2) {
      flex: 0 0 76%;
    }
  }

  & > ul {
    .hoisy {
      margin-top: 20px;

      h2 {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #999999;
        letter-spacing: 1.5px;

        i {
          color: #ffa201;
          font-size: 20px;
          margin-right: 4px;
        }
      }
      h2 > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      & > ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        & > li {
          padding: 8px 12px;
          border-radius: 6px;
          color: #4a4a4a;
          background-color: #f5f5f5;
          margin-right: 14px;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }
      }
    }
    .hoisy:first-child {
      & > h2 {
        justify-content: space-between;
      }
    }
    .list {
      margin-top: 20px;
      li {
        display: flex;
        margin-bottom: 24px;
        color: #4a4a4a;
        i {
          flex: 0 0 7%;
        }
        span {
          flex: 0 0 92%;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
