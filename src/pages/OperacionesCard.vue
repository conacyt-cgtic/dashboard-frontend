<template>
  <div>
  <div class="card">
    <div class="card-header">
        <div class="row">
          <div class="col-sm-9">
              <h3>Histórico de la últimas 52 posiciones</h3>
          </div>
          <div class="col-sm-3">
            <div style="text-align: right;">
              <a href="#" class="btn btn-danger" v-on:click="closeHistory">X</a>
            </div>
          </div>
        </div>
    </div>
    <div class="card-body scroll">
      <div class="row">
        <div class="col-sm-12">
            <table class="table table-striped header-fixed">
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                    <th>Status</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="p in history" :key="p.orderId">
                <td>{{ p.orderId }}</td>
                <td>{{ p.price }}</td>
                <td>{{ p.origQty }}</td>
                <td>{{ p.side }}</td>
                <td>{{ p.status }}</td>
              </tr>
              </tbody>
            </table>
        </div>
      </div><!-- / orders history -->
      <div class="row">
        <div class="col-sm-12">
          <label>Scroll to review your full fucking history, my friend... </label>
        </div>
      </div>
    </div>
  </div>  
  </div>
</template>

<style>
.header-fixed {
    width: 100% 
}

.header-fixed > thead,
.header-fixed > tbody,
.header-fixed > thead > tr,
.header-fixed > tbody > tr,
.header-fixed > thead > tr > th,
.header-fixed > tbody > tr > td {
    display: block;
}

.header-fixed > tbody > tr:after,
.header-fixed > thead > tr:after {
    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
}

.header-fixed > tbody {
    overflow-y: auto;
    height: 250px;
}

.header-fixed > tbody > tr > td,
.header-fixed > thead > tr > th {
    width: 20%;
    float: left;
}  
</style>


<script>
// sort table: https://jsfiddle.net/choasia/nfLcxjcm/2/
export default {
  props: ['hist'],
  data: function () {
    return {
      history: ''
    }
  },
  created() {
    this.history = this.hist
  },
  methods: {
    closeHistory: function() {
      this.$emit('closeHistory', 'Closing this window via parent notification')
    }
  }
}
</script>