const fs = require("fs");
const path = require('path');
const request = require('request');// 请求图片数据模块
const http = require("superagent")// 轻量级http 请求
const async = require('async');// 处理异步请求

const baseURL = require("./basrURl").baseURL;// 爬取网站的绝对路径 
const dirnameUrl = "./meinv/"; // 图片保存的绝对目录
const type = "meinv"; // 爬取图片的类型
let count = 0; // 记录当前下载的个数
let  index = 1;// 保存爬取页面第几页  动漫类型 40 页
let orderDirName = dirnameUrl +"第" + index +'页/'
const downloadPic = function (src, dest) {
    request(src).pipe(fs.createWriteStream(dest)).on('close', function () {
        count++;
        console.log('第' + count + '张' + '下载成功');
        if (count === 20) {
            console.log('第' + index + '页' + '已经下载完成');
            index++
            orderDirName = dirnameUrl +"第" + index +'页/'// 给下载目录重新赋值
            fs.mkdir(orderDirName, { recursive: true }, (err) => {
                  console.log(err);
                if (err) throw err;
                count = 0
                batchDoload()
              });
        }
    })
}
function getPicList() {
    return new Promise(async (resolve, reject) => {
        const response = await http.get(`http://localhost:3000/getPicDetailUrl/${index}/?type=${type}`);
        let res = [];
        response.body.forEach((item) => {
            let obj = {}
            let alt = item.alt.replace(/\s/g,'')
            obj.src = baseURL + item.src
            obj.alt = alt
            res.push(obj)
        })
        resolve(res)
    })
}
function batchDoload() {
    getPicList().then(res => {
        async.mapSeries(res, function (item, callback) {
            setTimeout(function () {
                downloadPic(item.src, orderDirName + (item.alt+ '4k壁纸' +'.png') );
                callback(null, item);
            }, 1000);
        }, function (err, results) { });
    })
}
batchDoload()


