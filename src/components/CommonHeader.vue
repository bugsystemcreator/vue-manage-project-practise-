<template>
    <div class="content">
        <div class="shouye">
            <el-button icon="el-icon-menu" size="mini" @click="handleMenu()"></el-button>
            <!-- <h3>首页</h3> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-dropdown trigger="click" size="mini">
                <span><img class="user"
                        src="https://t7.baidu.com/it/u=2860532042,1717890360&fm=74&app=80&size=f256,256&n=0&f=JPEG&fmt=auto?sec=1658077200&t=b8dce2ad96f654999c15fcc734666cfe"
                        alt=""></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'CommonHeader',
    data() {
        return {}

    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        }
    },
    computed:{
        ...mapState({
            tags: state=>state.tab.tabsList
        })
    }
}
</script>

<style lang="less">
.content {
    display: flex;
    height: 100%;
    color: #fff;
    align-items: center;
    justify-content: space-between;

    .el-button {
        margin-right: 20px;
    }

    .user {
        height: 45px;
        width: 45px;
        border-radius: 50%;
    }

    .shouye {
        display: flex;
        height: 100%;
        align-items: center;
    }
      .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        color: aqua;
    }
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
        color: #bfc;
    }
}
</style>