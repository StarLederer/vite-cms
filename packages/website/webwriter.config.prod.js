export default {
  async loadHtml(path) {
    try {
      const res = await fetch(`/content/${path}`);
      const text = await res.json();
      return text;
    } catch (err) {
      return '';
    }
  },
};
