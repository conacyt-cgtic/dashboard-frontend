import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	sender:'',
  	usuario:'',
  	urlRest:'',
  	portRest:'',
		urlWs: '',
		portWs: '',
		posts: [
      { id:1, title: 'El fin de la eternidad', name: 'Isaac Asimov' },
      { id:2, title: 'Cuentos libres', name: 'Jorge Ibarguengoitia' },
      { id:3, title: 'Ojos de perro azul', name: 'Gabriel García Marquez' },
      { id:4, title: 'La fiesta del Chivo', name: 'Mario Vargasllosa' },
      { id:5, title: 'El conde de Montecristo', name: 'Alexander Dumas' }
    ]
  },
  mutations: {
  	setState(state, data) {
  		state.sender = data.senderIn;
			state.usuario = data.usuarioIn;
  		state.urlRest = data.urlRestIn;
  		state.portRest = data.portRestIn;
			state.urlWs = data.urlWsIn;
      state.portWs = data.portWsIn;
  	}
  }
})