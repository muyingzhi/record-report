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
		isAdd: true,
		form: {
			id: '',
			fullname: '',
			sex: '',
			symptom: [],
			symptomOther:"",
			familyHistory: [],
			p1: [],
			p2: [],
			p3: [],
			p4: [],
			p5: [],
			h1: [],
			h2: [],
			h3: [],
			h4: [],
			h5: [],
			h6: []
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
		initform(){
			this.form = {};
			this.form.symptom = [];
			this.form.familyHistory = [];
			this.form.p1=[];
			this.form.p101=[];
			this.form.p2=[];
			this.form.p3=[];
			this.form.p4=[];
			this.form.p5=[];
			this.form.h1=[];
			this.form.h2=[];
			this.form.h3=[];
			this.form.h4=[];
			this.form.h5=[];
			this.form.h6=[];

		},
		handleadd: function() {
			this.initform();
			this.dialogVisible = true;
			this.isAdd = true;
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
			this.initform();
		},
		handleEdit: function(index, row) {
			this.initform();
			this.form = Object.assign(this.form, row);
			this.dialogVisible = true;
			this.isAdd = false;
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
