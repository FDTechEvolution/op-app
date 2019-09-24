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
                <div class="col-8">{{index+1}}. {{item.payment_method}}</div>
                <div class="col-2 text-center">{{userName[index]}}</div>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="wprint">
            <div class="text-h6 text-weight-bold">รอปริ้นที่อยู่</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'raworder',
      orderList: [],
      userName: []
    }
  },
  methods: {
    loadOrders () {
      this.$axios.get('api/orders')
        .then((response) => {
          this.orderList = response.data
          this.orderList.forEach((resp, index) => {
            this.$axios.get('api/users/get/' + resp.user_id)
              .then((response) => {
                this.userName[index] = response.data.name
              })
            this.$axios.get('api/customers/all/' + resp.customer_id)
              .then((response) => {
                this.customers[index] = response.data
              })
          })
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
    this.loadOrders()
  }
}
</script>
