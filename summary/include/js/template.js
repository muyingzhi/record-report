var initdata = new Vue({
	el: '.cont',
	data: {
		fullname:'',
		tableData: [{
				name: "就诊信息统计页面",
				title: '就诊信息月统计',
				tpl: "就诊信息模板",
				oridata: "平台库"
			},
			{
				name: "就诊信息统计页面",
				title: '就诊信息月统计',
				tpl: "就诊信息模板",
				oridata: "平台库"
			},
			{
				name: "就诊信息统计页面",
				title: '就诊信息月统计',
				tpl: "就诊信息模板",
				oridata: "平台库"
			}
		],
		currentPage: 1,
		pageSize: 10,
		totalNum: '',
		dialogVisible: false,
		examclick: true,
		tplLists:[{"name":"公共卫生模板"},{"name":"卫生资源模板"},{"name":"医疗服务模板"}],
		form: {
			id: '',
			name: '',
			type: '',
			tpl: '',
			imageUrl: '',
			list: [{biaoshi:"",name:""},{biaoshi:"",name:""},{biaoshi:"",name:""}],
		},
		activeName: 'first',
		hspLists: [{
			hspName: '门诊人次'
		}, {
			hspName: '病床数'
		}, {
			hspName: '疾病排名'
		}],
		txdialogVisible: false,
		rules: {
			name: [{
					required: true,
					message: '请输入名称',
					trigger: 'blur'
				},
				{
					max: 30,
					message: '最多输入30个字符'
				}
			],
			type: [{
					required: true,
					message: '请输入类型',
					trigger: 'blur'
				},
				{
					max: 30,
					message: '最多输入30个字符'
				}
			],
			tpl: [{
				required: true,
				message: '请选择模板',
				trigger: 'blur'
			}]
		}
	},
	mounted: function() {
		var that = this;
		this.loadtable();
	},
	methods: {
		loadtable: function() {
			var that = this;
			// axios.post(serverurl + 'paApi/dictParm/getPaPageList?parmName=' + this.name + '&pageNum=' + this.currentPage +
			// 	'&pageSize=' + this.pageSize).then(function(res) {
			// 	that.totalNum = res.data.data.total;
			// 	that.tableData = res.data.data.pageData;
			// });
		},
		changetpl:function(tplid){
			this.form.imageUrl = 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg';
			this.form.srcList = ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'];
			this.form.zujianList = [{
				biaoshi: '',
				name: '',
				zujian: '',
				zhihbiao: ""
			}];
			this.form.tiaojianList = [{
				bianma: '',
				ziduan: '',
				name: ''
			}];
			this.form.texingList = [{
				shuxing: '',
				value: '',
				type: '',
				edit: '',
				msg: ''
			}];
		},
		handleadd: function() {
			this.dialogVisible = true;
			this.examclick = true;
		},
		addparam: function(formName) {
			var that = this;
			this.$refs[formName].validate(function(valid) {
				if (valid) {
					axios({
						method: 'post',
						url: serverurl + 'paApi/dictParm/addHspBaseinfo',
						params: that.form
					}).then(
						function(res) {
							if (res.data.code == 500) {
								that.$message({
									type: 'info',
									message: res.data.msg
								});
								return;
							}
							that.loadtable();
							that.dialogVisible = false;
						});
				} else {
					return false;
				}
			});

		},
		// 关闭弹出框
		closeDialog: function() {
			this.form = {};
		},
		handleEdit: function(index, row) {
			console.log(this.$children)
			this.form = Object.assign({}, row);
			this.form.zujianList = [{
				biaoshi: '001',
				name: '中间表格',
				zujian: '柱状组件',
				zhihbiao: "门诊人次"
			}];
			this.form.tiaojianList = [{
				bianma: '示例',
				ziduan: '示例',
				name: '示例'
			}];
			this.form.texingList = [{
				shuxing: '示例',
				value: '示例',
				type: '示例',
				edit: 1,
				msg: '示例'
			}];
			this.dialogVisible = true;
			this.examclick = false;
		},
		editparam: function(formName) {
			console.log(this.$children)
			var that = this;
			this.$refs[formName].validate(function(valid) {
				if (valid) {
					axios({
						method: 'post',
						url: serverurl + 'paApi/dictParm/update',
						params: that.form
					}).then(
						function(res) {
							if (res.data.code == 500) {
								that.$message({
									type: 'info',
									message: res.data.msg
								});
								return;
							}
							that.loadtable();
							that.dialogVisible = false;
						});
				} else {
					return false;
				}
			});

		},
		handleDelete: function(index, row) {
			var that = this;
			this.$confirm('您确定要删除该记录吗?', '提示', {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning'
			}).then(function() {
				axios.get(serverurl + 'paApi/hspBaseinfo/deleteHspBaseinfo?id=' + row.id).then(
					function(res) {
						if (res.data.code == 0) {
							that.loadtable();
							that.$message({
								type: 'success',
								message: '删除成功'
							});
						}
					});
		
			}).catch(function() {
				that.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		handleSizeChange: function(val) {
			this.pageSize = val;
			this.currentPage = 1;
			this.loadtable();
		},
		handleCurrentChange: function(val) {
			this.currentPage = val;
			this.loadtable();
		},
		edittx: function() {
			this.txdialogVisible = true;
		}
	}
});