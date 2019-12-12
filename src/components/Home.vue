<template>
    <div>
        <!--搜索栏-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.userName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="addUser">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- 列表展示 -->
        <el-table :data="dataList" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" show-overflow-tooltip align="center" v-if="!show"></el-table-column>
            <el-table-column prop="userCode" label="用户code" width="180" show-overflow-tooltip align="center" v-if="!show"></el-table-column>
            <el-table-column prop="userName" label="名字" width="180" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="userPwd" label="密码" width="180" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="userState" label="状态" width="180" show-overflow-tooltip align="center">
                <!-- if判断 -->
                <template slot-scope="scope">
                    <p v-if="scope.row.userState=='0'">禁用</p>
                    <p v-if="scope.row.userState=='1'">开启</p>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="180" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="updateDate" label="修改时间" width="180" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="操作" align="center" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
                    <el-button type="info" @click="modifyUser(scope.row)">修改</el-button>
                    <el-button type="info" @click="deleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--增加页面-->
        <el-dialog title="新增记录" :visible.sync="saveDialogVisible" width="50%" :close-on-click-modal="false">
            <el-form :model="saveFormData" :rules="rules2" ref="saveFormData" label-width="0px" class="demo-ruleForm login-container">
                <el-form-item prop="userName">
                    <el-input type="text" v-model="saveFormData.userName" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" v-model="saveFormData.userPwd" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <!-- 单选框-->
                <el-radio-group v-model="saveFormData.userState">
                    <el-radio type="radio" :label="1">开启</el-radio>
                    <el-radio type="radio" :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="saveDialogVisible=false, saveFormData={id:'', userName:'', userPwd:'', userState:''}">取 消</el-button>
                <el-button type="primary" @click.native="addSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑/详情页面-->
        <el-dialog title= "编辑记录" :visible.sync="updateDialogVisible" width="50%" :close-on-click-modal="false">
            <el-form :model="updateFormData" :rules="rules2" ref="updateFormData" label-width="0px" class="demo-ruleForm login-container">
                <el-form-item prop="userName">
                    <el-input type="text" v-model="updateFormData.userName" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" v-model="updateFormData.userPwd" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-radio-group v-model="updateFormData.userState">
                    <el-radio type="radio" :label="1">开启</el-radio>
                    <el-radio type="radio" :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="updateDialogVisible=false, updateFormData={id:'', userCode:'', userName:'', userPwd:'', userState:''}">取 消</el-button>
                <el-button v-if="isView" type="primary" @click.native="updateSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                //动态变量值
                dataList: [],
                saveDialogVisible: false, //新增框是否显示
                updateDialogVisible: false, //编辑框是否显示
                isView: true, //确定按钮是否显示
                show: true, //展示列字段是否显示
                saveFormData: {
                    id: '',
                    userCode: '',
                    userName: '',
                    userPwd: '',
                    userState: '1'
                },
                updateFormData: {
                    id: '',
                    userCode: '',
                    userName: '',
                    userPwd: '',
                    userState: ''
                },
                //参数校验赋值
                rules2: {
                    userName: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }],
                    userPwd: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                },
                //请求参数赋值
                filters: {
                    userName: ''
                }
            }
        },

        //进入页面即执行
        mounted: function () {
            this.loadData();
        },

        //方法，调用后端接口处
        methods: {
            loadData() {
                //条件查询方法
                let param = {
                    userName : this.filters.userName
                };
                this.$http.post('/system/queryUserList', param, resp => {
                    if(resp.code == 'success'){
                        this.dataList=resp.data;
                    } else{
                        this.$message({
                            message: resp.message,
                            type:'error'
                        });
                    }
                });
            },

            getUsers() {
                this.loadData();
            },

            toDetail(rowData) {
                this.updateFormData = Object.assign({}, rowData);
                this.isView = false;
                this.updateDialogVisible = true;
            },

            addUser() {
                this.saveFormData = {
                    id: '',
                    userCode: '',
                    userName: '',
                    userPwd: '',
                    userState: '',
                    createDate: '',
                    updateDate: ''
                };
                this.isView = true;
                this.saveDialogVisible = true;
            },

            modifyUser(rowData) {
                this.updateFormData = {
                    id: rowData.id,
                    userCode: rowData.userCode,
                    userName: rowData.userName,
                    userPwd: rowData.userPwd,
                    userState: rowData.userState
                };
                this.updateDialogVisible = true;
            },

            //增加操作
            addSubmit() {
                //先判断表单是否通过了判断
                this.$refs.saveFormData.validate((valid) => {
                    //代表通过验证 ,将参数传回后台
                    if (valid) {
                        let param = Object.assign({}, this.saveFormData);
                        this.$http.post('/system/addUser', param, resp => {
                            if(resp.code == 'success'){
                                this.$message({
                                    type: 'info',
                                    message: `添加成功`
                                });
                                this.loadData();
                            } else{
                                this.$message({
                                    type: 'info',
                                    message: `添加失败`
                                });
                            }
                            this.saveDialogVisible = false;
                        });
                    }
                });
            },

            //修改操作
            updateSubmit(){
                //先判断表单是否通过了判断
                this.$refs.updateFormData.validate((valid) => {
                    //代表通过验证 ,将参数传回后台
                    if (valid) {
                        let param = Object.assign({}, this.updateFormData);
                        this.$http.post('/system/updateUser', param, resp => {
                            if(resp.code == 'success'){
                                this.$message({
                                    type: 'info',
                                    message: `修改成功`
                                });
                                this.loadData();
                            } else{
                                this.$message({
                                    type: 'info',
                                    message: `修改失败`
                                });
                            }
                            this.updateDialogVisible = false;
                        });
                    }
                });
            },

             //删除操作
            deleteUser(rowData) {
                this.$alert('是否删除这条记录', '信息删除', {
                    confirmButtonText: '确定',
                    callback: action => {
                        var params = {
                            userCode: rowData.userCode
                        };
                        this.$http.post('/system/deleteUser', params, resp => {
                            if(resp.code == 'success'){
                                this.$message({
                                    type: 'info',
                                    message: `已删除`
                                });
                                this.loadData();
                            } else{
                                this.$message({
                                    type: 'info',
                                    message: `删除失败`
                                });
                            }
                        });
                    }
                });
            }

        }
    }
</script>

<style>
    body {
        background: #DFE9FB;
    }
</style>