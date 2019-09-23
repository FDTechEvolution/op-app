<template>
    <div class="q-pa-md">
        <p v-if="user">
            ชื่อผู้ใช้ : {{user.name}}<br/>
            อีเมล์ : {{user.email}}<br/>
            เบอร์โทร : {{user.mobile}}
        </p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: this.user
    }
  },
  mounted () {
    let token = localStorage.getItem('token')
    if (token !== null) {
      this.$axios.get('api/users/get/' + token)
        .then((response) => {
          this.user = response.data
        })
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
