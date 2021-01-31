
/***
 * 选择客户：
 * chartData:[{title:"平均就诊距离",value:900,unit:"km"}]
 * feature: {url:"../images/tz.gif"}
 */
var selectPatientWidget = Vue.component('select-patient', {
    props:[
        "isVisible"
    ],
    data: function () {
      return {
        list: [],
        selectedOne:{},
        form:{fullname:""}
      }
    },
    template: `
    <el-dialog title="选择客户" :visible.sync="isVisible" width="800px" @close="closeDialog">
        <div slot="title" >新增</div>
        <el-form :model="form" label-width="100px" label-position="right" ref="form">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="客户姓名：">
                        <el-input v-model="form.fullname" placeholder="请输入" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <a class="bluebtn mr20 ml40" @click="loadtable"><img src="../include/images/table/cx.png" alt=""> 查询</a>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
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
        closeDialog(){

        },
        loadtable(){
            
        }    
    }
  })
  