<template>
  <div  style="display: flex;justify-content: center;" >
    <el-footer class="mt-10 mb-3 z-1">
      <div>
        <el-tooltip content="此项目已开源" show-after="200">
          <el-link href="https://gitee.com/codesMines/codeminer-nav" target="_blank" class="mx-3"

          >
            <el-avatar :size="15" class="mr-1"
                       style="opacity: 0.75"
                       src="https://pica.zhimg.com/v2-77b1a31dc62d9e00abd0ea6cdaba5c83_l.jpg?source=3af55fa1"/>
            开源支持
          </el-link>
        </el-tooltip>
        <el-popover
            show-after="500"
            :width="250"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <el-link type="primary" class="mx-3">
              <el-avatar :size="15" class="mr-1"
                         style="opacity: 0.85"
                         src="https://ts1.cn.mm.bing.net/th/id/R-C.2fd89dbaf1e2ded9d445cd201cb30991?rik=LncqToyTJZxjwg&riu=http%3a%2f%2fpic.616pic.com%2fys_bnew_img%2f00%2f12%2f83%2fKI8PwStTPd.jpg&ehk=CfhvRf3cpXmQ4fZZQ0zs%2bVYUBdmJbhkr0O%2bpVq3wRqQ%3d&risl=&pid=ImgRaw&r=0"/>
              联系作者
            </el-link>
          </template>
          <template #default>
            <div
                class="demo-rich-conent"
                style="display: flex; gap: 16px; flex-direction: column"
            >
              <el-avatar
                  :size="64"
                  src="https://defaultdata-1311013567.cos.ap-nanjing.myqcloud.com/p8.png"
                  style="margin-bottom: 8px"
              />
              <div>
                <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">
                  QQ :2632141215
                </p>
                <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
                  Email:2632141215@qq.com
                </p>
              </div>
              <p class="demo-rich-content__desc" style="margin: 0">
                懒 ~~~~~~~~~~~~~~~~<br/>
                如有侵权请联系作者
              </p>
            </div>
          </template>
        </el-popover>
        <el-popover
            placement="top-start"
            trigger="hover"
        >
          <template #default>
            加油加油!
          </template>
          <template #reference>
            <el-link type="error" class="mx-3">
              👏支持一下
            </el-link>
          </template>
        </el-popover>
        <el-link type="info" class="mx-3" href="https://support.qq.com/product/450072">
          <span>
            <font-awesome-icon icon="fa-solid fa-bug"/>
              反馈
          </span>
        </el-link>
      </div>
      <div style="display: flex;justify-content: center" class="my-5">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45010702001942"
           style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="http://www.beian.gov.cn/img/ico.ico" style="float:left;"/>
          <p style="
          text-align: center;float:left;
          height:20px;
          line-height:20px;
          margin-left: 5px ;
          color:#939393;font-size: 14px">桂公网安备
            45010702001942号</p>
        </a>
      </div>


    </el-footer>
  </div>
</template>
<script>
/*
*
* todo 底部组件
* */
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">

.el-link {
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}


</style>