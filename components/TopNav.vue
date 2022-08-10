<template>
  <nav id="nav" class="c-nav">
    <div class="c-nav__container">
      <div class="c-nav__left">
        <nuxt-link to="/">interests.thekolapo.com</nuxt-link>
      </div>
      <div class="c-nav__right">
        <nuxt-link to="about">About</nuxt-link>
        <a href="#newsletter">Newsletter</a>
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
    margin: 0 auto;
    padding-top: 5rem;

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
