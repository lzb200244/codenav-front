<!--card组件-->
<template>
  <el-col :xs="24" :sm="autoWidth?12:24" :md="autoWidth?8:24" class="mb-6"
          v-for="(item,index) in SiteData"
          :key="item.uid">
    <el-card
        class="box-card max-h-68 card"
        :style="showBoard"
        :shadow="showStyle">
      <el-skeleton :rows="6" animated default="attrs" v-show="Loading"></el-skeleton>
      <div @click="toDetail(item.uid)">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-avatar :src="item.img_url" class="bg-light-400" shape="square" :size="65">

            </el-avatar>
            <el-rate
                v-model="item.rating.rating"
                disabled
                size="small"
                style="height: 2rem;"/>
          </el-col>
          <el-col :span="13" class="ml-6">
            <div class="max-h-30 max-w-40 text-handle ">
              <h1 class="text-xl font-500 pb-1 card-title ">{{ item.name }}</h1>
              <p class=" text-left  "
                 style="letter-spacing: 0.095em;font-size: 0.8rem">
                {{ item.introduce }}
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 4.2em" class="text-handle ">
          <el-col :span="20" :push="2" class="mt-1">
            <el-tag style="float: right" class=" m-1" v-for="(type,index1 ) in item.datatype " :key="item.uid">
              {{ type }}
            </el-tag>

          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" class="center px-8 divide pt-2 " v-if="showOption">
        <el-tooltip
            v-if="item.sitedatauser.star"
            class="box-item"
            effect="dark"
            content="取消收藏"
            show-after="300"
            placement="top">
          <el-button
              type="text"
              class="ico1"
              @click="clickStarUnstar(item.uid,item.sitedatauser.star)">
            <span class="iconfont" style="color: #ff8080">&#xe849;</span>
            <span style="font-size: 8px;color: #afafaf">{{ item.collect_num }}</span>
          </el-button>
        </el-tooltip>
        <el-tooltip
            v-else
            class="box-item"
            effect="dark"
            content="加入收藏"
            show-after="300"
            placement="top">
          <el-button type="text" class="ico" @click="clickStarUnstar(item.uid,item.sitedatauser.star)">
            <span class="iconfont">&#xe7df;</span>
            <span style="font-size: 8px;color: #afafaf">{{ item.collect_num }}</span></el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            show-after="300"
            content="分享">
          <el-button type="text" class="ico" @click="copyUrl(item.site_url)"
          ><span class="iconfont">&#xe8b1;</span></el-button>

        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            show-after="300"
            content="访问">
          <el-button type="text" class="ico" @click="toSite(item.site_url)"
          ><span class="iconfont">&#xe6d6;</span>
          </el-button>
        </el-tooltip>
      </el-row>
    </el-card>
  </el-col>
</template>

<script>
import require_auth from '@/mixins/require_auth'
import site_option from '@/mixins/site_option'

/*
* todo 卡片组件展示数据
*
* */
export default {
  mixins: [require_auth, site_option],
  props: {
    //是否需要显示加载
    Loading: {
      type: Boolean,
      default: false
    },
    SiteData: {
      type: Array,
      default: []
    },
    autoWidth: {
      type: Boolean,
      default: true
    },
    //传进来的数据
    //每页显示个数
    ShowCount: {
      type: Object,
      default: {start: 0, end: 12}
    },
    //card样式
    showStyle: {
      type: String,
      default: 'hover'
    },
    //是否显示card-board
    showBoard: {
      type: Object,
      default: {
        border: 0,
      }
    },
    //是否显示操作收藏与分享
    showOption: {
      type: Boolean,
      default: true
    }
  },
}
</script>
<style scoped lang="scss">
$default-size: 1.3em;
.card-title {
  overflow: hidden;
  color: rgba(0, 0, 0, .85);
  white-space: nowrap;
  text-overflow: ellipsis;
}


.demo-button-style {
  margin-top: 24px;
}

::v-deep div.el-row.text-handle {
  height: 75px;
}

::v-deep.demo-tabs {
  .el-tabs__item {
    margin-left: 1em;
  }

  span {
    border: none;
    padding: 6px;
  }
}


::v-deep .el-rate span i {
  width: 10px;
}

::v-deep .el-card__body {
  padding-bottom: 1rem;

  button.ico1 {
    font-size: $default-size;
    color: #ff5555;

    &:hover {
      color: #ee8989;
    }
  }
}


.ico {
  font-size: $default-size;
  color: #afafaf;
}


</style>
