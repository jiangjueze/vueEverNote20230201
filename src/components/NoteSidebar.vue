<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="notebook in notebooks"
          :command="notebook.id"
          :key="notebook.id"
          >{{ notebook.title }}</el-dropdown-item
        >
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
import Bus from "@/helpers/bus";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  created() {
    this.getNotebooks()
      .then(() => {
        // this.$store.commit("setCurBook", {
        //   curBookId: this.$route.query.notebookId
        // });
        this.setCurBook({ curBookId: this.$route.query.notebookId });
        // console.log(this.curBook, "111");
        return this.getNotes({ notebookId: this.curBook.id });
      })
      .then(() => {
        // this.$store.commit("setCurNote", {
        //   curNoteId: this.$route.query.noteId
        // });
        this.setCurNote({ curNoteId: this.$route.query.noteId });
      });

    // Notebooks.getAll()
    //   .then(res => {
    //     this.notebooks = res.data;
    //     this.curBook =
    //       this.notebooks.find(
    //         notebook => notebook.id == this.$route.query.notebookId
    //       ) ||
    //       this.notebooks[0] ||
    //       {};
    //     return Notes.getAll({ notebookId: this.curBook.id });
    //   })
    //   .then(res => {
    //     this.notes = res.data;
    //     this.$emit("update:notes", this.notes);
    //     // this.$emit('test', this.notes)
    //     Bus.$emit("update:note", this.notes);
    //   });
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["notebooks", "notes", "curBook"])
  },

  methods: {
    ...mapMutations(["setCurBook", "setCurNote"]),
    ...mapActions(["getNotebooks", "getNotes", "addNote"]),

    handleCommand(notebookId) {
      if (notebookId == "trash") {
        return this.$router.push({ path: "/trash" });
      }
      this.$store.commit("setCurBook", { curBookId: notebookId });
      // this.curBook = this.notebooks.find(notebook => notebook.id == notebookId);
      this.getNotes({ notebookId }).then(() => {
        console.log(notebookId, this.notes);
      });

      // Notes.getAll({ notebookId }).then(res => {
      //   this.notes = res.data;
      //   this.$emit("update:notes", this.notes);
      //   Bus.$emit("update:note", this.notes);
      // });
    },

    onAddNote() {
      this.addNote({ notebookId: this.curBook.id });
    }
  }
};
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
</style>
