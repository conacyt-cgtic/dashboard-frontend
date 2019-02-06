<template>
  <div class="card">
    <div class="card-header">
        <label>Valor actual de {{ major }}:&nbsp;</label><b>{{ current }}</b>
    </div>
    <div class="card-body">
        <table class="table table-striped">
          <tr v-for="(p, index) in xLabel" :key="index">
            <td>{{ p.a }}</td>
            <td>{{ p.b }}</td>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['majorProp','currentProp','xLabelProp'],
  computed: {
    major: function() {
      return this.majorProp;
    },
    current: function() {
      return this.currentProp;
    },
    xLabel: function() {
      return this.xLabelProp;
    },
  }
}
</script>