<template>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
            <div class="row">
                <div class="col-sm-2">
                    <label>Venta</label>
                </div>
                <div class="col-sm-10">
                    <div v-if="vacio">Loading...</div>
                    <div style="text-align: right;" v-else>
                        <label>Saldo: {{ data.btc }} {{ major }}</label>
                    </div>
                </div>
            </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">Posición de tipo "Limit" para venta</h5>
        <p class="card-text">(revisor de límites activado)</p>
        <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="precioVenta">Precio (en {{ minor }})</label>
                  <vue-numeric 
                    separator="," 
                    v-model="precioVenta" 
                    v-bind:precision="7"
                    class="form-control" />
                </div>
                <div class="form-group">
                  <label for="cantidadVenta">Cantidad (en {{ major }})</label>
                  <vue-numeric 
                    separator="," 
                    v-model="cantidadVenta" 
                    v-bind:precision="7"
                    class="form-control" />
                </div>        
              </div>
          </div>

          <div class="row">
              <div class="col-sm-3">
                <a href="#" class="btn btn-info" @click="asigna(false, 100, data.btc)">100%</a>
              </div>
              <div class="col-sm-3">
                <a href="#" class="btn btn-info" @click="asigna(false, 75, data.btc)">75%</a>
              </div>
              <div class="col-sm-3">
                <a href="#" class="btn btn-info" @click="asigna(false, 50, data.btc)">50%</a>
              </div>
              <div class="col-sm-3">
                <a href="#" class="btn btn-info" @click="asigna(false, 25, data.btc)">25%</a>
              </div>
        </div>
        <hr/>
        <div class="row">
              <div class="col-sm-6">
                <a href="#" class="btn btn-danger" v-on:click="checaVenta">Vender</a>
              </div>

              <div class="col-sm-6">
                <div style="text-align: right;">
                  <label>Recepción: {{ totalOperacion(cantidadVenta, precioVenta) }} {{ minor }}</label>
                </div>
              </div>
        </div>
      </div>
    </div>
  </div><!-- / vender -->
</template>

<script>
export default {
  data: function() {
    return {
      precioVenta: 0,
      cantidadVenta: 0
    }
  },
  props: ['dataProp','minorProp','majorProp', 'vacioProp'],
  computed: {
    vacio: function() {
      return this.vacioProp;
    },
    major: function() {
      return this.majorProp;
    },
    minor: function() {
      return this.minorProp;
    },
    data: function() {
      return this.dataProp;
    }
  },
  methods: {
        asigna: function(a, b, c) {
           if(a==false) {
              this.cantidadVenta = c*b/100;
           }
        },
        totalOperacion: function(a, b) {
           return a*b;
        },
        checaVenta: function() {
          this.$emit('preChecaVenta', this.cantidadVenta, this.precioVenta)
        }
  }
}
</script>