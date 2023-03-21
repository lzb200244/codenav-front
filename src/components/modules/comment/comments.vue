<template>
  <div style="width: 100%;" class="mt-15 ml-15">
    <template v-if="comment.replays">
      <template v-for="item in comment.replays">
        <char-card :chat="item" :config="{style:{height:'30px'},isShowComments:false}"/>
        <div>
          <comments :comment="item"></comments>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import {mapState} from "vuex";
import CharCard from "@/components/modules/comment/charCard.vue";

export default {
  components: {
    CharCard
  },
  props: {
    comment: {
      type: Object,
      default: []
    },


  },
  computed: {
    ...mapState({
      chats: state => state.Hall.chats
    }),
  }
}

</script>

<style scoped>

</style>