<script lang="ts">
  import { i18n } from '../stores';
  import Btn from './btns/Btn.svelte';

  let vI18n;

  i18n.subscribe((value) => {
    vI18n = value;
  });
</script>

<nav>
  <div class="container">
    <h1>Webwriter</h1>
    {#if i18n}
      <ul class="locale-switcher">
        {#each vI18n.locales as locale}
          <li>
            <Btn
              on:click={() => {
                i18n.update((o) => ({
                  ...o,
                  current: locale,
                }));
              }}
            >
              <span class:is-selected={vI18n.current === locale}>{locale}</span>
            </Btn>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</nav>

<style lang="scss">
  @import "../resources/all.scss";

  nav {
    width: 100%;
    // position: fixed;
    // top: 0;
    // left: 0;

    background: mix($color-fg, transparent, 5%);

    z-index: 1;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      font-size: 1.2rem;
      font-weight: 400;
      opacity: 0.8;
    }

    .locale-switcher {
      padding: 1rem 0;
      margin: 0 -1rem;

      display: flex;
      list-style-type: none;

      .is-selected {
        text-decoration: underline;
      }
    }
  }
</style>
