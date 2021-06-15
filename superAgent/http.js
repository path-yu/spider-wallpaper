const request = require("superagent");
const paseHTML = require('../cheerio/cheerio')
const baseUrl = require("../basrURl");
const { load } = require('cheerio');
request.buffer['mime'] = true 
require('superagent-charset')(request)// 安装字符集
const { parseDetailPage } = paseHTML;
const { parsePage } = paseHTML;
module.exports = {
    getPage(num, type) {
        return new Promise((resolve, reject) => {
            const url = `http://pic.netbian.com/4k${type}/${num == 1 ? "index" : 'index' + '_' + num}.html`;
            request
            .get(url)
            .charset('gbk')// 指定编码集
            .buffer(true)// 设置buffer缓冲
            .end((err, res) => {
                if(err) {
                    reject(err)
                }
                if(res.text){
                    const data = parsePage(res.text)
                    resolve(data)
                }
            })
        })
    },
    getPicDetailPage(index, type) {
        return new Promise(async (resolve, reject) => {
            const { body } = await request.get(`http://localhost:3000/getPicList/${index}?type=${type}`)// 获取当前页面所有的图片url
            const res = await Promise.all(body.map(item => getPicDetailPicUrl(item)))// 利用promise all 处理多个异步请求
            // console.log(body);
           const result =  body.map((item,index) =>{
                item.src = res[index].src
                return item
            })
            resolve(result)
        })
    }
}
function getPicDetailPicUrl(item) {
    return new Promise((resolve, reject) => {
        request
            .get(baseUrl.baseURL + item.picDetailPageUrl)
            .charset('gbk')// 指定编码集
            .buffer(true)// 设置buffer缓冲
            .end((err, res) => {
                if(err) {
                    reject(err)
                }
                if(res.text){
                    let data = parseDetailPage(res.text);
                    resolve(data)
                }
            })
    })

}