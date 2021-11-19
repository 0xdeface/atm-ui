<template>
  <div class="payment-wrapper" v-if="visible">
    <div class="payment">
      <h2>Сумма к оплате: {{ summary }} руб.</h2>
      <div class="ui message">
        {{ helpText }} руб.
      </div>

      <div class="ui right labeled left icon input pay-input">
        <i class="tags icon"></i>
        <input type="text" placeholder="00.00" v-model.number="nf">
        <a class="ui tag label" @click="fillN()">Наличные&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </a>
      </div>
      <div class="ui right labeled left icon input pay-input">
        <i class="tags icon"></i>
        <input type="text" placeholder="00.00" v-model.number="bf">
        <a class="ui tag label" @click="fillB()">Безналичные</a>
      </div>
      <div class="ui buttons">
        <button class="ui button" @click="hide()">Отменить</button>
        <div class="or"></div>
        <button v-bind:class='[correct?"":"disabled","ui", "positive" ,"button"]' @click="pay()">Оплатить</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Payment",
  props: ['summary'],
  data: () => ({
    n: '',
    b: ''
  }),
  computed: {
    visible: function () {
      return this.$store.state.paymentIsShowed
    },
    helpText: function () {
      let v = Math.max((this.summary - this.b - this.n) * -1, 0)
      return `сдача: ${v}`
    },
    nf: {
      set: function (newVal) {
        this.n = newVal
      },
      get: function () {
        if (this.n === '') return ''
        return this.n.toFixed(2)
      }
    },
    bf: {
      set: function (newVal) {
        this.b = newVal
      },
      get: function () {
        if (this.b === '') return ''
        return this.b.toFixed(2)
      }
    },
    correct: function () {
      const b = parseFloat(this.b)
      const n = parseFloat(this.n)
      const s = parseFloat(this.summary)
      if (isNaN(b) || isNaN(n) || isNaN(s)) {
        return false
      }
      if (b > s) {
        return false
      }
      if (n + b < s) {
        return false
      }
      return true
    },
  }
  ,
  methods: {
    hide: function () {
      this.$store.commit("hidePayment")
    }
    ,
    fillN: function () {
      this.b = 0;
      this.n = this.summary
    }
    ,
    pay: function () {
      this.$emit("pay",{n:this.n, b:this.b})

    },
    fillB: function () {
      this.n = 0;
      this.b = this.summary
    },
    // onChangeN: function () {
    //   // this.n = this.n.replace(/[^\d]*/, "")
    //   // this.n = this.n.replace(/,/, ".")
    //   this.n = parseFloat(this.n)
    //   if (this.b === '') {
    //     this.b = this.summary - this.n
    //   }
    // }
    // ,
    // onChangeB: function () {
    //   // this.b = this.b.replace(/[^\d]*/, "")
    //   // this.b = this.b.replace(/,/, ".")
    //   this.b = parseFloat(this.b)
    //   if (this.n === '' && this.b > 0 && this.b < this.summary) {
    //     this.n = this.summary - this.b
    //   }
    // }
  }
  ,
}
</script>

<style scoped>
.pay-input {
  margin-bottom: 15px;
}

.ui.message {
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment {
  padding: 50px;
  border-radius: 10px;
  width: 600px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
}

.payment-wrapper {
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
</style>
