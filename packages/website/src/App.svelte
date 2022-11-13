<script lang="ts">
  import { loadHtml } from '@vite-cms/editor-svelte/lib/runtime';

  import { i18n } from './stores';
  import Md from './lib/Md.svelte';
  import Txt from './lib/Txt.svelte';
  import Btn from './lib/btns/Btn.svelte';
  import Nav from './lib/Nav.svelte';

  let locale;

  i18n.subscribe((value) => {
    locale = value.current;
  });

  const book = 'home';

  let prodContent: any = {};
  $: loadHtml(`${locale}/${book}/index.json`).then((data) => {
    prodContent = data;
  });
</script>

<Nav />

<header>
  <h2 class="no-render">Summary</h2>
  <div class="container">
    <article>
      <p class="tagline">
        <Txt {book} chapter="tagline" {prodContent} />
      </p>
      <p class="description">
        <Txt {book} chapter="hero-desc" {prodContent} />
      </p>
      <div class="btns">
        <Btn isAccent isLarge>
          <Txt {book} chapter="hero-cta1" {prodContent} />
        </Btn>
        <Btn isGhost isLarge>
          <Txt {book} chapter="hero-cta2" {prodContent} />
        </Btn>
      </div>
    </article>
    <!-- <div class="demo" /> -->
  </div>
</header>

<main>
  <section class="advantages">
    <h2 class="no-render">Why Webwriter</h2>
    <div class="container">
      {#each [0, 1, 2, 3, 4, 5] as _, i}
        <div class="card">
          <h3><Txt {book} chapter={`avd${i}-title`} {prodContent} /></h3>
          <Md {book} chapter={`avd${i}`} {prodContent} />
        </div>
      {/each}
    </div>
  </section>

  <section class="how-to">
    <h2 class="no-render">How to implement</h2>
    <div class="container">
      <p>TODO: Describe how to implement</p>
    </div>
  </section>

  <section class="roadmap">
    <h2 class="no-render">Roadmap</h2>
    <div class="container">
      <p>TODO: Insert roadmap</p>
    </div>
  </section>
</main>

<footer>
  <div class="container">
    <Md {book} chapter="footer" {prodContent} />
  </div>
</footer>

<style lang="scss">
  @import "./resources/all.scss";

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  header {
    .container {
      padding-block: 12rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;

      .tagline {
        max-width: 24ch;
        color: mix($color-fg, $color-a, 80%);
        font-size: 4rem;
        line-height: 1;
        font-weight: 800;
      }

      p {
        max-width: 40ch;
      }

      .description {
        opacity: 0.6;
      }
    }

    .demo {
      height: 20rem;
      background: $color-bg;
      border-radius: 0.4rem;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 6rem;
  }

  .advantages {
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      p {
        opacity: 0.6;
      }
    }
  }

  footer {
    margin-block: 6rem;
  }
</style>
