<template>
  <div class="container">
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" >
    <div class="card" style="width: 480px;">

      <div class="card-header">
        <div class="row">
          <div class="col-sm-6">
            <label>My example</label>
          </div>
          <div class="col-sm-6" style="text-align: right;">
            <label>(v2.3.1)</label>
            <font-awesome-icon icon="coffee" />
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="row">

          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col" @click="ordena('id')">ID <i class="fa fa-fw fa-sort" /></th>
                <th scope="col" @click="ordena('title')">Title  <i class="fa fa-fw fa-sort" /></th>
                <th scope="col" @click="ordena('name')">Name <i class="fa fa-fw fa-sort" /></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts" :key="post.id" class="post-item">
                <td scope="row">{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.name }}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
</template>
 
<script>
import store from "../store";

export default {
  data: function () {
      return {
        currentSort:'name',
        currentSortDir:'asc'
      }
  },
  methods:{
    ordena:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    }
  },
  computed: {
//    posts2() {
//      var datax = this.$store.state.posts;
//      return datax.sort((t1, t2) => (t1.id < t2.id ? -1 : 1));
//    },
    posts:function() {
      var datax = this.$store.state.posts;
      return datax.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    }
  }
};
</script>
