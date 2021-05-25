"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _axios = _interopRequireDefault(require("axios"));

var _vant = _interopRequireDefault(require("../vant.config"));

var _login = _interopRequireDefault(require("../src/store/login"));

var _index = _interopRequireDefault(require("./router/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import VueAxios from 'vue-axios'
_vue["default"].config.productionTip = false;
_vue["default"].prototype.$axios = _axios["default"]; // Vue.prototype.HOME = '/api' 

_axios["default"].defaults.baseURL = '/api';

_vue["default"].use(_vant["default"]);

new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  router: _index["default"],
  store: _login["default"]
}).$mount('#app');