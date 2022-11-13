<script lang="ts">
  import { Webwriter } from '@webwriter/vite-plugin-svelte/components';
  import { i18n } from '../stores';

  let locale;

  i18n.subscribe((value) => {
    locale = value.current;
  });

  export let book: string;
  export let chapter: string;
  export let prodContent: any;
</script>

<Webwriter path={`${locale}/${book}/${chapter}.txt`}>
  {@html prodContent[chapter]}
</Webwriter>
