<template>
  <div class="c-home">
    <div class="c-home__filter">
      <button class="c-home__filter-toggle" @click="toggleFilter()">
        <span>Show</span>
        <span>{{ activeTag }}</span>
        <svg
          ref="toggleIcon"
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.61582 10.5275C9.05562 11.2668 7.94438 11.2668 7.38418 10.5275L1.10834 2.24554C0.409647 1.3235 1.0673 0 2.22416 0L14.7758 0C15.9327 0 16.5904 1.3235 15.8917 2.24554L9.61582 10.5275Z"
            fill="#202020"
          />
        </svg>
      </button>
      <div ref="filterTags" class="c-home__filter-tags">
        <button
          v-for="(tag, index) in tags"
          :key="index"
          :class="{ active: activeTag.toLowerCase() === tag.toLowerCase() }"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        'Everything',
        'Architecture',
        'Interior design',
        'Industrial design',
        'Websites',
        'Illustrations',
        '3D',
        'Photography',
        'Film',
        'Music',
        'Art',
      ],
      activeTag: 'Everything',
    }
  },
  watch: {
    activeTag() {
      setTimeout(() => {
        this.toggleFilter()
      }, 100)

      if (this.activeTag.toLowerCase() === 'everything') {
        this.$router.push({})
        return
      }
      this.$router.push({ query: { filter: this.activeTag.toLowerCase() } })
    },
  },
  methods: {
    toggleFilter() {
      const filterTags = this.$refs.filterTags

      if (filterTags.style.maxHeight) {
        filterTags.style.maxHeight = null
        this.$refs.toggleIcon.style.transform = 'rotate(0deg)'
      } else {
        filterTags.style.maxHeight = `${filterTags.scrollHeight}px`
        this.$refs.toggleIcon.style.transform = 'rotate(-180deg)'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.c-home {
  display: flex;
  justify-content: center;

  &__filter {
    margin-top: 10rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 101rem;

    &-toggle {
      background: transparent;
      border: transparent;
      font-size: 2.6rem;
      margin-bottom: 5rem;

      span:nth-child(2) {
        color: $color-pink;
      }

      svg {
        transform: scale(0.8);
        transition: transform 0.3s $ease-out-expo;
      }
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-height: 0px;
      overflow-y: hidden;
      transition: max-height 0.1s linear;

      button {
        position: relative;
        margin: 0 1.2rem 3.4rem;
        border-radius: 50px;
        border: 1px solid black;
        padding: 1.2rem 2.2rem;
        font-size: 1.4rem;
        background: transparent;
        font-weight: 500;
        text-transform: uppercase;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          background-color: $color-pink;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: -1;
          border-radius: inherit;
          transform: translateY(100%);
          transition: transform 0.4s $ease-out-expo;
          transform-origin: bottom;
        }

        &.active {
          border: none;
          color: white;
          background: $color-pink;
        }

        &:hover {
          color: white;
          border-color: transparent;

          &::before {
            transform: translateY(0);
          }
        }
      }
    }
  }
}
</style>
