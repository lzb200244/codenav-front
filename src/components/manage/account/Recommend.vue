<template>
  <div class="common-layout">
    <el-container>
      <el-main class="p-2" style="overflow-y: hidden">
        <el-row :gutter="10" class="p-3 relative bg-light-50" style="margin-right: 0;margin-left: 0;">
          <p style="height: 60px;line-height: 40px ;font-size: 18px;">
            推荐
            <el-icon style="color: gold">
              <span class="mr-2 iconfont" style="font-size: 1.2em;">&#xe618;</span>
            </el-icon>
          </p>
          <el-divider class="mt-0"/>
          <el-input class="mb-8" v-model="search" placeholder="支持远程搜索~~~"/>
          <div style="position: absolute;right: 15px;top:1em">
            <el-popover
                placement="bottom-start"
                title="推荐获取金币"
                :width="300"
                trigger="hover">
              <template #default>
                <p>推荐成功获取1个金币,10个金币=1RMB
                  <el-icon style="font-size: 1.5em;color: gold">
                    <span class="iconfont">&#xe618;</span>
                  </el-icon>
                </p>
              </template>
              <template #reference>
                <el-button type="primary" class="mb-3 " style="float: right" @click="drawer2 = true" plain>

                  <span class="iconfont">  &#xe622;</span>
                  我要推荐
                </el-button>
              </template>
            </el-popover>
          </div>
        </el-row>
        <template v-if="recommends.length===0">
          <el-empty description="推荐获取积分~~~~~$$">
            <el-button type="primary" class="ml-1" @click="drawer2 = true">
              我要推荐
            </el-button>
          </el-empty>
        </template>
        <template v-else>
          <el-scrollbar height="500px">
            <list :SiteData="recommends" isType="recommend"/>
          </el-scrollbar>
        </template>
      </el-main>
    </el-container>
  </div>
  <el-drawer v-model="drawer2" direction="rtl" :size="windowWidth*0.3+200">
    <template #title>
      <p>推荐资源</p>
    </template>
    <el-row>
      <el-col :span="24">
        <el-form
            label-width="100px"
            ref="formNode"
            :model="Recommend"
            style="max-width: 500px"
            label-position="top"
            :rules="rules">
          <el-form-item label="网站名称" prop="name">
            <el-input v-model="Recommend.name" placeholder="请输入网站名称" clearable="true"/>
          </el-form-item>
          <el-form
              :model="Recommend"
              class="demo-form-inline"
              label-position="top"
              :rules="rules">

            <el-form-item label="网站地址" prop="site_url">
              <el-input v-model="Recommend.site_url" placeholder="请输入网站地址" clearable="true">
                <template #append>
                  <el-tooltip
                      class="box-item"
                      effect="light"
                      content="查看本站是否存在该资源"
                      placement="top-start">
                    <el-button @click="findExist(Recommend.site_url)">
                      <span class="iconfont">&#xe651;</span>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-input>

            </el-form-item>
            <el-avatar class="bg-light-500"
                       shape="square"
                       :size="50"
                       :src="Recommend.img_url"/>
            <el-popover
                :width="210"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
              <template #reference>
                <el-form-item prop="site_img">
                  <el-upload
                      class="upload-demo"
                      :ref="uploadRef"
                      :action="baseURL+'/operation/uploadfile'"
                      :limit="1"
                      :auto-upload="true"
                      name="site_img"
                      :on-success="uploadSuccess"
                      accept=".svgz,.jpg,.jpeg,.ico,.tiff,.gif,.svg,.jfif,.webp,.png,"
                  >
                    <template #trigger>
                      <el-button type="primary">上传图片</el-button>
                    </template>
                  </el-upload>
                  <el-button style="margin-left: 16px" @click="drawer = true" size="small">
                    本站图库
                  </el-button>
                </el-form-item>
              </template>
              <template #default>
                <div class="demo-rich-conent spider">
                  <el-avatar

                      :size="60"
                      src="https://www.ai8py.com/wp-content/uploads/2019/05/python-spider.png"
                      style="margin-bottom: 8px"
                  />
                  <div style="text-align: right; margin: 0">
                    <el-button size="small" type="primary" @click="SpiderTask">爬虫</el-button>
                  </div>
                  <div>
                    <p class=" font-bold text-xl" style="margin: 0; ">
                      Spider爬虫
                    </p>
                  </div>

                  <p class="demo-rich-content__desc" style="margin: 0;text-align: right;opacity: 0.7">
                    没有图片可以尝试爬虫获取
                  </p>
                </div>
              </template>
            </el-popover>

          </el-form>
          <el-drawer v-model="drawer" title="本站图库" :size="windowWidth*0.3+80">
            <images @sendImages="setImages" :ImagesList="$store.state?.allSelect?.img.siteImg"/>
            <template #footer>
              <div style="flex: auto">
                <el-button @click="cancelImages">取消</el-button>
                <el-button type="primary" @click="  this.drawer = false">确认</el-button>
              </div>
            </template>
          </el-drawer>
          <el-form-item label="推荐理由" prop="introduce">
            <el-input
                v-model="Recommend.introduce"
                placeholder="请输入理由:(可选)"
                clearable="true"
                :autosize="{ minRows: 4, maxRows: 5 }"
                type="textarea"
            />
          </el-form-item>
          <el-form-item label="网站类型" prop="datatype">

            <my-select @transfer="handleEvent"/>

          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消上传</el-button>
        <el-button type="primary" @click="confirmClick" :loading="loading">上传</el-button>
      </div>
    </template>
  </el-drawer>

