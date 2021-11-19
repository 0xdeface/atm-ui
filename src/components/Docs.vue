<template>
  <div class="docs">
    <vuetable ref="vuetable"
              @vuetable:checkbox-toggled="onToggle"
              @vuetable:checkbox-toggled-all="onToggle"
              api-url="http://localhost:8081/get-docs"
              :fields="fields"
              data-path=""
              pagination-path=""
    >
      <div slot="actions" slot-scope="props"> <!---->
        <button class="ui button" @click="open(props)">открыть</button>
      </div>
    </vuetable>
    <vuetable-pagination ref="pagination"></vuetable-pagination>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";


const fields = [{
  name: '__checkbox',   // <----
  titleClass: 'center aligned',
  dataClass: 'center aligned'

},
  {name: 'shift', title: '№ смены'},
  {name: 'doc_type', title: 'Вид документа'},
  {name: 'doc_num', title: 'Номер'},
  // {name: 'doc_present', title: 'Документ'},
  {name: 'doc_sum_n', title: 'Наличными'},
  {name: 'doc_sum_b', title: 'Безналичными'},
  {name: 'doc_sum_a', title: 'Сумма'},
  {
    name: "actions",
    title: '<i class="grey circle icon"></i>Действия',
    titleClass: "center aligned",
    dataClass: "center aligned",
    width: "15%",
  },
]
export default {
  name: 'Docs',
  data: () => ({fields, selected:[]}),
  props: {
    msg: String
  },

  methods: {
    onToggle: function () {
        this.selected = this.$refs.vuetable.tableData.filter(el => this.$refs.vuetable.selectedTo.indexOf(el.id) !== -1)
        this.$store.commit("setExportDocs", this.selected.map(el => el.id))
    },
    open: function (p) {
      console.log(p)
      this.$router.push({name: 'OrderDetail', params: {id: p.rowData.id}})
    }
  },
  components: {Vuetable, VuetablePagination}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
