<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          class="bg-red text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="raworder" label="รอยืนยัน" />
          <q-tab name="cf" label="ยืนยันแล้ว" />
          <q-tab name="wprint" label="รอปริ้นที่อยู่" />
          <q-tab name="wship" label="ปริ้นที่อยู่แล้ว/รอส่ง" />
          <q-tab name="sent" label="ส่งแล้ว" />
          <q-tab name="recived" label="รับสินค้าแล้ว" />
          <q-tab name="vo" label="ตีคืน" />
        </q-tabs>
      </q-card>

      <q-card>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="raworder">
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
          </q-tab-panel>

          <q-tab-panel name="cf">
            <div class="text-h6 text-weight-bold">ออเดอร์ยืนยันแล้ว</div>
            <q-separator /><br/>
            <div class="row">
              <div class="col-8 text-weight-bold">รายการ</div>
              <div class="col-2 text-weight-bold text-center">ผู้ส่ง</div>
              <div class="col-2 text-weight-bold text-center">วันที่</div>
            </div>
            <q-separator />
            <div v-for="(item, index) in orderListCF" :key="index">
              <div class="row" style="line-height: 40px;">
                <div class="col-8">{{index+1}}. {{customer.CF[index]}}</div>
                <div class="col-2 text-center">{{user.CF[index]}}</div>
                <div class="col-2 text-center"></div>
              </div>
              <q-separator />
            </div>
          </q-tab-panel>

          <q-tab-panel name="wprint">
            <div class="text-h6 text-weight-bold">รอปริ้นที่อยู่</div>
              <proPage/>
          </q-tab-panel>

          <q-tab-panel name="wship">
            <div class="text-h6 text-weight-bold">ปริ้นที่อยู่แล้ว/รอส่ง</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="sent">
            <div class="text-h6 text-weight-bold">ส่งแล้ว</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="recived">
            <div class="text-h6 text-weight-bold">รับสินค้าแล้ว</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="vo">
            <div class="text-h6 text-weight-bold">ตีคืน</div>
            <q-separator /><br/>
            <div class="row">
              <div class="col-8 text-weight-bold">รายการ</div>
              <div class="col-2 text-weight-bold text-center">ผู้ส่ง</div>
              <div class="col-2 text-weight-bold text-center">วันที่</div>
            </div>
            <q-separator />
            <div v-for="(item, index) in orderListVO" :key="index">
              <div class="row" style="line-height: 40px;">
                <div class="col-8">{{index+1}}. {{customer.VO[index]}}</div>
                <div class="col-2 text-center">{{user.VO[index]}}</div>
                <div class="col-2 text-center"></div>
              </div>
              <q-separator />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // orderDraft: () => import('./OrderDraft.vue'),
    proPage: () => import('./Products.vue')
  },
  data () {
    return {
      tab: 'raworder',
      orderList: [],
      orderListCF: [],
      orderListVO: [],
      user: {
        DR: [],
        CF: [],
        VO: []
      },
      customer: {
        DR: [],
        CF: [],
        VO: []
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
    loadOrdersConfirm () {
      this.$axios.get('api/orders/orderConfirm/')
        .then((response) => {
          this.orderListCF = response.data
          this.orderListCF.forEach((resp, index) => {
            this.$axios.get('api/users/get/' + resp.user_id)
              .then((response) => {
                this.user.CF[index] = response.data.name
              })
            this.$axios.get('api/customers/all/' + resp.customer_id)
              .then((response) => {
                this.customer.CF[index] = response.data.name
              })
          })
        })
        .catch(() => {
          this.orderError('Confirm Order')
        })
    },
    loadOrdersVO () {
      this.$axios.get('api/orders/orderCancel/')
        .then((response) => {
          this.orderListVO = response.data
          this.orderListVO.forEach((resp, index) => {
            this.$axios.get('api/users/get/' + resp.user_id)
              .then((response) => {
                this.user.VO[index] = response.data.name
              })
            this.$axios.get('api/customers/all/' + resp.customer_id)
              .then((response) => {
                this.customer.VO[index] = response.data.name
              })
          })
        })
        .catch(() => {
          this.orderError('Cancel Order')
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
    this.loadOrdersConfirm()
    this.loadOrdersVO()
  }
}
</script>
