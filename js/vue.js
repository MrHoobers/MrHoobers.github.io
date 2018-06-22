//Vue.use(VueResource); //这个一定要加上，指的是调用vue-resource.js

//var bus = new Vue();
//////////////////////////////vue-router//////////////////////////
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来

var detial = {
	template: `<div id="detail">
					<div class="d-d">
						<span class="glyphicon glyphicon-remove" v-on:click="dclose"></span>
						<div class="d-img"><img :src="app.routerdata.images.medium"/></div>
						<div class="d-detail">
							<span>
								<p>
									类型 ： {{app.routerdata.genres}}<br>
									上映：{{app.routerdata.year}}<br>
									得分：{{app.routerdata.rating.average}}<br>
								</p>
							</span>
						</div>
					</div>
				</div>`,
	methods: {
		dclose:function(){
			router.push({ path: '/' })
		},
	},

}

var router = new VueRouter({
	routes: [
		{
			path: '/id/:id',
			component: detial,
		},
	] // (缩写) 相当于 routes: routes
})

router.beforeEach(function(to, form, next) {
	next()
	///路由触发前通过ajax获取单独数据
	if(to.matched.some(function(item) {
			return item.path == "/id/:id"
		})) {
		$.ajax({ //	ajax数据获取
			url: "https://api.douban.com/v2/movie/subject/" + to.params.id,
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			//				jsonpCallback: "showData", //指定回调函数名称
			success: function(data) {
				app.routerdata = data;
				next();
			}
		});
	}



});
//////////////////////////////////////////////

var app = new Vue({
	el: '#app', //div的id
	router: router,
	data: {
		subjects: [],
		movData: {},
		jsonpUrl: "https://api.douban.com/v2/movie/in_theaters?count=40",
		sub_lenth: "",
		mov_image: "",
		sjlbt: [],
		sjsl: [],
		sjtabs1: [],
		abc: [],
		def: [],
		sjtabs4: [],
		flag: 0,
		routerdata: [],
		wx : 0 ,
		qq : 0 ,
	},

	components: {
		'slt': {
			props: ['todo'],
			template: `

    			<sl @mouseover.stop="h1($event)" @mouseleave.stop="h0($event)" >							
							<router-link :to="'/id/'+todo.id"><img :src="todo.images.medium" alt="..." class="sl_img"></router-link>	
								
								
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
			methods: {
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
					app.movData = data; //此处this处于第二层  指向ajax   切记切记
					app.subjects = app.movData.subjects;
					console.info(app.subjects);
					app.sjlbt = app.subjects.slice(0, 5); //ajax数据分割
					app.sjsl = app.subjects.slice(6, 12);
					console.info(app.sjsl);
					app.sjtabs1 = app.subjects.slice(13, 22);
					app.abc = data.subjects.slice(23, 32);
					app.def = data.subjects.slice(33);
				}
			})
		},
		chulaiba: function(e) {
			//			console.log(e.currentTarget.children[1].children[1]);
			e.currentTarget.children[1].style.height = "50%";;
			e.currentTarget.children[1].children[0].children[0].style.display = "block";
		},
		huiquba: function(e) {
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
		weixin: function(a){
			
			if (a == "qq") {
				
				this.qq == 1? this.qq = 0 : this.qq = 1;
			}else if(a == "wx"){
				this.wx == 1? this.wx = 0 : this.wx = 1;
			}
		    
			
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
		Indicators: function() {
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