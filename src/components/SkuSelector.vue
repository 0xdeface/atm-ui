<template>
  <div class="sku-selector" v-if="visible">
    <div class="wrapper">
      <div class="actions">
        <div class="ui input">
          <input type="text" placeholder="Поиск..." @change="filter($event)">
        </div>
        <div class="ui buttons">
          <button class="ui positive button" @click="finish()">Перенести в документ</button>
          <div class="or"></div>
          <button @click="closeSelector()" class="ui button">Отменить и закрыть</button>
        </div>


      </div>
      <table class="sku-available ui celled table compact">
        <tr class="sku" v-for="i of available" :key="i.code" @click="push(i)">
          <td>{{ i.code }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.price }}</td>
          <td>{{ i.count }}</td>
        </tr>
      </table>
      <div class="selected">
        <h2>Подобранные товары:</h2>
        <div class="ui ordered list">
          <div class="selected-sku item" v-for="(elem, index) of elems" :key="index">
            [{{ elem.code }}] {{ elem.name }} : <span class="cnt" @click="changeCnt(index)">{{ elem.count }}</span> шт
            <span @click="remove(index)" class="ui negative basic button">
              <i class="ban icon"></i>убрать</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {getSku} from "@/service";

export default {
  name: 'SkuSelector',
  data: () => ({
    elems: [],
    available: [],
  }),
  computed: mapState({
    visible: state => state.selectorIsShowed,
  }),
  created: function () {
    getSku().then(r => this.available = r)
  },
  methods: {
    changeCnt: function (index) {
      this.elems[index].count = prompt("введите количество", this.elems[index].count)
    },
    closeSelector: function () {
      this.$store.commit('hideSkuSelector')
    },
    push: function (i) {
      let cnt = prompt("введите количество", 1)
      if (isNaN(parseInt(cnt))) {
        cnt = 1;
      }
      this.elems.push({...i, count:cnt})


    },
    remove: function (index) {
      this.elems.splice(index, 1)
    },
    finish: function () {
      this.$store.commit('setSelectedSku', this.elems)
      this.elems = []
      this.$store.commit('hideSkuSelector')
      this.$emit('finish')
    },
    filter: function (event) {
      getSku(event.target.value).then(r => this.available = r)
    }
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  max-width: 767px;
  margin: 10px auto;
}

.sku {
  cursor: pointer;
}

.sku:hover {
  background: rgba(33, 186, 69, 0.76);
}

.sku-selector {
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 10;
  top: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.wrapper {
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background: white;
  display: block;
}
</style>
