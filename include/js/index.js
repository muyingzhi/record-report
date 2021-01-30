$(function() {
	$(".logout").click(function() {
		window.location.href = serverurl + 'security/logout.do';
	});
});

layui.config({
	base: 'include/layuiadmin/' //静态资源所在路径
}).extend({
	index: "lib/index"
}).use('index');


var initdata = new Vue({
	el: '#LAY_app',
	data: {
		name: '',
	},
	mounted: function() {
		var that = this;
		// axios.get(serverurl + 'paApi/paRole/getPaRole').then(
		// 	function(res){
		// 		if(res.data.data){
		// 			that.userId=[];
		// 		that.name=res.data.data.staffName;
		// 		$.each(res.data.data.roleDetailVOList, function(i, value){
		// 			if(value.roleCode=="11715570c26c11eaa901005056b8a894"){
		// 				that.userId.push("11715570c26c11eaa901005056b8a894");
		// 			}else if(value.roleCode=="2d7731edc26c11eaa901005056b8a894"){
		// 				that.userId.push("2d7731edc26c11eaa901005056b8a894");
		// 			}else if(value.roleCode=="1f65ef04c26c11eaa901005056b8a894"){
		// 				that.userId.push("1f65ef04c26c11eaa901005056b8a894");
		// 			}else if(value.roleCode=="25f47302c26c11eaa901005056b8a894"){
		// 				that.userId.push("25f47302c26c11eaa901005056b8a894");
		// 			}else if(value.roleCode=="060cb792c26c11eaa901005056b8a894"){
		// 				that.userId.push("060cb792c26c11eaa901005056b8a894");
		// 			}
		// 		});
		// 		sessionStorage.setItem('hspId', res.data.data.hspId);
		// sessionStorage.setItem('userId', that.userId);
		// 		}
		// 	});
		
	},
	methods:{

	}
});

