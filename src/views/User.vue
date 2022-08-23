<template>
  <!-- <div>
  <div class="users" @mouseover="changePosition"> <a href="https://bakabbs.com/" style="text-decoration: none;">管你妈妈的用户，老子不写了,你有种来打我啊</a></div>
</div> -->
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary " @click="addUser">+新增</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
     <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
      ></common-table>
  </div>
</template>

<script>
import CommonForm from '../components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import {getUser} from '../../api/data'
export default {
  name: 'User',
  components: {
    CommonForm, CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 0
            },
            {
              label: '女',
              value: 1
            }]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        }, {
          model: 'addr',
          label: '地址',
          type: 'input'
        }

      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      },
      formLabel: [{
        model: 'keyword',
        label: '',
        type: 'input'
      }],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
        props: "name",
        label: "姓名",
      },
        {
        props: "age",
        label: "年龄",
      },
        {
        props: "sexlabel",
        label: "性别",
      },
        {
        props: "birth",
        label: "出生日期",
        width:200
      },
        {
        props: "addr",
        label: "地址",
        width:320
      },
      ],
      config:{
        page:1,
        total:30
      }
    }
  },
  methods: {
    // changePosition(){
    //   const d=document.getElementsByClassName('users');

    //   d[0].style.top=Math.random()*800+'px';
    //   d[0].style.left=Math.random()*1400+'px';
    // }
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    getList(name='') {
      this.config.loading=true
      name?this.config.page=1:''
      getUser({
         page: this.config.page,
         name 
      }).then((res)=>{
        this.tableData=res.data.list.map(item=>{
          item.sexLabel=item.sex===0?"女":"男"  
          return item
        })
        this.config.total=res.data.count
        this.config.loading=false
           console.log(this.tableData,'tableData')
      })  
    },
    editUser(row){
      this.operateType='edit'
      this.isShow=true
      this.operateForm=row
     
    },
    delUser(row){
this.$confirm("此操作将永久删除改组件，是否继续","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
      type:'warning'
      }).then(()=>{
        const id=row.id
        this.$http.get("/user/del",{
          params:{id}
        }).then(()=>{
          this.$message({
            type:"success",
            message:"删除成功"
          })
          this.getList()
        })
      })
    }
  },
 
  created(){
    this.getList() 
  this.$forceUpdate(this.tableData)
  }
 
}

</script>

<style lang="less" scoped>
/* div{
  position: relative;
}
.users {
   position: absolute;
  font-size: 20px;
} */
.manage {
  margin-top: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .manage-header {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;

    .el-button {
      align-self: flex-start;

    }

    .el-button:nth-child(1) {
      margin-left: 20px;
    }

    form {
      display: flex;
      margin-top: 8px;
    }
  }
}
</style>