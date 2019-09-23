<template>
  <q-page class="q-pa-md doc-container">
      <div class="row justify-center">
        <div class="col"></div>
          <div class="col self-center">
            <div class="column items-center">
              <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
            </div><br/>
            <q-form
            @submit="onSubmit"
            class="q-gutter-md"
            >
            <q-input
                filled
                type="number"
                v-model="login.mobile"
                label="หมายเลขโทรศัพท์ *"
                hint="เฉพาะตัวเลขเท่านั้น"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type mobile']"
            />

            <q-input
                filled
                type="password"
                v-model="login.password"
                label="รหัสผ่าน *"
                lazy-rules
                :rules="[ val => val !== null && val !== '' || 'Please type your password']"
            />

            <div class="column items-center">
                <q-btn label="Login" type="submit" color="primary"/>
            </div>
            </q-form>
          </div>
          <div class="col"></div>
        </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      login: {
        mobile: null,
        password: null
      }
    }
  },

  methods: {
    onSubmit () {
      this.$axios.post('api/login', this.login)
        .then((response) => {
          const token = response.data.msg.id
          const org = response.data.msg.org_id
          localStorage.setItem('token', token)
          localStorage.setItem('org', org)
          this.$router.push('/board')
        })
    }
  }
}
</script>
