import Note from "@/apis/notes";
import { Message } from "element-ui";

const state = {
  notes: null,
  curNoteId: null
};

const getters = {
  notes: state => state.notes || [],
  curNote: state => {
    if (!Array.isArray(state.notes)) {
      return {title:'',content:''};
    }
    if (!state.curNoteId) {
      return state.notes[0] || {title:'',content:''}; // 不加这个容易报错，当notebook为[]的时候
    }
    return state.notes.find(note => note.id == state.curNoteId) || {title:'',content:''};
  }
};

const mutations = {
  setNote(state, payload) {
    state.notes = payload.notes;
  },

  addNote(state, payload) {
    state.notes.unshift(payload.note);
  },

  updateNote(state, payload) {
    let note = state.notes.find(note => note.id === payload.noteId) || {};
    note.title = payload.title;
    note.content = payload.content;
  },

  deleteNote(state, payload) {
    console.log(111)
    state.notes = state.notes.filter(note => note.id !== payload.noteId);
  },

  setCurNote(state, payload) {
    state.curNoteId = payload.curNoteId;
  }
};

const actions = {
  getNotes({ commit }, { notebookId }) {
    return Note.getAll({ notebookId }).then(res => {
      commit("setNote", { notes: res.data });
    });
  },

  addNote({ commit }, { notebookId, title, content }) {
    return Note.addNote({ notebookId }, { title, content }).then(res => {
      commit("addNote", { note: res.data });
      // Message.success(res.msg);
    });
  },

  updateNote({ commit }, { noteId, title, content }) {
    return Note.updateNote({ noteId }, { title, content }).then(res => {
      commit("updateNote", {
        noteId,
        title,
        content
      });
      // Message.success(res.msg);
    });
  },

  deleteNote({ commit }, { noteId }) {
    return Note.deleteNote({ noteId }).then(res => {
      commit("deleteNote", { noteId });
      Message.success(res.msg);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
