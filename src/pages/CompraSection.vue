<template>
  <div class="col-sm-6">
      <div class="card">
        <div class="card-header">
              <div class="row">
                  <div class="col-sm-2">
                      <label>Compra</label>
                  </div>
                  <div class="col-sm-10">
                      <div v-if="vacio">Loading...</div>
                      <div style="text-align: right;" v-else>
                          <label>Saldo: {{ data.usd }} {{ minor }}</label>
                      </div>
                  </div>
              </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Posición de tipo "Limit" para compra</h5>
          <p class="card-text">(revisor de límites activado)</p>
          <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="precioCompra">Precio (en {{ minor }})</label>
                    <!-- https://www.npmjs.com/package/vue-numeric -->
                    <vue-numeric 
                      separator="," 
                      v-model="precioCompra" 
                      v-bind:precision="7"
                      class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="cantidadCompra">Cantidad (en {{ major }})</label>
                    <vue-numeric 
                      separator=","
                      v-model="cantidadCompra"
                      v-bind:precision="7"
                      class="form-control" />
                  </div>
                </div>
            </div>

            <div class="row"> 
                <div class="col-sm-3">
                  <a href="#" class="btn btn-info" @click="asigna(true, 100, data.usd)">100%</a>
                </div>
                <div class="col-sm-3">
                  <a href="#" class="btn btn-info" @click="asigna(true, 75, data.usd)">75%</a>
                </div>
                <div class="col-sm-3">
                  <a href="#" class="btn btn-info" @click="asigna(true, 50, data.usd)">50%</a>
                </div>
                <div class="col-sm-3">
                  <a href="#" class="btn btn-info" @click="asigna(true, 25, data.usd)">25%</a>
                </div>
          </div>
          <hr/>
          <div class="row">
                <div class="col-sm-6">
                  <a href="#" class="btn btn-success" v-on:click="checaCompra">Comprar</a>
                </div>

                <div class="col-sm-6">
                  <div style="text-align: right;">
                    <label>Gasto: {{ totalOperacion(cantidadCompra, precioCompra) }} {{ minor }}</label>
                  </div>
                </div>
          </div>
        </div>
      </div> 
  </div><!-- / comprar -->
</template>

<script>
export default {
  data: function() {
    return {
      precioCompra: 0,
      cantidadCompra: 0,
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
           if(a==true) {
              if(this.precioCompra==0) {
                this.cantidadCompra = 0;
              } else {
                this.cantidadCompra = (c*b/100)/this.precioCompra;
              }
           }
        },
        totalOperacion: function(a, b) {
           return a*b;
        },
        checaCompra: function() {
          this.$emit('preChecaCompra', this.cantidadCompra, this.precioCompra)
        }
  }
}
</script>