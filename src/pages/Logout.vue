<template>
    <div class="q-pa-md">
        <h2>Your Logged out!</h2>
    </div>
</template>

<script>
export default {
  mounted () {
    let token = localStorage.getItem('token')
    if (token != null) {
      this.$axios.get('api/users/get/' + token)
        .then((response) => {
          localStorage.removeItem('token')
          localStorage.removeItem('org')
          this.$router.push('/')
        })
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
