<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div class="user">

                    <div class="userinfo">
                        <img src="https://t7.baidu.com/it/u=2860532042,1717890360&fm=74&app=80&size=f256,256&n=0&f=JPEG&fmt=auto?sec=1658077200&t=b8dce2ad96f654999c15fcc734666cfe"
                            alt="我的女神">
                        <p class="name">Admin</p>
                        <p class="acess">超级管理员</p>
                    </div>
                    <hr>
                    <div class="login-info">
                        <p>上次登录时间：<span>2022-7-14</span></p>
                        <p>上次登录地点：<span>上海</span></p>
                    </div>
                </div>
            </el-card>
            <el-card style="margin-top:20px; height:460px;">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }"
                    shadow="hover">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
                    <div class="detail">
                        <p>￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
        </el-col>
        <el-card style="height:280px; ">
            <div style="height:280px; width:100%" ref="echarts" ></div>
        </el-card>
        <div class="graph">
            <el-card style="height:260px">
                <div style="height:240px; width:100%" ref="userEcharts"></div>
            </el-card>
            <el-card style="height:260px" >
                <div style="height:240px; width:100%"  ref="videoEcharts"></div>
               
            </el-card>
        </div>
    </el-row>
</template>

<script>
import { getData } from '../../api/data.js'
import * as echarts from 'echarts'
export default {
    name: 'Home',
    data() {
        return {
            tableData: [
                {
                    name: 'oppo',
                    todayBuy: '100',
                    monthBuy: '300',
                    totalBuy: '800'
                },
                {
                    name: 'oppo',
                    todayBuy: '100',
                    monthBuy: '300',
                    totalBuy: '800'
                },
                {
                    name: 'oppo',
                    todayBuy: '100',
                    monthBuy: '300',
                    totalBuy: '800'
                },
                {
                    name: 'oppo',
                    todayBuy: '100',
                    monthBuy: '300',
                    totalBuy: '800'
                },
                {
                    name: 'oppo',
                    todayBuy: '100',
                    monthBuy: '300',
                    totalBuy: '800'
                },
                {
                    name: 'oppo',
                    todayBuy: '100',
                    monthBuy: '300',
                    totalBuy: '800'
                },
                {
                    name: 'oppo',
                    todayBuy: '100',
                    monthBuy: '300',
                    totalBuy: '800'
                }
            ],

            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买',

            },
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: 'success',
                    color: "#2EC7C9"
                },
                {
                    name: '今日收藏订单',
                    value: 654,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: '今日未支付订单',
                    value: 2100,
                    icon: "s-goods",
                    color: "#bfc"
                },
                {
                    name: '本月支付订单',
                    value: 12350,
                    icon: "success",
                    color: "#2EC7C9"
                },
                {
                    name: '本月收藏订单',
                    value: 12540,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: '本月未支付订单',
                    value: 3000,
                    icon: "s-goods",
                    color: "#bfc"
                },
            ]
        }
    },
    mounted() {
        getData().then((response) => {
            const { code, data } = response.data
            if (code === 20000) {
                this.tableData = data.tableData;
                //折线图
                const order = data.orderData;
                const xData = order.date
                const keyArray = Object.keys(order.data[0]);
                const series = [];
                keyArray.forEach((key) => {
                    series.push(
                        {
                            name: key,
                            data: order.data.map(item => item[key]),
                            type: 'line'
                        }
                    );
                    const Option = {
                        xAxis: {
                            data: xData
                        },
                        yAxis: {

                        },
                        legend: {
                            data: keyArray
                        },
                        series
                    }
                    const E = echarts.init(this.$refs.echarts)
                    E.setOption(Option)
                })
                //柱状图用户
                const userOption = {
                    legend: {
                        //图列文字颜色
                        textStyle: {
                            color: '#333',
                        },
                    },
                    grid: {
                        left: '20%'
                    },
                    //提示框
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: "category",
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            color: '#333'
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3"
                                }
                            }
                        },

                    ]
                    , color: ["#2ec7c9", "b6a2de"],
                    series: [
                        {
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type: 'bar'
                        },
                    ],
                }
                const U=echarts.init(this.$refs.userEcharts)
                U.setOption(userOption )
                //饼图
                const videoOption={
                    tooltip:{
                        trigger:"item"
                    },
                    color:[
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                        ],
                        series:[
                            {
                                data:data.videoData,
                                type:'pie'
                            }
                        ],          
                }
                const V=echarts.init(this.$refs.videoEcharts)
                V.setOption(videoOption)
            }
            console.log(response)

        })
    }
}
</script>

<style>
.el-main {
    padding: 0px;
   
    height: 100%;
}

.home {
    position: relative;
    background-image: url('./src=http___i0.hdslb.com_bfs_article_f3d4ce4335e6ce4e1e257e2b2be0ae2fae572e9a.jpg&refer=http___i0.hdslb.webp');
    background-size: auto;
    background-repeat: no-repeat;
    height: 100%;
}

.el-card {
    opacity: 0.75;
}

.userinfo {
    display: flex;
    align-items: center;
}

img {
    border-radius: 50%;
    margin-right: 20px;
}

img:hover {
    transform: scale(1.25);
}

.name {
    font-size: 50px;
}

.acess {
    align-self: flex-end;
    margin-left: -125px;
    color: gray;
}

.login-info p span {
    margin-left: 180px;
    color: pink;
}

.num {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
}

.num .el-card {
    width: 310px;
    margin-bottom: 35px;
}

.icon {
    width: 90.67px;
    height: 90.67px;
    text-align: center;
    line-height: 90.67px;
    font-size: 30px;
    color: #fff;

}

.detail p {
    font-size: 18px;
}

.detail .txt {
    font-size: 10px;
    color: rgb(40, 130, 121);
    margin-left: 7px;
}

.graph {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.graph .el-card {
    width: 580px;
}
</style>