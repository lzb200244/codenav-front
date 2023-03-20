<!--select组件-->
<template>
  <el-select
      filterable
      size="large"
      placement="bottom-start"
      @change="SelectChange"
      v-model="selects"
      multiple
      multiple-limit="5"
      style="width: 100%;"
      placeholder="试试远程筛选~~~~~">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <template v-if="selectOption!==null" v-for="item in selectOption" :key="item">
        <el-tab-pane :label="item" :name="item"></el-tab-pane>
      </template>
    </el-tabs>
    <el-option
        v-for="item in s"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
  </el-select>
</template>
<script>


export default {
  name: "Select",
  props: {
    selected: {
      type: Array,
      default: [],
    }
  },


  data() {
    return {
      selects: [],
      activeName: '推荐',
      selectItem: '推荐',
      s: [{value: 1, label: 2}]
    }
  },
  mounted() {
    this.selects = this.selected.map(item => item.value) ?? []
 
  },
  computed: {
    selectOption() {
      let allSelect = this.$store.state.Operation.allSelect
      if (allSelect !== null) {
        return Object.keys(allSelect.select)
      }
      return allSelect
    }
  },
  methods: {
    /**
     *
     * 点击tab标签事件
     */
    handleClick(value) {

      this.selectItem = value.props.name
      this.s = this.$store.state?.Operation.allSelect?.select[this.selectItem]
    },
    /**
     * 通知选线修改
     * @constructor
     */
    SelectChange() {
      this.$emit("transfer", this.selects);
    }
  },
}

</script>

<style scoped>
.el-tabs.el-tabs--top.demo-tabs {
  height: 45px;
}

.el-select-dropdown.is-multiple li {
  padding-left: 15px;
  margin-bottom: 5px;
}

ul.el-scrollbar__view li {
  float: left;
  padding: 2px 5px;
  font-size: 1em;
}

::v-deep .el-tabs__nav:first-child {
  padding: 0 15px;
  height: 35px !important;
}
</style>
