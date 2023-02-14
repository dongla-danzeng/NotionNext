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
twikoo.getRecentComments({
  envId: BLOG.COMMENT_TWIKOO_ENV_ID , // 环境 ID
  // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数
  pageSize: 10, // 获取多少条，默认：10，最大：100
  includeReply: false // 是否包括最新回复，默认：false
}).then(function (res) {
  console.log(res);
  // 返回 Array，包含最新评论的
  //   * id:           评论 ID
  //   * url:          评论地址
  //   * nick:         昵称
  //   * mailMd5:      邮箱的 MD5 值，可用于展示头像
  //   * link:         网址
  //   * comment:      HTML 格式的评论内容
  //   * commentText:  纯文本格式的评论内容
  //   * created:      评论时间，格式为毫秒级时间戳
  //   * avatar:       头像地址（0.2.9 新增）
  //   * relativeTime: 相对评论时间，如 “1 小时前”（0.2.9 新增）
  // 返回示例: [ // 从新到旧顺序
  //   { id: '', url: '', nick: '', mailMd5: '', link: '', comment: '', commentText: '', created: 0 },
  //   { id: '', url: '', nick: '', mailMd5: '', link: '', comment: '', commentText: '', created: 0 },
  //   { id: '', url: '', nick: '', mailMd5: '', link: '', comment: '', commentText: '', created: 0 }
  // ]
}).catch(function (err) {
  // 发生错误
  console.error(err);
});
export default Twikoo
