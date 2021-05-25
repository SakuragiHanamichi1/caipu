import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import VueXAlong from 'vuex-along'

Vue.prototype.$axios = axios;

Vue.use(Vuex)
const moduleA = {
    state: {
        a1: "hello",
        a2: "world",
        isLogin: false,
    },
};

export default new Vuex.Store({

    state: {
        person: [
            {
                name: '小明',
                age: 18
            },
            {
                name: '小东',
                age: 11
            },
            {
                name: '老张',
                age: 28
            },
            {
                name: '小华',
                age: 17
            },
            {
                name: '小文',
                age: 22
            },
            {
                name: '小凯',
                age: 19
            },
        ],
        sort: 1,//0升序1降序,
        un: "",
        up: "",
        arr: [],
        refuseArr: [],
    },
    modules: {
        ma: moduleA,
    },
    plugins: [
        VueXAlong({
            // 设置保存的集合名字，避免同站点下的多项目数据冲突
            name: "hello-vuex-along",
            local: {
                list: ["ma"],
                // 过滤模块 ma 数据， 将其他的存入 localStorage
                isFilter: true,
            },
            session: {
                // 保存模块 ma 中的 a1 到 sessionStorage
                list: ["ma.isLogin"],
            },
        }),
    ],
    getters: {
        sortPerson(state) {
            return [...state.person].sort((p1, p2) => {
                if (state.sort === 0) { // 升序
                    return p1.age - p2.age
                }
                return p2.age - p1.age // 降序
            })
        }
    },
    mutations: {
        // refuse(state) {
        //     this.$axios.get(`http://api.tianapi.com/txapi/hotlajifenlei/index?key=94a42e4bd854acbc453ac22be8eb4d2e`).then(res => {
        //         console.log(res);

        //     })

        // },
        addCount(state) {
            state.sort++
        },
        getinfo(state, { uname, upwd }) {
            console.log(state);
            console.log(state.ma.isLogin);

            // for(let i=0;i<state.arr.length;i++){
            // }
            // var col=JSON.parse(localStorage.getItem("用户信息"))
            // col.findIndex(item=>{
            //     return console.log(item.un==state.un);
            // })
            var name = localStorage.getItem("用户名" + uname,uname)
            var pwd = localStorage.getItem("密码" + upwd,upwd)
            state.un = uname;
            state.up = upwd;
            console.log(name,pwd);
            console.log(uname,upwd);
            
            if (name == uname && pwd == upwd) {
                state.ma.isLogin = true
                console.log("登录成功");
                router.push({ name: 'More' })
            }
        },
        zhuce(state, { uname, upwd }) {
            state.un = uname;
            state.up = upwd;

            // state.arr.push({ un: state.un, up: state.up })

      
            localStorage.setItem("用户名" + uname, uname)
            localStorage.setItem("密码" + upwd, upwd)

            // var col=JSON.parse(localStorage.getItem("用户"))
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
        Start(state) {
            if (state.isLogin) {
                console.log("已登录");

            } else {
                router.push({ name: 'Login' })
                // router.replace({name:'Login'})
            }
        },
        exitlogin(state) {
            console.log(state.isLogin);
            state.ma.isLogin = false
        }
    }
})