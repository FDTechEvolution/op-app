<template>
<div>
    <div class="text-h6 text-weight-bold">ออเดอร์รอยืนยัน</div>
    <q-separator /><br/>
    <div class="row">
        <div class="col-8 text-weight-bold">รายการ</div>
        <div class="col-2 text-weight-bold text-center">ผู้ส่ง</div>
        <div class="col-2"></div>
    </div>
    <q-separator />
    <div v-for="(item, index) in orderList" :key="index">
        <div class="row" style="line-height: 40px;">
            <div class="col-8" style="display: -webkit-inline-box;">{{index+1}}.&nbsp;
                <div v-for="(pro_item, key) in product[index]" :key="key">
                {{pro_item}}
                </div>&nbsp;
                {{item.payment_method}} {{item.totalamt}} บาท {{customer.DR[index]}}
                {{address.line1[index]}} {{address.subdistrict[index]}} {{address.district[index]}}
                {{address.province[index]}} {{address.zipcode[index]}}
            </div>
            <div class="col-2 text-center">{{user.DR[index]}}</div>
            <div class="col-2 text-center">
                <q-btn :ripple="{ center: true }" color="secondary" glossy size="sm" label="ยืนยัน" no-caps />&nbsp;
                <q-btn :ripple="{ center: true }" color="deep-orange" glossy size="sm" label="ยกเลิก" no-caps />
            </div>
        </div>
        <q-separator />
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      orderList: [],
      user: {
        DR: []
      },
      customer: {
        DR: []
      },
      product: [],
      address: {
        line1: [],
        subdistrict: [],
        district: [],
        province: [],
        zipcode: []
      }
    }
  },
  methods: {
    loadOrders () {
      this.$axios.get('api/orders/')
        .then((response) => {
          this.orderList = response.data
          this.orderList.forEach((resp, index) => {
            this.$axios.get('api/users/get/' + resp.user_id)
              .then((response) => {
                this.user.DR[index] = response.data.name
              })
            this.$axios.get('api/customers/all/' + resp.customer_id)
              .then((response) => {
                this.customer.DR[index] = response.data.name
                this.$axios.get('api/customers/get-address/' + response.data.id)
                  .then((response) => {
                    this.address.line1[index] = response.data.line1
                    this.address.subdistrict[index] = response.data.subdistrict
                    this.address.district[index] = response.data.district
                    this.address.province[index] = response.data.province
                    this.address.zipcode[index] = response.data.zipcode
                  })
              })
            this.$axios.get('api/order-lines/all/' + resp.id)
              .then((response) => {
                this.lines = response.data
                this.lines.forEach((line, key) => {
                  this.product_id = line.product_id
                  this.$axios.get('api/products/get/' + this.product_id)
                    .then((response) => {
                      this.product[key] = response.data.name
                      console.log(this.product[key], this.customer.DR[index])
                    })
                })
              })
          })
        })
        .catch(() => {
          this.orderError('Raw Order')
        })
    },
    orderError (orderFunc) {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: orderFunc + ' Loading failrd.',
        icon: 'report_problem'
      })
    }
  },
  created: function () {
    this.loadOrders()
  }
}
</script>
