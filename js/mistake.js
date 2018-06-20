//  var app = new Vue({
//     el: '#body',      //div的id
//      data: {
//          libraryInfo: "" ,
//          resData:"",
//          jsonpUrl:"https://api.douban.com/v2/movie/in_theaters?count=2"
//      },
//      created: function(){
//      	 this.$http.jsonp(this.jsonpUrl).then( function(res){  
//        	console.log(res);  
//       	 this.$set('resData',res);  
//      }
//      
//      
//
//	
//
//
//
//
////		function () { //created方法，页面初始调用
////          var url = "";
////          this.$jsonp(url).then(function (data) {   //ajax请求封装
////              var json = data.bodyText;
////              var usedData= JSON.parse(json);
////              //我的json数据参考下面
////              this.libraryInfo = usedData["libraryBooks"];
////          }, function (response) {     //返回失败方法调用，暂不处理
////              console.info(response);
////          })
////      }
//      
//      
//      
//      
//      
// 	}); 



///////////////////////////////////////////////////////////////////////////////
// Vue.component('showlis', {
// 	template: `
// 						
// 									<div class="col-md-6" @mouseover.stop="h1($event)" @mouseleave.stop="h0($event)" >							
// 										<img :src="{iteam.images.medium}" alt="..." class="sl_img">
// 										<span>{{todo.title}}
// 											<br>
// 											<lx>
// 												类型 ： {{todo.genres}}<br>
// 												上映：{{todo.year}}<br>
// 												得分：{{todo.rating.average}}<br>
// 											</lx>
// 										</span>
// 										
// 									</div>
// 								`,
// 	props: ['todo'],
// 	data: function () {
// 	    return {
// 	     sjsl1 = app.sjsl
// 	}
// 		},
// 	
// 	
// 	methods:{
// 		h1: function(e) {
// 			this.flag = 1;
// 			e.currentTarget.style.backgroundColor = "pink";
// 			e.currentTarget.children[1].className = "mask"
// 			e.currentTarget.children[1].children[1].style.display = "block"
// 			console.log()
// 		},
// 		h0: function(e) {
// 			this.flag = 0;
// 			e.currentTarget.style.backgroundColor = "yellow";
// 			e.currentTarget.children[1].className = ""
// 			e.currentTarget.children[1].children[1].style.display = "none"
// 		},
// 	
// },
// 
// })

//var loading ={
//	props: ['iteam'],
//	template: '<span id="loading" v-if="iteam == [] ">loading......</span>',
//};