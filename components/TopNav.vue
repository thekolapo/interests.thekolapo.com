<template>
  <nav class="c-nav">
    <div class="c-nav__container">
      <div class="c-nav__left">
        <nuxt-link to="/">interests.thekolapo.com</nuxt-link>
      </div>
      <div class="c-nav__right">
        <nuxt-link to="">About</nuxt-link>
        <a href="">Newsletter</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.c-nav {
  font-weight: 500;

  &__container {
    display: flex;
    justify-content: space-between;
    max-width: 119rem;
    margin: 5rem auto 0;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  &__right {
    a:first-child {
      margin-right: 4.6rem;
    }
  }
}
</style>
