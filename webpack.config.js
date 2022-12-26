const path=require("path");
module.exports={
    entry:"./src/main.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js"
    },
    module:{
        //loader配置
        rules:[
            
        ]
    },
    plugins:[],//插件配置
    mode:"development",
};