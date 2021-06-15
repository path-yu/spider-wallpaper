const cheerio = require('cheerio');
const baseUrl = require("../basrURl");
module.exports = {
    parsePage(val) {
        let res = []// 保存获取图片的url列表
        let $ = cheerio.load(val) // 手动加载HTMl
        const targetImg = $(".clearfix > li > a", ".slist");// 要解析的图片详情页面a标签地址;
        // const targetImgAlt =  $(".clearfix > li > b", ".slist");// 图片的标题元素
        targetImg.each((key, val) => {
            let obj = {}
            obj.picDetailPageUrl = val.attribs.href// 获取并设置图片详情的url地址
            obj.alt =  val.children['1'].children[0].data
            res.push(obj)
        })
        return res
    },
    parseDetailPage(val) {
        const $ = cheerio.load(val) // 手动加载HTMl
        const targetImg = $(".photo-pic > a > img", ".view");// 要解析的html元素;
        const targetImgTitle =  $(".photo-hd > h1", ".view");
        return {
            src:targetImg["0"].attribs.src,
        }
    }
}