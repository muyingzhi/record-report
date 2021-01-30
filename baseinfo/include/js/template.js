var initdata = new Vue({
	el: '.cont',
	data: {
		fullname:'',
		age:'',
		status:'',
		tableData: [{
				fullname: "张三",
				sex: '男',
				url: '/xxxxx/template01',
				num: 4,
				cishu: 1,
				status: true
			},
			{
				fullname: "里斯本",
				sex: '男',
				url: '/xxxxx/template01',
				num: 4,
				cishu: 1,
				status: true
			}
		],
		currentPage: 1,
		pageSize: 10,
		totalNum: '',
		dialogVisible: false,
		examclick: true,
		form: {
			id: '',
			fullname: '',
			sex: '',
			checkList: [],
			useMethod: '',
			url: '',
			imageUrl: '',
			zujianList: [],
			tiaojianList: [],
			texingList: []
		},
		activeName: 'first',
		hspLists: [{
			hspName: '门诊人次'
		}, {
			hspName: '病床数'
		}, {
			hspName: '疾病排名'
		}],
		zujianLists:[{
			hspName: '柱状图'
		}, {
			hspName: '饼状图'
		}, {
			hspName: '雷达图'
		}],
		txdialogVisible: false,
		rules: {
			fullname: [{
					required: true,
					message: '请输入姓名',
					trigger: 'blur'
				},
				{
					max: 30,
					message: '最多输入30个字符'
				}
			],
			sex: [{
					required: true,
					message: '请选择',
					trigger: 'blur'
				},
				{
					max: 30,
					message: '最多输入30个字符'
				}
			],
			birthday: [{
				required: true,
				message: '请输入URL',
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
		handleAvatarSuccess(res, file) {
			this.form.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg' || 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		handleadd: function() {
			this.form.parmValue=1;
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
			this.form = Object.assign({}, row);
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
			this.dialogVisible = true;
			this.examclick = false;
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
							that.dialogVisible = false;
						});
				} else {
					return false;
				}
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
		removeDomain: function(item) {
			var index = this.form.zujianList.indexOf(item);
			if (index !== -1) {
				this.form.zujianList.splice(index, 1)
			}
		},
		addDomain: function() {
			if (this.form.zujianList == null) {
				this.form.zujianList = [];
			}
			this.form.zujianList.push({
				biaoshi: '',
				name: '',
				zujian: '',
				zhihbiao: "",
				key: Date.now()
			});
			this.$forceUpdate();
		},
		removeDomain2: function(item) {
			var index = this.form.tiaojianList.indexOf(item);
			if (index !== -1) {
				this.form.tiaojianList.splice(index, 1)
			}
		},
		addDomain2: function() {
			if (this.form.tiaojianList == null) {
				this.form.tiaojianList = [];
			}
			this.form.tiaojianList.push({
				bianma: '',
				ziduan: '',
				name: '',
				key: Date.now()
			});
			this.$forceUpdate();
		},
		removeDomain3: function(item) {
			var index = this.form.texingList.indexOf(item);
			if (index !== -1) {
				this.form.texingList.splice(index, 1)
			}
		},
		addDomain3: function() {
			if (this.form.texingList == null) {
				this.form.texingList = [];
			}
			this.form.texingList.push({
				shuxing: '',
				value: '',
				type: '',
				edit: '',
				msg: '',
				key: Date.now()
			});
			this.$forceUpdate();
		},
		edittx: function() {
			this.txdialogVisible = true;
		}
	}
});
