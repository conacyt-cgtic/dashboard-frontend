<template>
  <div>
    <!-- https://www.codejobs.biz/es/blog/2015/12/01/sistema-de-filas-y-columnas-de-bootstrap3-con-ejemplos -->
    <!-- https://codepen.io/tutelagesystems/pen/pjBbxQ -->
    <div id="vueApp">
        <div class="container">

            <!-- Para el nombre del trader y para mostrar el saldo en BNB's-->
            <main-info
                :dataProp="this.data"
                :userNameProp="this.userName">
            </main-info>

            <div class="row">

              <div class="col-sm-9">
                <div class="row">
                    <!-- COMPRA -->
                    <compra-section
                      :majorProp="this.major"
                      :minorProp="this.minor"
                      :dataProp="this.data"
                      :vacioProp="this.vacio" 
                      v-on:preChecaCompra="preChecaCompra">
                    </compra-section>
                    <!-- VENTA -->
                    <venta-section
                      :majorProp="this.major"
                      :minorProp="this.minor"
                      :dataProp="this.data"
                      :vacioProp="this.vacio" 
                      v-on:preChecaVenta="preChecaVenta">
                    </venta-section>
                </div> <!-- / ends row for 'sell' and 'buy' sections -->

                <hr/>

                <!-- Listado de las posiciones que tengo colocadas al momento actual -->
                <posiciones-colocadas 
                  :informacion="this.info" 
                  v-on:cancelOrder="cancelOrder">
                </posiciones-colocadas>

              </div><!-- / first column -->

              <div class="col-sm-3">

                  <!-- Componente del valor actual de la crypto -->
                  <valor-actual
                    :majorProp="this.major"
                    :currentProp="this.current"
                    :xLabelProp="this.xLabel">
                  </valor-actual>

                  <hr/>
                  <button type="button" class="btn btn-primary" @click="init">
                    <span class="glyphicon glyphicon-search">Refresh</span>
                  </button>
                  <a href="#" class="btn btn-primary" @click="openHistory">History</a>

              </div><!-- / coninuous price list-->
            </div><!-- / main row -->
        </div><!-- / container -->
    </div><!-- / vueApp -->

    <!-- 
      https://github.com/euvl/vue-js-modal 
      https://github.com/euvl/vue-js-modal/blob/master/demo/client_side_rendering/src/App.vue
    -->
    <!-- Modal que presenta mensajes de ejecución de acciones -->
    <modal 
        name="op-denegada" 
        :clickToClose="false" 
        :reset="true"
        :width="480"
        :height="260">
        <div class="card">
          <div class="card-header">Advertencia del sistema</div>
          <div class="card-body">
            <h5 class="card-title">{{ tituloOpDenegada }}</h5>
            <p class="card-text">{{ modalInfo }}</p>
            <div style="text-align: right;">
              <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
            </div>
          </div>
        </div>
    </modal>

    <!-- Modal que proviene de OperacionesCard.vue -->
    <modal
        name="operaciones"
        :clickToClose="false"
        :reset="true"
        :width="960"
        :height="480">
        <operaciones-card 
          :hist="this.history" 
          v-on:closeHistory="closeHistory">
        </operaciones-card>
    </modal>

  </div>
</template>



<script>
import axios from 'axios';
import router from '../router'
import store from '../store'
import OperacionesCard from './OperacionesCard'
import PosicionesColocadas from './PosicionesColocadas'
import ValorActual from './ValorActual'
import CompraSection from './CompraSection'
import VentaSection from './VentaSection'
import MainInfo from './MainInfo'

