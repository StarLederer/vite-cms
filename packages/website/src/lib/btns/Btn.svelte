<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let isAccent = false;
  export let isLarge = false;
  export let isGhost = false;
</script>

<button
  class="btn"
  class:is-accent={isAccent}
  class:is-large={isLarge}
  class:is-ghost={isGhost}
  on:click={() => {
    dispatch('click');
  }}
>
  <div class="wrapper">
    <slot />
  </div>
</button>

<style lang="scss">
  @import "./btn.scss";
</style>
