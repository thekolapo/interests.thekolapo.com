<template>
  <div class="c-home">
    <div class="c-home__filter">
      <button class="c-home__filter-toggle" @click="toggleFilter()">
        <span>Show</span>
        <span>{{ capitalizeString(activeTag) }}</span>
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
    <section v-for="(posts, key) in groupedPosts" :key="key" class="c-posts">
      <h1 class="c-posts__heading">{{ key }}</h1>
      <masonry-layout :cols="posts.length > 1 ? layoutColumns : 1">
        <div v-for="(post, index) in posts" :key="index" class="c-posts__post">
          <a :href="post.fields.link" target="_blank">
            <img
              :src="getPostImage(post.fields.image.sys.id)"
              alt="post image"
            />
          </a>
          <span class="c-posts__post-caption">{{ post.fields.caption }}</span>
        </div>
      </masonry-layout>
    </section>
    <section id="newsletter" class="c-newsletter">
      <h1 class="c-newsletter__heading">NEWSLETTER</h1>
      <p class="c-newsletter__subtext">
        Subscribe and I’ll send you a newsletter of my monthly curations 💛
      </p>
      <form action="">
        <input
          type="email"
          placeholder="I saved a nice spot for your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      <div class="c-newsletter__footer">
        <span>© 2022</span>
        <span class="c-newsletter__footer-author">
          MADE IN LAGOS BY
          <a href="https://twitter.com/kolapo_" target="_blank"> KOLAPO </a>
        </span>
        <a href="#nav">SCROLL TO TOP</a>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/utils/api.js'

export default {
  async asyncData({ route }) {
    const payload = {
      category: '',
    }

    try {
      const entries = await api.fetchPosts(payload)
      const assets = entries.data.includes.Asset

      return {
        posts: entries.data.items,
        assets,
      }
    } catch (error) {}
  },
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
      layoutColumns: 2,
      groupedPosts: {},
    }
  },
  watch: {
    activeTag() {
      if (this.activeTag.toLowerCase() === 'everything') {
        this.$router.push({})
        return
      }
      this.$router.push({ query: { filter: this.activeTag.toLowerCase() } })
    },
    '$route.query': {
      handler() {
        this.filterPosts()
        this.toggleFilter()
      },
    },
  },
  mounted() {
    this.filterPosts()
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
    capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    getPostImage(id) {
      const asset = this.assets.filter((asset) => asset.sys.id === id)
      return `https:${asset[0].fields.file.url}?fm=jpg&fl=progressive`
    },
    filterPosts() {
      this.activeTag = this.$route.query.filter || 'Everything'

      let filteredPosts = this.posts.filter(
        (post) =>
          post.fields.category.toLowerCase() === this.activeTag.toLowerCase()
      )

      if (this.activeTag === 'Everything') {
        filteredPosts = this.posts
      }

      const groupPostsByMonth = (posts) => {
        const groupedPosts = {}
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]

        posts.forEach((post) => {
          const date = new Date(post.sys.createdAt)
          const month = months[date.getMonth()]
          const year = date.getFullYear()

          if (!groupedPosts[`${month} ${year}`]) {
            groupedPosts[`${month} ${year}`] = []
          }

          groupedPosts[`${month} ${year}`].push(post)
        })

        return groupedPosts
      }

      this.groupedPosts = groupPostsByMonth(filteredPosts)
    },
  },
}
</script>

<style lang="scss" scoped>
.c-home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__filter {
    margin: 10rem 0 8rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 101rem;
    align-items: center;

    &-toggle {
      background: transparent;
      border: transparent;
      font-size: 2.6rem;
      margin-bottom: 5rem;
      width: fit-content;

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

.c-posts {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 160rem;
  margin-bottom: 12rem;

  &__heading {
    font-size: 18rem;
    font-family: 'Cigra';
    text-transform: uppercase;
    color: $color-pink;
    text-align: center;
    margin-bottom: 6rem;
  }

  &__post {
    margin: 0 auto;
    width: 96%;

    &:not(:last-child) {
      margin-bottom: 12rem;
    }

    a {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: block;
      transition: 1.2s $ease-out-expo;

      img {
        background: rgb(196, 196, 196);
        transition: inherit;
        object-position: center;
        width: 100vw;
        max-height: 150vh;
        object-fit: cover;
        pointer-events: none;
      }

      &:hover {
        transform: scale(0.97);

        img {
          transform: scale(1.1);
        }
      }
    }

    &-caption {
      display: inline-block;
      margin-top: 2rem;
    }
  }
}

.c-newsletter {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 28rem 0 4rem;
  background-color: #1d1d1f;
  color: white;
  // clip-path: circle(115.4vh at 50% 115vh);

  &__heading {
    font-size: 11rem;
    font-family: 'Cigra';
    text-align: center;
  }

  &__subtext {
    font-size: 2.2rem;
    margin: 2.6rem 0 9.6rem;
    font-weight: 300;
  }

  form {
    display: flex;
    width: fit-content;
    justify-content: center;
    width: 100%;

    > * {
      width: 100%;
      border-radius: 1rem;
    }

    input[type='email'] {
      max-width: 56rem;
      height: 7.6rem;
      margin-right: 2.2rem;
      border: 1px solid white;
      background: transparent;
      color: white;
      padding: 0 2.6rem;

      &::placeholder {
        color: rgba(white, 0.6);
      }
    }

    button {
      max-width: 16rem;
      border: none;
      font-weight: 500;
    }
  }

  &__footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    text-transform: uppercase;
    max-width: 119rem;
    margin-top: 18rem;

    a {
      color: inherit;
      text-decoration: none;
    }

    &-author a {
      color: #ff8ca1;
    }
  }
}
</style>