export default {
    components: {
        OperacionesCard,
        PosicionesColocadas,
        ValorActual,
        CompraSection,
        VentaSection,
        MainInfo
    },
    data: function () {
        return {
              url: 'http://'+process.env.LOGIN_IP+'/crypto-trader/kernel/',
              major: "BTC",
              minor: "USDT",

              info: "",
              info2: "",
              valorz: "",
              data: "",
              history: "",
              vacio: true,
              current: 0,
              userName:'',
              sender:'',

              delta: 0.985,
              modalInfo: "",
              tituloOpDenegada: "",

              dataLenght: 7,
              xLabel: [0,0],

              debug: false,
              ajaxRequest: false,
              postResults: [],

              hostWs: "abc",
              hostRest: "xyz",

              wsPrice: null
        }
    },
    methods: {
        onMessagePrice: function (e) {
            var vm = this;
            var json = JSON.parse(e.data);
            this.current = json.a;

            vm.xLabel.push(json);
            if(vm.xLabel.length >= vm.dataLenght) {
                vm.xLabel.shift();
            }
        },
        onMessage3: function (e) {
            var response = JSON.parse(e.data); 
            this.data = response.balance;
            this.info = response.ordenes;
            this.history = response.history;
            this.vacio = false;
        },
        openWs: function() {
            console.log('trying websocket reconnection...');
            var location = "ws://"+this.hostWs+"/WebSocket/price";
            this.wsPrice = new WebSocket(location);
            this.wsPrice.onmessage = this.onMessagePrice;
            this.wsPrice.onclose  = function(){
              setTimeout(function(){
                openWs()
              }, 5000);
            };
        },
        init: function() {
            console.log("refresh...");
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.post(this.url+'data?port='+this.portRest, 
                {
                      valor: 0,
                      cantidad: 0,
                      accion: "data",
                      sender: this.sender
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'crossDomain': true,
                        'Acces-Control-Allow-Origin': '*'
                    }
                }
            ).then(r => {
                //console.log(r);
                this.data = r.data.balance;
                this.info = r.data.ordenes;
                this.vacio = false;
                //console.log(this.data);
                //console.log(this.info);
            });  
        },
        cancelOrder(id) {
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            var endpoint = this.url+'elimina?port='+this.portRest;
            console.log("cancelando orden: "+id);
            axios.post(endpoint, 
                {
                      valor: -1,
                      cantidad: -1,
                      accion: id,
                      sender: this.sender
                }, 
                {
                    headers: {
                        'Content-type': 'application/json',
                        'crossDomain': true,
                        'Acces-Control-Allow-Origin': '*'
                    } 
                }
            ).then(r => {
                this.tituloOpDenegada = "Operacion procesada";
                this.modalInfo = "Orden eliminada exitosamente";
                this.$modal.show('op-denegada');  
                this.data = r.data.balance;
                this.info = r.data.ordenes;
                this.vacio = false;
            });   
        },
        closeModal: function() {
          this.$modal.hide('op-denegada');
        },
        openHistory: function() {
          var address = this.url+'hist?port='+this.portRest;
          //console.log(address);
          axios.post(address, 
              {
                  id: this.sender
              }, 
              {
                  headers: {
                      'Content-type': 'application/json',
                      'crossDomain': true,
                      'Acces-Control-Allow-Origin': '*' 
                  }
              }
          ).then(r => {
              this.history = r.data; 
              //console.log(this.history);
              this.$modal.show('operaciones');
          }); 
        },
        closeHistory: function(event) {
          //console.log("Event message: "+event);
          this.$modal.hide('operaciones');
        },
        checaVenta: function() {
            preChecaVenta(this.cantidadVenta, this.precioVenta)
        },
        preChecaVenta: function(paramCantVenta, paramPrecVenta) {
          if(paramCantVenta*paramPrecVenta<10) {
            this.tituloOpDenegada = "Operacion inválida";
            this.modalInfo = "Tu operación no fue aceptada debido a que el monto total de la operacion ("+(paramCantVenta*paramPrecVenta)+") es menor a 10 " + this.minor;
            this.$modal.show('op-denegada');            
          } else if(this.data.btc<paramCantVenta) {
            this.tituloOpDenegada = "Operacion inválida";
            this.modalInfo = "Tu operación no fue aceptada debido a que sólo posees " + this.data.btc + this.major;
            this.$modal.show('op-denegada');
          } else if(paramPrecVenta<this.current*this.delta ) {
            this.tituloOpDenegada = "Operacion con riesgo";
            this.modalInfo = "Tu operación no fue aceptada debido a que el valor de la operación "+paramPrecVenta+" es menor a "+Math.floor(this.current*this.delta) + " " + this.minor;
            this.$modal.show('op-denegada');
          } else {
                  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

                  //console.log(this.url+'vende?port='+this.portRest);
                  //console.log(paramPrecVenta);
                  //console.log(paramCantVenta);
                  //console.log(this.sender);

                  axios.post(this.url+'vende?port='+this.portRest, 
                      {
                          valor: paramPrecVenta,
                          cantidad: paramCantVenta,
                          accion: "vende",
                          sender: this.sender
                      }, 
                      {
                          headers: {
                              'Content-type': 'application/json',
                              'crossDomain': true,
                              'Acces-Control-Allow-Origin': '*' 
                          }
                      }
                  ).then(r => {
                      var res = r.data.operacion.valor*r.data.operacion.cantidad;
                      var msg = "Acabas de colocar una posición de venta de " + r.data.operacion.cantidad + " BTC por un precio de " + r.data.operacion.valor + " cada uno.\nSi se ejecuta, recibirás " + Math.floor(res) + " USDT";
                      this.tituloOpDenegada = "Operacion procesada";
                      this.modalInfo = msg;
                      this.$modal.show('op-denegada');
                      this.data = r.data.balance;
                      this.info = r.data.ordenes;
                      this.vacio = false; 
                  });   
          }
        },
       preChecaCompra: function(paramCantComp, paramPrecComp) {
              if(paramCantComp * paramPrecComp<10) {
                this.tituloOpDenegada = "Operacion inválida";
                this.modalInfo = "Tu operación no fue aceptada debido a que el monto total de la operacion ("+(paramCantComp*paramPrecComp)+") es menor a 10 " + this.minor;
                this.$modal.show('op-denegada');            
              } else if(this.data.usd/paramPrecComp<paramCantComp) {
                this.tituloOpDenegada = "Operacion inválida";
                this.modalInfo = "Tu operación no fue aceptada debido a que sólo posees " + this.data.usd/paramPrecComp + " " + this.major;
                this.$modal.show('op-denegada');
              } else {
                    if(paramPrecComp>(this.current*(2-this.delta)) ) {
                      this.tituloOpDenegada = "Operacion con riesgo";
                      this.modalInfo = "Tu operación no fue aceptada debido a que el valor de la operación " + paramPrecComp + " es mayor a " + Math.floor(this.current*(2-this.delta))+" "+this.minor;                
                      this.$modal.show('op-denegada');
                    } else {
                      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                       
                        //console.log(this.url+'compra?port='+this.portRest);
                        //console.log(paramPrecComp);
                        //console.log(paramCantComp);
                        //console.log(this.sender); 

                      axios.post(this.url+'compra?port='+this.portRest, 
                          {
                              valor: paramPrecComp,
                              cantidad: paramCantComp,
                              accion: "compra",
                              sender: this.sender
                          }, 
                          {
                              headers: {
                                  'Content-type': 'application/json',
                                  'crossDomain': true,
                                  'Acces-Control-Allow-Origin': '*' 
                              }
                          }
                      ).then(r => {
                          var res = r.data.operacion.valor*r.data.operacion.cantidad;
                          var msg = "Acabas de colocar una posición de compra de " + r.data.operacion.cantidad + " BTC por un precio de " + r.data.operacion.valor + " cada uno.\nSi se ejecuta, habrás gastado " + Math.floor(res) + " USDT";
                          this.tituloOpDenegada = "Operacion procesada";
                          this.modalInfo = msg;
                          this.$modal.show('op-denegada');
                          this.data = r.data.balance;
                          this.info = r.data.ordenes;
                          this.vacio = false;
                      });
                    }
              }
        },
        checaCompra: function() {
          preChecaCompra(this.cantidadCompra, this.precioCompra)
        }
    },
    mounted: function () {
          this.sender   = store.state.sender;
          this.userName = store.state.usuario;
          this.portRest = store.state.portRest;
          this.portWs   = store.state.portWs;
          this.hostWs   = store.state.urlWs+":"+store.state.portWs;
          this.hostRest = store.state.urlRest+":"+store.state.portRest;
          
          if(this.userName=="") {
             //console.log("usr is null redirecting to home page");
             router.push("/");
          } else {
            this.openWs();
            this.init();
          }   
    },
    computed: {
          getUrl() {
            return store.state.urlWs;
          }
    }
}

</script>
