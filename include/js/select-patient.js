
/***
 * 选择客户：
 * chartData:[{title:"平均就诊距离",value:900,unit:"km"}]
 * feature: {url:"../images/tz.gif"}
 */
var selectPatientWidget = Vue.component('select-patient', {
    props:{
        isShowSelect:{
			type: Boolean,
			default: true
		}
	},
    data: function () {
      return {
        list: [],
        selectedOne:{},
		form:{fullname:""},
		patients:[]
      }
    },
	template: `
			<div>
				<el-form :model="form" label-width="100px" label-position="right" ref="form">
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="客户姓名：">
								<el-input v-model="form.fullname" placeholder="请输入" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="3">
							<a class="bluebtn mr20 ml40" @click="loadpatient"><img src="../include/images/table/cx.png" alt=""> 查询</a>
						</el-col>
					</el-row>
				</el-form>
				<el-table :data="patients" style="width: 100%" stripe="true">
					</el-table-column>
						<el-table-column type="index" width="50" label="序号">
					</el-table-column>
					<el-table-column label="姓名">
						<template slot-scope="scope">
							<span>{{ scope.row.fullname }}</span>
						</template>
					</el-table-column>
					<el-table-column label="性别">
						<template slot-scope="scope">
							<span>{{ scope.row.sex }}</span>
						</template>
					</el-table-column>
					<el-table-column label="出生日期">
						<template slot-scope="scope">
							<span>{{ scope.row.birthday }}</span>
						</template>
					</el-table-column>
					<el-table-column label="住址">
						<template slot-scope="scope">
							<span>{{ scope.row.address }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150" fixed="right" align="center">
						<template slot-scope="scope">
							<el-tooltip class="item" content="选中">
								<a @click="selectedPat(scope.$index, scope.row)"><img src="../include/images/table/edit-blue.png" /></a>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
			</div>
              `,
    mounted: function () {
      
    },
    watch: {
      chartData: {
        handler: function(newData){
  
        }
      }
    },
    methods: {
		selectedPat:function(){
			this.isShowSelect = false;
			this.dialogVisible = true;
		},
		handleadd: function() {
			console.log("add:"+this.isShowSelect);
			this.isShowSelect = true;
		},
		loadpatient: function() {

		},
        closeDialog(){

        },
        loadtable(){

        }    
    }
  })
  