</template>
<script>
import recommendRules from '@/validations/recommendRules';
import {recommend} from '@/apis/account';
import {spider} from '@/apis/operation';
import message, {Notification} from '@/utils/messager';
import axios from 'axios'
import list from '@/components/modules/account/list.vue'
import images from '@/components/modules/general/images.vue';
import mySelect from '@/components/modules/general/select.vue';

export default {
  name: 'Recommend',
  components: {
    images,
    list,
    mySelect
  },
  data() {
    return {
      drawer: false,
      baseURL: axios.defaults.baseURL,
      rules: recommendRules,
      windowWidth: 0,
      loading: false,
      search: '',
      uploadRef: '', //上传动态绑定
      drawer2: false,
      Recommend: {
        site_url: '',
        name: '',
        img_url: '',
        introduce: '',
        datatype: '',
      },
    };
  },
  created() {
    this.windowWidth = document.documentElement.clientWidth;
  },
  mounted() {
    /**
     * 请求判断
     * */
    this.$store.dispatch('recommendAsync')

  },
  methods: {
    handleEvent(value) {
      value = Object.values(value);
      this.Recommend.datatype = value
    },
    /**
     *检测用户推荐的项目是否已经存在
     */
    findExist(value) {
      return false
      // let url = `${this.baseURL.replace('api', '')
      //     .replace("8000", '5173')}detail/${item[0].uid}`;
      // Notification(`<a href="${url}" target="_blank">点击跳转</a>`, '该项目已经存在', 'warning',);
      // this.loading = false;
      // return false;
    },
    //取消本库图片的回调
    cancelImages() {
      this.Recommend.img_url = '';
      this.drawer = false;
    },
    //选择本站图片
    setImages(image) {
      this.Recommend.img_url = image;
    },
    //图片上传成功回调
    uploadSuccess(image) {
      this.Recommend.img_url = image;
    },
    //上传成功时的回调函数
    cancelClick() {
      //关闭drawer
      this.drawer2 = false;
      //关闭清除所有选项
      this.clearForm();
    },
    clearForm() {
      //关闭清除所有选项
      Object.keys(this.Recommend).forEach(item => {
        this.Recommend[item] = ''
      })
    },
    SpiderTask() {
      let that = this;
      this.$refs.formNode.validate((valid) => {
        if (!valid) {
          return false;
        }
        let url = that.Recommend.site_url;
        spider(url).then((response) => {
          if (![0, -1].includes(response.data)) {
            Notification('请继续下一步操作', 'success', '爬取成功')
            that.Recommend.img_url = response.data;
          } else {
            switch (response.data) {
              case 0:
                Notification('请检查地址是否正确或者手动上传', '未嗅觉到资源', 'warning',);
                break;
              default:
                Notification('请检查地址是否正确或者手动上传', '非法url地址', 'error')
            }
          }
        })
      })
    },
    confirmClick() {
      /**
       * 是否存在已经推荐该资源
       */
          // if (!this.findExist(this.Recommend.site_url,)) return
          //提交推荐回调
      let that = this;
      this.$refs.formNode.validate((valid) => {
        if (!valid) return false;
        that.loading = true;
        // 这里就是处理的事件
        recommend(that.Recommend).then(res => {
          Notification(`当前积分${parseInt(that.$store.state.user.score) + 1}`, '推荐成功积分+1')
          that.$store.commit('setMoreRecommend', [{
            ...that.Recommend,
            isvalid: '审核中',
            uid: res.data.uid,
          }])
          that.loading = false
          that.clearForm()
        }).catch(res => {
          message('推荐失败', 'warning')
        })
        // //提交

      })
    },
  },
  computed: {
    recommends() {
      //      if (Object.keys(this.$store.state.recommends).length === 0) {
      let recommend = this.$store.state.Account.recommends

      if (recommend?.length === 0) {
        /**
         *没有推荐过
         * */
        return []
      }
      /**
       * 搜索过滤
       */
      return recommend.filter(item => item.name.includes(this.search));
    }
  }
}
</script>
<style scoped>
.spider {
  display: flex;
  gap: 16px;
  flex-direction: column
}
</style>
