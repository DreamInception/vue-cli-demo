import "./login.scss"
import axios from 'axios'
import Hello from '../../components/Hello.vue'
$(function(){
  // var url = '../../../static/json/index.json';
  var url = '/api/userCenter/login';
  new Vue({
    el: "#login",
    data: {
      userName: null
    },
    components: {
      'v-hello': Hello
    },
    methods: {
      requestData: function () {
        var vm = this;
        axios.post(url,{
          responseType: 'json',
        }).then(function (response) {
          if(response.status == 200){
            vm.userName = response.data.data.userName;
          }
        });
      }



    },
    mounted: function () {
      this.requestData();
    }
  });











});
