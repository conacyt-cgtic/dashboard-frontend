<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div>Trader: {{ userName }}</div>
      </div>
      <div class="col-sm-6">
        <div style="text-align:right;">Fee: T=0.075% | M=0.075%</div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div style="text-align:right;">Remanente en BNB's: {{ data.bnb }}</div>
      </div>
    </div>

    <hr/>
  </div>
</template>

<script>
export default {
  props: ['userNameProp','dataProp'],
  computed: {
    userName: function() {
      return this.userNameProp;
    },
    data: function() {
      return this.dataProp;
    }
  }
}
</script>