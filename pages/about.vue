<template>
  <div class="c-about">
    <div ref="marquee" class="c-about__marquee">
      <div class="c-about__marquee-row animation">
        <p v-for="(i, index) in 2" :key="index">
          <span>At the base level of creativity is pure expression.</span>
        </p>
      </div>
    </div>
    <p class="c-about__text">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.initMarquee()
  },
  methods: {
    initMarquee() {
      let windowWidth = window.innerWidth
      const rows = this.$refs.marquee.querySelectorAll('.c-about__marquee-row')
      const setRowAnimationValues = () => {
        rows.forEach((row) => {
          const rowParagraphWidth = row.querySelector('p').offsetWidth
          const translateValue = (rowParagraphWidth / windowWidth) * 100
          row.style.setProperty('--translate-value', translateValue)
          row.style.setProperty('--anim-play-state', 'initial')
          row.classList.remove('animation')
          setTimeout(() => {
            row.classList.add('animation')
          }, 10)
        })
      }
      const handleResize = () => {
        const newWidth = window.innerWidth
        if (windowWidth !== newWidth) {
          windowWidth = newWidth
          setRowAnimationValues()
        }
      }
      setRowAnimationValues()
      window.addEventListener('resize', handleResize, false)
    },
  },
}
</script>

<style lang="scss" scoped>
.c-about__marquee {
  position: relative;
  width: 100vw;
  left: calc(-50vw + 50%);
  padding: 7% 0 14%;

  &-row {
    --translate-value: 0;
    --anim-play-state: paused;
    width: 100%;
    font-size: 6vw;
    will-change: transform;
    animation-play-state: var(--anim-play-state);

    &.animation {
      animation: move 16s linear infinite;

      @keyframes move {
        to {
          transform: translateX(calc(var(--translate-value) * -1%));
        }
      }
    }

    // &:hover {
    //   animation-play-state: paused;
    // }

    p {
      position: absolute;
      white-space: nowrap;

      &:nth-child(2) {
        transform: translateX(100%);
      }

      span {
        position: relative;
        margin-right: 6vw;
      }
    }
  }
}
</style>
