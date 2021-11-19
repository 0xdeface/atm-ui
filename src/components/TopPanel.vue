<template>
  <header>
    <div class="ui four item menu">
      <router-link to="/" class="item">Список документов</router-link>
      <router-link to="/make-order" class="item">Создать чек</router-link>
      <div class="kkm item">
        cмена:&nbsp; <strong>{{ shiftState.text }}</strong>&nbsp;
        | &nbsp;&nbsp;
        <button class="close-kkm" @click="shiftAction()"> {{ shiftState.button }}</button>
      </div>
      <a class="item" @click="save">
        Выгрузить выделенные
      </a>
    </div>
  </header>
</template>

<script>
import {closeShift, download, getShiftState, openShift} from "@/service";
import {mapState} from "vuex";
import {shiftIsClose, shiftIsExpired, shiftIsOpen} from "@/common";


export default {
  name: "TopPanel",
  data: () => ({status: "открыта", action: "закрыть", downloadUrl:""}),
  methods: {
    save: function () {
      download(this.$store.state.exportDocs).then((r)=>{
        const bytes = new TextEncoder().encode(JSON.stringify(r));
        const blob = new Blob([bytes], {type: "application/json;charset=utf-8"});
        const url = window.URL.createObjectURL(blob)
        window.open(url)
      })
    },
    shiftAction: function () {
      console.log(this.shiftState.status, shiftIsClose)
      if (this.shiftState.status === shiftIsClose) {
        openShift().then(this.shiftUpdater)
        return
      }
      if (this.shiftState.status === shiftIsOpen || this.shiftState.status === shiftIsExpired) {
        closeShift().then(this.shiftUpdater)
        return;
      }
      alert("unexpected status")
    },
    shiftUpdater: function (r) {
      if (r.errors !== undefined && r.errors.length > 0) {
        r.errors.forEach((err) => alert(err))
        return
      }
      this.$store.commit("setShiftState", r.shift)
    }
  }
  ,
  computed: {
    ...
        mapState({
          shiftState: state => state.shiftState,
        })
  }
  ,
  created() {
    getShiftState().then(this.shiftUpdater)
  }
}
</script>

<style scoped>
header {
  max-width: 900px;
  margin: 0 auto !important;
}

.close-kkm {
  background: #dfdfdf;
  outline: none;
  border: 1px solid #988f8f;
  border-radius: 2px;
  padding: 3px 18px;
  cursor: pointer;
}

.close-kkm:hover {
  background: #e7aeae;
  outline: none;
  border: 1px solid #e47171;
  border-radius: 2px;
  padding: 3px 18px;
  cursor: pointer;
}

.kkm {
  padding: 0px 15px;
  display: flex;
  align-items: center;
}
</style>
