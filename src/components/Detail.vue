<template>
  <div class="common-layout " style="background:#f0f2f5;">

    <el-container v-scroll="detail!==''">
      <el-main v-if="detail!==''">

        <el-row class="p-0 min-h-130 " :gutter="10">
          <el-col :xs="24" :sm="24" :md="16">
            <el-main class="m-0 p-0 ">

              <el-card class="box-card mx-4" shadow="never">
                <template #header>
                  <div class="card-header">
                    <span>资源详细</span>
                  </div>
                </template>
                <div class="text item min-h-100  ">
                  <el-row class="item-center ">
                    <div class="demo-image__preview">
                      <el-image
                          style="width: 100px; height: 100px;"
                          :src="siteDetail.img_url"
                          :preview-src-list="[siteDetail.img_url]"
                          :initial-index="4"
                          fit="cover"
                      >
                        <template #error>
                          <div class="image-slot">

                            <el-image
                                style="width: 100px; height: 100px;"
                                src="https://img.tukuppt.com/ad_preview/00/13/31/5ca5b3bc46ce1.jpg-0.jpg!/fw/288"
                                preview-src-list="['https://img.tukuppt.com/ad_preview/00/13/31/5ca5b3bc46ce1.jpg-0.jpg!/fw/288']"
                                :initial-index="4"
                                fit="cover"
                            />
                          </div>
                        </template>
                      </el-image>
                    </div>
                  </el-row>

                  <el-row class="item-center " style="margin-bottom:  2px;">
                    <h1 class="text-xl">{{ siteDetail.name }}</h1>
                  </el-row>

                  <el-row class="item-center " size="small" style="margin-top: 0;"
                          v-if="collect">
                    <el-popconfirm
                        v-if="rated"
                        confirm-button-text="好的!我已知道"
                        cancel-button-text=" "
                        confirm-button-type="success"
                        :title="'该站点平均分为 : '+rating.rating">
                      <template #reference>
                        <el-rate v-model="rating" disabled allow-half/>
                      </template>
                    </el-popconfirm>
                    <el-popconfirm v-else
                                   @confirm="sendRating(siteDetail.uid)"
                                   :title="'是否提交当前评分:'+rating+'?'">
                      <template #reference>
                        <el-rate v-model="rating" allow-half/>
                      </template>
                    </el-popconfirm>
                  </el-row>

                  <el-row class="item-center " size="small" style="margin-top: 0;" v-else>
                    <el-popconfirm
                        confirm-button-text="好的!我已知道"
                        cancel-button-text=" "
                        confirm-button-type="success"
                        :title="'该站点平均分为 : '+rating"
                    >
                      <template #reference>
                        <el-rate v-model="rating" disabled allow-half/>
                      </template>
                    </el-popconfirm>
                  </el-row>
                  <el-row class="item-center " style="margin-top: 2px;">
                    <el-button-group>
                      <el-button type="warning" text>
                        <span class="iconfont">&#xe641;</span>
                        <span>{{ siteDetail.show }}</span>
                      </el-button>
                      <el-button type="error"
                                 text
                                 v-if="collect"
                                 @click="clickStarUnstar(siteDetail.uid,collect,)">
                        <span class="iconfont">&#xe849;</span>
                        <span>{{ siteDetail.collect_num }}</span>
                      </el-button>
                      <el-button
                          v-else
                          style="color: #afafaf"
                          @click="clickStarUnstar(siteDetail.uid,collect,)"
                          text>
                        <el-icon>
                          <span class="iconfont">&#xe7df;</span>
                        </el-icon>
                        <span>
                          {{ siteDetail.collect_num }}
                        </span>
                      </el-button>

                      <el-button type="primary" text>
                        <el-icon @click="copyUrl(siteDetail.site_url)">
                          <span class="iconfont">&#xe8b1;</span>
                        </el-icon>
                      </el-button>
                    </el-button-group>
                  </el-row>

                  <el-row class="item-center">
                    <el-tag class="m-1 mt-2  " v-for="type in siteDetail.datatype " :key="type">
                      {{ type }}
                    </el-tag>
                  </el-row>
                  <div>
                    <el-row class="mt-2">
                    <span>友情链接:
                      <el-link type="primary" :href=siteDetail.site_url target="_blank">
                        {{ siteDetail.site_url }}
                      </el-link>
                    </span>
                    </el-row>
                    <el-row class="mt-3">
                      <span>简介: </span>
                      <p>{{ siteDetail.introduce }}</p>
                    </el-row>
                    <el-row class="mt-5">
                      <span>更新时间:{{ siteDetail.update_time }}</span>
                    </el-row>
                    <el-row v-if="siteDetail?.recommend?.recommend_avatar==='key'" class="mt-5">

                      <span>推荐者:</span>
                      <el-avatar :size="35" class="bg-blue-400">
                        {{ siteDetail?.recommend?.name.slice(0, 1) }}
                      </el-avatar>
                    </el-row>
                    <el-row v-else class="mt-2">
                      <span class="mt-2 mr-2">推荐者:</span>
                      <el-avatar :size="35"
                                 :src="siteDetail?.recommend?.recommend_avatar"/>
                    </el-row>
                  </div>
                  <el-divider/>
                  <el-row class="center mb-0">

                    <span class="iconfont">&#xe6d6;</span>
                    <span class="iconfont">&#xe816;</span>
                    <span class="iconfont">&#xe8b1;</span>

                  </el-row>
                </div>
              </el-card>

            </el-main>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8">
            <el-main class="m-0 p-0 mx-4">
              <el-card class="box-card" shadow="never" style="width: 100%">
                <template #header>
                  <div class="card-header ">
                    <span>类似资源</span>
                  </div>
                </template>
                <div v-loading="detail===''" class="text item min-h-100 " style="width: 100%;">
                  <card :autoWidth="false" :ShowCount="randomRecommend" :showBoard="{border:1}" :showOption="false"/>
                </div>
              </el-card>
            </el-main>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" class="mt-8">
            <el-main class="m-0 p-0 mx-4">
              <el-card class="box-card" shadow="never">
                <template #header>
                  <div class="card-header">
                    <span>评 论</span>
                  </div>
                </template>
                <el-scrollbar :height="scrollbar">
                  <el-badge :is-dot="!is_show" class="m-5" style="float: right">
                    <el-button @click="comment_show" :disabled="is_show">查看全部评论</el-button>
                  </el-badge>
                  <div class="comment-view" style="padding: 0" v-if="is_show" v-loading="!is_show">
                    <u-comment :config="config" @submit="submit" @like="like">
                      <!-- <template #list-title>全部评论</template> -->
                    </u-comment>
                  </div>
                </el-scrollbar>
              </el-card>

            </el-main>
          </el-col>
        </el-row>
      </el-main>
      <el-main v-else>
        <el-empty description="未找到资源~~~~~" :image-size="250"/>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import card from '@/components/modules/card.vue'
