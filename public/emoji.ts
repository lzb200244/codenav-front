const raw = '/static'

const faceList = [`${raw}/emoji/smile.webp`, `${raw}/emoji/tv/tv.webp`]

const emojiList: {}[] = [
    {
        '[口罩]': `${raw}/emoji/kouzhao.webp`,
        '[狗头]': `${raw}/emoji/goutou.webp`,
        '[微笑]': `${raw}/emoji/smile.webp`,
        '[OK]': `${raw}/emoji/ok.webp`,
        '[星星眼]': `${raw}/emoji/star.webp`,
        '[辣眼睛]': `${raw}/emoji/layanjing.webp`,
        '[吃瓜]': `${raw}/emoji/chigua.webp`,
        '[滑稽]': `${raw}/emoji/huaji.webp`,
        '[呲牙]': `${raw}/emoji/teeth.webp`,
        '[打call]': `${raw}/emoji/dacall.webp`,
        '[喝酒]': `${raw}/emoji/hejiu.webp`,
        '[乖]': `${raw}/emoji/guai.webp`,
        '[吐舌]': `${raw}/emoji/tushe.webp`,
        '[汗]': `${raw}/emoji/han.webp`,
        '[大哭2]': `${raw}/emoji/daku.webp`,
        '[超赞]': `${raw}/emoji/chaozan.webp`,
        '[超开心]': `${raw}/emoji/chaokaixin.webp`,
        '[委屈]': `${raw}/emoji/weiqu.webp`,
        '[困狗]': `${raw}/emoji/kungou.webp`,
        '[藏狐]': `${raw}/emoji/zanghu.webp`,
        '[脸红]': `${raw}/emoji/lianhong.webp`,
        '[脱单doge]': `${raw}/emoji/doge.webp`,
        '[给心心]': `${raw}/emoji/heart.webp`,
        '[笑]': `${raw}/emoji/dx.webp`,
        '[哦呼]': `${raw}/emoji/oh.webp`,
        '[嫌弃]': `${raw}/emoji/xq.webp`,
        '[喜欢]': `${raw}/emoji/like.webp`,
        '[酸了]': `${raw}/emoji/sl.webp`,
        '[大哭]': `${raw}/emoji/dq.webp`,
        '[害羞]': `${raw}/emoji/hx.webp`,
        '[无语]': `${raw}/emoji/wy.webp`,
        '[疑惑]': `${raw}/emoji/yh.webp`,
        '[调皮]': `${raw}/emoji/tiaopi.webp`,
        '[笑哭]': `${raw}/emoji/xiaoku.webp`,
        '[奸笑]': `${raw}/emoji/jianxiao.webp`,
        '[偷笑]': `${raw}/emoji/touxiao.webp`,
        '[大笑]': `${raw}/emoji/daxiao.webp`,
        '[阴险]': `${raw}/emoji/yinxian.webp`,
        '[捂脸]': `${raw}/emoji/wulian.webp`,
        '[惊喜]': `${raw}/emoji/jingxi.webp`,
        '[惊讶]': `${raw}/emoji/jingya.webp`,
        '[捂脸哭]': `${raw}/emoji/wulianku.webp`,
        '[妙啊]': `${raw}/emoji/miaoa.webp`,
        '[鼓掌]': `${raw}/emoji/guzhang.webp`,
        '[尴尬]': `${raw}/emoji/ganga.webp`,
        '[冷]': `${raw}/emoji/cold.webp`,
        '[灵魂出窍]': `${raw}/emoji/linghunchuqiao.webp`,
        '[傲娇]': `${raw}/emoji/aojiao.webp`,
        '[疼]': `${raw}/emoji/teng.webp`,
        '[吓]': `${raw}/emoji/xia.webp`,
        '[生病]': `${raw}/emoji/shengbing.webp`,
        '[吐]': `${raw}/emoji/tu.webp`,
        '[嘘声]': `${raw}/emoji/xusheng.webp`,
        '[捂眼]': `${raw}/emoji/wuyan.webp`,
        '[思考]': `${raw}/emoji/sikao.webp`,
        '[再见]': `${raw}/emoji/zaijian.webp`,
        '[翻白眼]': `${raw}/emoji/fanbaiyan.webp`,
        '[哈欠]': `${raw}/emoji/haqian.webp`,
        '[奋斗]': `${raw}/emoji/fengdou.webp`,
        '[墨镜]': `${raw}/emoji/mojing.webp`,
        '[撇嘴]': `${raw}/emoji/piezui.webp`,
        '[难过]': `${raw}/emoji/nanguo.webp`,
        '[抓狂]': `${raw}/emoji/zhuakuang.webp`,
        '[生气]': `${raw}/emoji/shengqi.webp`,
        '[爱心]': `${raw}/emoji/aixin.webp`,
        '[胜利]': `${raw}/emoji/shengli.webp`,
        '[抱拳]': `${raw}/emoji/baoquan.webp`,
        '[保佑]': `${raw}/emoji/baoyou.webp`,
        '[支持]': `${raw}/emoji/zhichi.webp`
    },
]

//把emojiList数组中的每一个对象，放到emojiMap中方便取用
function allEmoji(): {} {
    let emojiMap = {}
    emojiList.map(emojis => (emojiMap = {...emojiMap, ...emojis}))
    return emojiMap
}

export default {
    faceList,
    emojiList,
    allEmoji: allEmoji()
}
