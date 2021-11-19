<template>
  <div class="order-component">
    <div v-bind:class="[isNew?'':'disabled-order']">
      <SkuSelector v-on:finish="addSelected()"></SkuSelector>
      <Payment v-bind:summary="sum" v-on:pay="pay($event)"></Payment>
      <div class="order">
        <div class="actions">
          <div>
            <button class="ui button green" @click="showSkuSelector()">Подбор товаров</button>
            <button v-bind:class='[sum>0?"":"disabled", "ui", "button" ,"orange"]' class="" @click="showPayment()">
              Оплатить
            </button>
          </div>
          <strong class="sum-order">Сумма чека: {{ sum.toFixed(2) }}</strong>
        </div>

        <h3>Товары в чеке</h3>
        <table class="ui table doc-sku">
          <thead>
          <tr>
            <td>Код</td>
            <td>Номенклатура</td>
            <td>Количество</td>
            <td>Цена</td>
            <td>Сумма</td>
            <td>Действия</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(el, index) of sku" :key="index">
            <td>{{ el.code }}</td>
            <td>{{ el.name }}</td>
            <td class="cnt" @click="changeCnt(index)">{{ el.count }}</td>
            <td>{{ el.price }}</td>
            <td>{{ el.sum?el.sum:  (el.price * el.count).toFixed(2) }}</td>
            <td>
              <button class="ui negative basic button" @click.stop="remove(index)"><i class="ban icon"></i>убрать
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import SkuSelector from "@/components/SkuSelector";
import Payment from "@/components/Payment";
import {getDoc, takePay} from "@/service";


function mergeSku(firstSet, secondSet) {
  let skipCodes = []
  let merged = firstSet.map((item) => {
    let elem = getItemByCode(secondSet, item.code)
    skipCodes.push(item.code)
    item.cnt = parseFloat(item.cnt) + parseFloat(elem.cnt)
    return item
  })
  secondSet.forEach((el) => {
    if (skipCodes.indexOf(el.code) === -1) {
      merged.push(el)
    }
  })
  return merged
}

function getItemByCode(set, code) {
  let selected = set.filter(el => {
    return el.code === code
  })
  if (selected.length === 1) {
    return selected[0]
  }
  if (selected.length > 1) {
    let result = selected.reduce((el, current) => {
      el = el ?? current
      el.cnt = parseFloat(el.cnt) + parseFloat(current.cnt)
      return el
    })
    return result[0]
  }
  return {cnt: 0, code: false}
}

export default {
  components: {Payment, SkuSelector},
  data: () => ({
    sku: [],
    isNew: true,
    sumA: 0,
    sumN: 0,
    sumB: 0,
  }),

  computed: {
    sum: function () {
      return this.sku.reduce((accum, current) => accum + (current.count * current.price), 0)
    }
  },
  watch: {
    '$route.params.id': function (id) {
      this.loadDoc(id)
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next)
  },
  created() {
    this.loadDoc(this.$route.params.id)
  },
  methods: {
    loadDoc: function (id) {
      if (id === undefined) {
        return
      }
      this.isNew = false
      getDoc(id).then(doc => {
        this.sku = doc.skus
        this.sumA = doc.doc_sum_a
        this.sumB = doc.doc_sum_b
        this.sumN = doc.doc_sum_n
      })
    },
    remove: function (index) {
      this.sku.splice(index, 1)
    },
    pay: function (ev) {
      this.sumB = ev.b
      this.sumN = ev.n
      console.log(this.data)
      takePay({
        skus: this.sku.map(el => {
          el.count = parseFloat(el.count);
          el.sum = parseFloat(el.count * el.price);
          return el
        }),
        doc_sum_b: this.sumB,
        doc_sum_a: this.sumA,
        doc_sum_n: this.sumN
      }).then(payResult => {
        if (Array.isArray(payResult.errors) && payResult.errors.length > 0) {
          payResult.errors.forEach(err => alert(err))
          return
        }
        this.isNew = false
        this.$store.commit("hidePayment")
      })

    },
    changeCnt: function (index) {
      let cnt = prompt("Введите количество", this.sku[index].count);
      if (isNaN(parseInt(cnt))) {
        cnt = 1;
      }
      this.sku[index].count = cnt
    },
    showSkuSelector: function () {
      this.$store.commit('showSkuSelector')
    },
    showPayment: function () {
      this.$store.commit('showPayment')
    },
    addSelected: function () {
      this.sku = mergeSku(this.sku, this.$store.state.selectedSku)
      // this.sku.push(...this.$store.state.selectedSku)
      this.$store.commit('setSelectedSku', [])
    },
  }
}
</script>
<style>
.order .actions {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.sum-order {
  font-size: 19px;
}

.cnt {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-color: #2c3e50;
}

.order {
  max-width: 900px !important;
  margin: 0 auto !important;
}

.disabled-order {
  opacity: 0.7;
  font-style: italic;
  pointer-events: none;
}
</style>
