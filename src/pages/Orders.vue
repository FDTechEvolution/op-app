<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <ul v-for="(item, index) in list" :key="index" class="row">
          <li class="col">{{item.payment_method}}</li>
      </ul>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    loadData () {
      this.$axios.get('api/orders')
        .then((response) => {
          this.list = response.data
        }, () => {
          this.list = []
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    }
  },
  created: function () {
    this.loadData()
  }
}
</script>
