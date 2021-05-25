"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../components/Home"));

var _List = _interopRequireDefault(require("../components/List"));

var _More = _interopRequireDefault(require("../components/More"));

var _Box = _interopRequireDefault(require("../components/Box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  component: _Box["default"],
  children: [{
    path: '/',
    component: _Home["default"]
  }, {
    path: '/list',
    component: _List["default"]
  }, {
    path: '/more',
    component: _More["default"],
    name: "More"
  }, {
    path: '/refuseclassification/',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../components/RefuseClassification'));
      });
    },
    name: "RefuseClassification"
  } // {
  // 	path: '/subjectfour',
  // 	name: 'SubjectFour',
  // 	// props: true,
  // 	component: () => import('../components/test/SubjectFour')
  // }
  ]
}, {
  path: '/videomenu',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/home/VideoMenu'));
    });
  },
  name: "VideoMenu"
}, {
  path: '/menudetails/:id',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/MenuDetails'));
    });
  },
  name: "MenuDetails"
}, {
  path: '/listdetails/:title/:name',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/ListDetails'));
    });
  },
  name: "ListDetails"
}, {
  path: '/searchlist',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/SearchList'));
    });
  },
  name: "SearchList"
}, {
  path: '/searchresult/:title',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/SearchResult'));
    });
  },
  name: "SearchResult"
}, {
  path: '/indexlogin',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view//login/IndexLogin'));
    });
  },
  name: "IndexLogin",
  children: [{
    path: '/login',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../view//login/Login'));
      });
    },
    name: "Login"
  }, {
    path: '/zhuce',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../view//login/ZhuCe'));
      });
    },
    name: "ZhuCe"
  }]
}, {
  path: '/refusedetail/:title',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../view/RefuseDetail'));
    });
  },
  name: "RefuseDetail"
}];
var router = new _vueRouter["default"]({
  // 初始化VueRouter
  mode: 'history',
  routes: routes,
  linkActiveClass: "actived",
  linkExactActiveClass: "exact-actived"
});
var _default = router;
exports["default"] = _default;