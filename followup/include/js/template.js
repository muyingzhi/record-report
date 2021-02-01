var initdata = new Vue({
	el: '.cont',
	data: {
		isShowSelect:false,
		isShowEdit: false,
		isAdd: true,
		fullname:'',
		tableData: [{
				fullname: "张三",
				sex: '男',
				visitor: "张护士",
				visitDate: "2019-01-01"
			},
			{
				fullname: "张三",
				sex: '男',
				visitor: "张护士",
				visitDate: "2019-01-01"
			},
			{
				fullname: "张三",
				sex: '男',
				visitor: "张护士",
				visitDate: "2019-01-01"
			}
		],
		currentPage: 1,
		pageSize: 10,
		totalNum: '',
		form: {
			id: '',
			fullname: '',
			sex: '',
			birthday: '',
			address: '',
			visitDate: '',
			visitor:'',
			temperature:37,
			selfReported:'',
			publicity:''
		},
		activeName: 'first',
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
			]
		}
	},
	mounted: function() {
		var that = this;
		this.loadtable();
	},
	methods: {
		handleadd: function() {
			//点击“新增”，显示客户选择列表，隐藏编辑窗口
			this.isShowSelect = true;
			this.isShowEdit = false;
		},
		selectedPat:function(patient){
			//选中一个客户，打开编辑窗口，并为form设置初始值
			this.isShowSelect = false;
			this.isShowEdit = true;

			this.form = Object.assign({},{
				temperature:36,
				visitDate:new Date(),
				visitor: "刘护士"
			},patient);
			
			this.isAdd = false;
		},
		//编辑
		handleEdit: function(index, row) {
			//当前行记录赋值给form，显示编辑窗口
			this.form = Object.assign({}, row);

			this.isShowEdit = true;
			this.isAdd = false;
		},
		loadtable: function() {
			//----查询，根据姓名获取客户列表
			var that = this;
			// axios.post(serverurl + 'paApi/dictParm/getPaPageList?parmName=' + this.name + '&pageNum=' + this.currentPage +
			// 	'&pageSize=' + this.pageSize).then(function(res) {
			// 	that.totalNum = res.data.data.total;
			// 	that.tableData = res.data.data.pageData;
			// });
		},
		// 关闭弹出框
		closeDialog: function() {
			this.form = {};
		},
		editparam: function(formName) {
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
							that.isShowEdit = false;
						});
				} else {
					return false;
				}
			});

		},
		handleDelete: function(index, row) {
			//删除当前行
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
			//行数变化
			this.pageSize = val;
			this.currentPage = 1;
			this.loadtable();
		},
		handleCurrentChange: function(val) {
			//当前页码变化
			this.currentPage = val;
			this.loadtable();
		},
		saveAdd(){
			//新增保存
			console.log(this.form);
		},
		saveEdit(){
			//编辑保存
			console.log(this.form);
		}
	}
});
