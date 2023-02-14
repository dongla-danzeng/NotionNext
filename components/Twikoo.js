import BLOG from '@/blog.config'
import React from 'react'
import twikoo from 'twikoo'

/**
 * Giscus评论 @see https://giscus.app/zh-CN
 * Contribute by @txs https://github.com/txs/NotionNext/commit/1bf7179d0af21fb433e4c7773504f244998678cb
 * @returns {JSX.Element}
 * @constructor
 */

const Twikoo = ({ isDarkMode }) => {
  React.useEffect(() => {
    twikoo({
      envId: BLOG.COMMENT_TWIKOO_ENV_ID, // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
      el: '#twikoo', // 容器元素
      lang: BLOG.LANG // 用于手动设定评论区语言，支持的语言列表 https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
      // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
      // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
    })
  })
  return (
   <div id="twikoo"></div>
  )
}
//判断网址,防止访客网址不写http和https
       function wangzhi(e){
        http = e.slice(0,4)
        https = e.slice(0,5)
        if (http == "http" || https == "https" ){
             return e
        } else if (e == "" || e == null || e == undefined){
          return e
        } else {
          e = 'http://'+ e
          return e
        }
    }
 
//调用twikoo最新评论主函数
function newcomment() {
    twikoo.getRecentComments({
        envId: BLOG.COMMENT_TWIKOO_ENV_ID, // 环境 ID
        pageSize: 7, // 获取多少条，默认：10，最大：100
        includeReply: false // 是否包括最新回复，默认：false
    }).then(function (res) {
        console.log(res);
        var hotComments = $("#hot-comments");
        for (var i = 0; i < res.length; i++) {
            if (i === 0) {
                console.log(res[0]);
            }
            var nick = res[i].nick;//访客姓名
            var content = res[i].commentText;//评论内容
            var newcontent = content.substring(0, 50); //字数截取后评论内容
            var url = res[i].url;//文章链接
            var avatar = res[i].avatar;//评论者头像
            var link = wangzhi(res[i].link);//评论者网址
            var updatedAt = res[i].relativeTime;//评论时间
            var commentId = '#' + res[i].id;//评论id
            hotComments.append('<li class="px1 pb2 flex items-center"><img style="width: 40px;height:40px" class="circle mx1 listavatar" src="' + avatar + '"><div class="w100"><div class="flex justify-between"><div class="h6 listauthor overflow-hidden" title="' + nick + '"><a  target="_blank" rel="noopener external nofollow noreferrer" href="' + link + '">' + nick + '</a></div><span class="h6 mr1 listdate wenzi hang1">' + updatedAt + '</span></div> <a href="' + url + commentId + '"><div class="h5 list-comcontent overflow-hidden">' + newcontent + '</div></a></div></li>');
        }
    }).catch(function (err) {
        console.error(err);
    });
}
 
$(function () {
    newcomment();//调用newcomment
});

export default Twikoo
