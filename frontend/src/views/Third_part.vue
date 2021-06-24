<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {

  name: 'ThirdPart',
  mounted () {
    const token = this.$route.query.token
    console.log(token)
    if (token && typeof token === 'string') {
      window.sessionStorage.setItem('token', token)
      this.$router.push('/home')
    }
  }
}
</script>
