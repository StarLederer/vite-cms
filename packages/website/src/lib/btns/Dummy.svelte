<script>
  export let isAccent = false;
  export let isLarge = false;
  export let isGhost = false;

  export let isFocused = false;
</script>

<div
  class="btn"
  class:is-accent={isAccent}
  class:is-large={isLarge}
  class:is-ghost={isGhost}
  class:is-forced-focus={isFocused}
>
  <div class="wrapper">
    <slot />
  </div>
</div>

<style lang="scss">
  @import "./btn.scss";
</style>
