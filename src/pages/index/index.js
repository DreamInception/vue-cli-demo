// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'

var imgPath = require('../../../static/images/logo.png')
Vue.config.productionTip = false
import './index.scss'
import jsonObj from '../../../static/json/index.json'
import {getRequest} from '../../modules/js/public'
/* eslint-disable no-new */
window.onload = function () {
  new Vue({
    el: '#app',
    data: {
      jsonVal : null
    },
    methods: {

    },
    mounted: function () {
      var img=document.createElement("img");
      img.src = imgPath;
      document.getElementsByClassName("main")[0].appendChild(img);
      console.log(getRequest());
    }

  })

}
function isNum (num) {
  return typeof num === 'number'
}
function isString (str) {
  return typeof str === 'string'
}
export {
  isNum,
  isString
}