import emoji from '/public/emoji'
import message from '@/utils/messager';
import {getAllComment, Reply, getSiteDetail, Option} from '@/apis/operation';

import {markStarPost} from '@/apis/operation';
import require_auth from '@/mixins/require_auth'
import site_option from "@/mixins/site_option";

export default {
  components: {
    card
  },
  mixins: [require_auth, site_option],
  data() {
    return {
      detail: '',
      uid: '',
      scrollbar: '100px',
      rating: 0,
      collect: false, //收藏了?
      rated: false,
      is_show: false, //是否可看评论(登录
      //评论组件配置
      config: {
        user: {
          //this.$store.state.user[0]?.detail;
          id: this.$store.state.Account.user ?
              this.$store.state?.Account.user?.detail?.pk : '',
          username: this.$store.state?.Account.user ?
              this.$store.state?.Account.user?.detail?.name : '',
          avatar: this.$store.state?.Account.user ?
              this.$store.state?.Account.user?.detail?.userAvatar : '',
          // 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
          likes: [],//用户点赞对象
          content: '',
        },
        emoji: emoji,//表情
        comments: []
      }
    }
  },
  computed: {
    //随机推荐显示的数据
    randomRecommend() {
      let random = Math.floor(Math.random() * 10);
      return {start: random, end: random + 2}
    },
    //当前数据对象
    siteDetail() {
      return this.detail;
    }
  },
  created() {
    //初始化uid
    this.uid = this.$route.params.uid;
  },
  mounted() {
    //请求当前uid对象数据
    getSiteDetail(this.uid).then(res => {
      this.detail = res.data;
      if (this.detail.uid) { //是否存在该对象
        this.rate = this.detail.rating //注意undifferentiated {rated:boolean,rating:number}
        this.rated = this.rate.rated //是否评
        this.rating = this.rate.rating //评分
        this.collect = this.detail?.sitedatauser?.star

      }
    })
  },
  methods: {
    /**
     * 查看评论列表
     */
    comment_show() {
      //判断当前用户是否登入
      if (this.loginRequire) return;
      //生成评论请求
      getAllComment(this.uid).then((res) => {
        this.config.comments = res.data;
        this.scrollbar = '800px';
        this.is_show = true;
      })
    },
    /**
     * 收藏改项目
     * */
    clickStarUnstar(uid, status) {
      if (this.loginRequire) return;
      let temp = this.detail;
      markStarPost(uid, status).then((res) => {
        this.collect = !status;
        status ? this.detail.collect_num-- : this.detail.collect_num++;
        if (status) {
          message('取消收藏');
        } else message('收藏成功');
      }).catch(() => {
        this.detail = temp;
      })
    },
    /**
     * 提交评论
     * */
    submit(content, parentId, finish) {
      Reply(this.uid, content, parentId).then((response) => {
        this.config.comments.push(response.data);
        message('评论成功');
      }).catch((response) => {
        if (response.data.code !== 1202) {
          message('评论失败', 'error');
        }

      })
    },
    /**
     * 评分
     * */
    sendRating(uid) {
      let that = this;
      Option(null, 3, uid, this.rating).then((response) => {
        // if (response.data == 1)
        message('评分成功')
        this.rated = true;

      }).catch(() => {
        that.rating = 0
      })
    },
    /**
     *点赞
     * @param id
     */
    like(id) {
      let that = this;
      //todo 喜欢有问题没有与用户绑定关系所有无限点赞
      const likes = that.config.user.likes;
      if (likes.indexOf(id) === -1) {
        // 点赞 --后端接口处理
        Option(id, 1);
        likes.push(id);
        that.editLike(id, 1);
      } else {
        // 取消点赞 --后端接口
        likes.splice(likes.findIndex(item => item === id), 1);
        Option(id, 2);
        that.editLike(id, -1);
      }
    },
    editLike(id, count) {
      let tar = null;
      let that = this;
      that.config.comments.forEach(v => {
        if (v.id !== id) {
          tar = v.reply?.list.find(v => v.id === id);
        } else {
          tar = v;
        }
        if (tar) {
          tar.like += count;
        }
      })
    }
  }
}


</script>

<style scoped>
.el-divider {
  padding: 0;
  margin-top: 10px;
}

.item-center {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}

::v-deep .el-card.box-card.card {
  min-width: 350px;

}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}


.item {
  margin-bottom: 18px;
}

span > i {
  font-size: 1.1rem;
}

.star {
  color: #f83636;
}

.unstar {
  color: #9e9191;
}

.el-card {
  border: none;
}
</style>
