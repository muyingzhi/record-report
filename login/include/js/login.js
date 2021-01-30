var topHeight = $(".top").height();
var bottomHeight = $(".bottomcopyr").height();
$(".middle").height($(window).height() - topHeight - bottomHeight);
$(window).resize(function() {
	$(".middle").height($(window).height() - topHeight - bottomHeight);
});



// 设置过期时间
const foowwLocalStorage = {
    set: function (key, value, ttl_ms) {
        var data = { value: value, expirse: new Date(ttl_ms).getTime() };
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    get: function (key) {
        var data = JSON.parse(sessionStorage.getItem(key));
        if (data !== null) {
            if (data.expirse != null && data.expirse < new Date().getTime()) {
            	sessionStorage.removeItem(key);
            } else {
                return data.value;
            }
        }
        return null;
    }
}

var ifauto = foowwLocalStorage.get("autologin");
if(ifauto==0){	
window.location.href = "../index.html";	
}

// 跨域验证二维码
axios.defaults.withCredentials = true;

layui.config({
	base: '../include/layuiadmin/' //静态资源所在路径
}).extend({
	setter: "config"
}).use(["setter",'form','element'], function() {
	var setter = layui.setter
	,form = layui.form
	,layer = layui.layer;
});	
	var initdata = new Vue({
		el: '.login-con',
		data: {
			username: '',
			password: '',
			psdveri: false,
			verify:'',
			verifycode:serverurl +'captcha/captchaImage?type=char',
			zdlogind:false,
			errormsg:'',
			pwdtype:'1'
		},
		methods: {
			clearname: function(){
				this.username = '';
			},
			zdlogin: function(){
				if(this.zdlogind==true){
					this.zdlogind=false;
				}else{
					this.zdlogind=true;
				}
			},
			changepwd:function(index){
				if(index==1){
					this.pwdtype="2";
				}else{
					this.pwdtype="1";
				}
				
			},
			login: function(){
				if (this.username == "" && this.password == "") {
					initdata.psdveri = true;
					initdata.errormsg="用户名和密码不能为空";
					$(".user").focus();
				} else if (this.username != "" && this.password == "") {
					initdata.psdveri = true;
					initdata.errormsg="密码不能为空";
					$(".user").focus();
				} else if (this.username == "" && this.password != "") {
					initdata.psdveri = true;
					initdata.errormsg="用户名不能为空";
					$(".pwd").focus();
				} else {
					axios.post(serverurl + 'loginStateless?username=' + this.username + '&password=' + md5(this.password).toUpperCase() + '&loginVerCode=' + this.verify + '&loginVerFlag=1').then(
						function(res) {
							if (res.data.code == 0) {
								sessionStorage.setItem('token', res.data.data.accessToken);
								sessionStorage.setItem('name', res.data.data.name);
								if(this.zdlogind==true){
									foowwLocalStorage.set('autologin', 0, new Date().getTime() + 24 * 60 * 60 * 7);	
								}else{
									sessionStorage.setItem('autologin', 1);
								}
								window.location.href = "../index.html";
							} else if (res.data.code == 500) {
								initdata.psdveri = true;
								initdata.errormsg=res.data.msg;
								$(".user").focus();
							}
						});	
					}
			}
		}
	});
