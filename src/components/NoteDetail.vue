<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="arr => (notes = arr)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id" class="note-detail-ct">
        <div class="note-bar">
          <span>创建日期：{{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span
            class="iconfont icon-fullscreen"
            @click="isShowPreview = !isShowPreview"
          ></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model="curNote.title"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入标题"
          />
        </div>
        <div class="editor">
          <textarea
            v-show="!isShowPreview"
            v-model="curNote.content"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入内容，支持markdown语法"
          ></textarea>
          <div
            class="preview markdown-body"
            v-show="isShowPreview"
            v-html="previewContent"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Auth from "@/apis/auth";
import NoteSidebar from "@/components/NoteSidebar.vue";
// import Bus from "@/helpers/bus";
import _ from "lodash";
// import Notes from "@/apis/notes";
import MarkdownIt from "markdown-it";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

let md = new MarkdownIt();

export default {
  components: { NoteSidebar },
  data() {
    return {
      statusText: "笔记未改动",
      isShowPreview: false
    };
  },

  created() {
    this.checkLogin({ path: "/login" })
    // Auth.getInfo().then(res => {
    //   if (!res.isLogin) {
    //     this.$router.push({ path: "/login" });
    //   }
    // });
  },

  computed: {
    ...mapGetters(["notes", "curNote"]),
    previewContent() {
      return md.render(this.curNote.content || "");
    }
  },

  methods: {
    ...mapMutations(["setCurNote"]),

    ...mapActions(["updateNote", "deleteNote",'checkLogin']),
    // 这个test是用来测试created阶段获取curNote不使用eventBus行不行的
    // test(val){
    //   this.curNote = val.find(note => note.id == this.$route.query.noteId) || {}
    // }

    onUpdateNote: _.debounce(function() {
      if(!this.curNote.id) return
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content
      })
        .then(res => {
          this.statusText = "已保存";
        })
        .catch(err => {
          this.statusText = "保存出错";
        });
    }, 300),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then(res => {
        // this.notes.splice(this.notes.indexOf(this.curNote), 1);
        this.$router.replace({ path: "/note" });
      });
    }
  },

  beforeRouteUpdate(to, from, next) {
    // console.log("beforeRouteUpdate");
    // console.log(to, from);
    this.setCurNote({ curNoteId: to.query.noteId });
    // 这个curNote是notes里的一项，指针指过去的引用类型。
    // 注意：下面的curNote是从vuex里的getter拿出来的，不能直接这么修改，得去vuex里改!!!
    // this.curNote = this.notes.find(note => note.id == to.query.noteId) || {};
    next();
  }
};
</script>

<style scoped lang="less">
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
