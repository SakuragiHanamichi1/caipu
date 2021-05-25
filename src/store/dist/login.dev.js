"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("../router/index"));

var _vuexAlong = _interopRequireDefault(require("vuex-along"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

_vue["default"].prototype.$axios = _axios["default"];

_vue["default"].use(_vuex["default"]);

var moduleA = {
  state: {
    a1: "hello",
    a2: "world",
    isLogin: false
  }
};

var _default = new _vuex["default"].Store({
  state: {
    person: [{
      name: '小明',
      age: 18
    }, {
      name: '小东',
      age: 11
    }, {
      name: '老张',
      age: 28
    }, {
      name: '小华',
      age: 17
    }, {
      name: '小文',
      age: 22
    }, {
      name: '小凯',
      age: 19
    }],
    sort: 1,
    //0升序1降序,
    un: "",
    up: "",
    arr: [],
    refuseArr: []
  },
  modules: {
    ma: moduleA
  },
  plugins: [(0, _vuexAlong["default"])({
    // 设置保存的集合名字，避免同站点下的多项目数据冲突
    name: "hello-vuex-along",
    local: {
      list: ["ma"],
      // 过滤模块 ma 数据， 将其他的存入 localStorage
      isFilter: true
    },
    session: {
      // 保存模块 ma 中的 a1 到 sessionStorage
      list: ["ma.isLogin"]
    }
  })],
  getters: {
    sortPerson: function sortPerson(state) {
      return _toConsumableArray(state.person).sort(function (p1, p2) {
        if (state.sort === 0) {
          // 升序
          return p1.age - p2.age;
        }

        return p2.age - p1.age; // 降序
      });
    }
  },
  mutations: {
    // refuse(state) {
    //     this.$axios.get(`http://api.tianapi.com/txapi/hotlajifenlei/index?key=94a42e4bd854acbc453ac22be8eb4d2e`).then(res => {
    //         console.log(res);
    //     })
    // },
    addCount: function addCount(state) {
      state.sort++;
    },
    getinfo: function getinfo(state, _ref) {
      var uname = _ref.uname,
        upwd = _ref.upwd;
      console.log(state);
      console.log(state.ma.isLogin); // for(let i=0;i<state.arr.length;i++){
      // }
      // var col=JSON.parse(localStorage.getItem("用户信息"))
      // col.findIndex(item=>{
      //     return console.log(item.un==state.un);
      // })

      var name = localStorage.getItem("用户名" + uname, uname);
      var pwd = localStorage.getItem("密码" + upwd, upwd);
      state.un = uname;
      state.up = upwd;
      console.log(name, pwd);
      console.log(uname, upwd);

      if (name == uname && pwd == upwd) {
        state.ma.isLogin = true;
        console.log("登录成功");

        _index["default"].push({
          name: 'More'
        });
      }
    },
    zhuce: function zhuce(state, _ref2) {
      var uname = _ref2.uname,
        upwd = _ref2.upwd;
      state.un = uname;
      state.up = upwd; // state.arr.push({ un: state.un, up: state.up })

      localStorage.setItem("用户名" + uname, uname);
      localStorage.setItem("密码" + upwd, upwd); // var col=JSON.parse(localStorage.getItem("用户"))

      console.log(state.arr);
      /*  var col = JSON.parse(localStorage.getItem("用户信息"));
        for (let i = 0; i < col.length; i++) {
            console.log(col[i].un);
                    if (uname != col[i].un) {
                    return;
            } else {
                console.log("已被注册");
                }
        }*/
    },
    Start: function Start(state) {
      if (state.isLogin) {
        console.log("已登录");
      } else {
        _index["default"].push({
          name: 'Login'
        }); // router.replace({name:'Login'})

      }
    },
    exitlogin: function exitlogin(state) {
      console.log(state.isLogin);
      state.ma.isLogin = false;
    }
  }
});

exports["default"] = _default;