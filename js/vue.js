//Vue.use(VueResource); //这个一定要加上，指的是调用vue-resource.js
//
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

var loading ={
	props: ['iteam'],
	template: '<span id="loading" v-if="iteam == [] ">loading......</span>',
};


//var bus = new Vue();

var app = new Vue({
	el: '#app', //div的id
	data: {
		subjects:[],
		movData: {},
		jsonpUrl: "https://api.douban.com/v2/movie/in_theaters?count=40",
		sub_lenth:"",
		mov_image:"",
		sjlbt:[],
		sjsl:[],
		sjtabs1:[],
		abc:[],
		def:[],
		sjtabs4:[],
		flag: 0 ,
	},
	
	components: {
    'slt': 
    	{	 
    		props:['todo'],
    		template:`

    			<sl @mouseover.stop="h1($event)" @mouseleave.stop="h0($event)" >							
								<img :src="todo.images.medium" alt="..." class="sl_img">
								
										<span>{{todo.title}}
											<br>
											<lx>
												类型 ： {{todo.genres}}<br>
												上映：{{todo.year}}<br>
												得分：{{todo.rating.average}}<br>
											</lx>
										</span>
										<p><slot></slot></p>
										
									</sl>
    				`,
    		methods:{
    			h1: function(e) {
					this.flag = 1;
					e.currentTarget.style.backgroundColor = "#d9534f";
					e.currentTarget.children[1].className = "mask";
					e.currentTarget.children[1].children[1].style.display = "block";
					console.log()
				},
				h0: function(e) {
					this.flag = 0;
					e.currentTarget.style.backgroundColor = "white";
					e.currentTarget.children[1].className = "";
					e.currentTarget.children[1].children[1].style.display = "none";
				},
    		},
    	}
 	},
 	
	methods: {
		//////////////////////////////////VueResource.ajax待完善 /////////////////////////////////////////////////////
		//		ajax:function () {
		//			this.$http.jsonp(this.jsonpUrl)
		//			.then( function(res){
		//        		console.log(res);  
		//       		this.$set('resData',res); 
		//       		Console.log("111")
		//			})
		//		},
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		ajax: function() {

			$.ajax({ //	ajax数据获取
				url: this.jsonpUrl,
				type: "GET",
				dataType: "jsonp", //指定服务器返回的数据类型
				//				jsonpCallback: "showData", //指定回调函数名称
				success: function(data) {
					app.movData = data;						//此处this处于第二层  指向ajax   切记切记
					app.subjects = app.movData.subjects;
					console.info(app.subjects);
					app.sjlbt = app.subjects.slice(0,5); 		//ajax数据分割
					app.sjsl = app.subjects.slice(6,12);
					console.info(app.sjsl);
					app.sjtabs1 = app.subjects.slice(13,22);
					app.abc = data.subjects.slice(23,32);
					app.def = data.subjects.slice(33);
				}
			})
		},
		chulaiba:function(e) {
//			console.log(e.currentTarget.children[1].children[1]);
			e.currentTarget.children[1].style.height = "50%";;
			e.currentTarget.children[1].children[0].children[0].style.display = "block";
		},
		huiquba:function(e) {
			console.log(e.currentTarget.children[1].children[0].children[0]);
			e.currentTarget.children[1].style.height = "";
			e.currentTarget.children[1].children[0].children[0].style.display = "none";
		},
//		more: function(event) {    //轮播图介绍出来
//			bus.$emit("chulaiba","");
//			
//		},
//		less: function(event) {    //轮播图介绍出来
////			bus.$on("chulaiba",function(){console.log(this.index);});
//			console.log("123");
//			
//		},
		greet: function(event) {
			// `this` 在方法里指向当前 Vue 实例
			this.sub_lenth += 1;
			console.log(this.abc);
		},

	},

	created: function() {
		console.log("获取数据 开始渲染")
		this.ajax();
		 
 
		//		dyurl = this.jsonpUrl

		//		window.onload = function() {
		//
		//			$("#btn").click(function() {
		//				
		//				$.ajax({				//	ajax数据获取
		//					url: dyurl,
		//					type: "GET",
		//					dataType: "jsonp", //指定服务器返回的数据类型
		////					jsonpCallback: "showData", //指定回调函数名称
		//					success: function(data) {
		//					
		//						console.info(data);
		//					}
		//				});
		//			});
		//
		//		};
	},
	

//	watch: {
//		
//		movData: function(val) {
//			this.subjects = val.subjects;
//		}
//		
//	},
	
	
		computed: {
	  // 计算属性的 getter
		    Indicators: function () {
		      // `this` 指向 vm 实例
		     
		      return this.subjects; 
		      
		    }
		},
})

//	(function(){
//				var sonpUrl= "https://api.douban.com/v2/movie/in_theaters?count=2"
//				this.$http.jsonp(sonpUrl).then(function(res){  
//    	 	 	  console.log(res);  
//      		  this.$set('resData',res);  
//				})
//	})()