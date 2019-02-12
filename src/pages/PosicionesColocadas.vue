<template>
<div class="row">
    <div class="col-sm-12">
        <h3>Listado de posiciones colocadas...</h3>
    </div>
  <div class="col-sm-12">
    <table class="table table-striped">
      <thead>
        <tr>
            <th>ID</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th></th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="p in info" :key="p.orderId">
        <td>{{ p.orderId }}</td>
        <td>{{ p.price }}</td>
        <td>{{ p.origQty }}</td>
        <td>{{ p.side }}</td>
        <td><button v-on:click="cancelOrder(p.clientOrderId)" class="btn btn-warning">delete</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</div><!-- / orders list -->

</template>



<script>
export default {
  props: ['informacion'],
  computed: {
    info: function() {
//      this.informacion = this.informacion.sort((item1, item2) => {
//        return this.getData[item1][metric] >= this.getData[item2][metric];
//      });
      return this.informacion;
    }    
  },
  methods: {
    cancelOrder: function(value) {
        this.$emit('cancelOrder', value);
    }
  }
}
</script>