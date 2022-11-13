import fs from 'vite-plugin-fs/browser';

export default {
  async loadRaw(path) {
    try {
      const text = await fs.readFile(path);
      return text;
    } catch (err) {
      return '';
    }
  },

  async loadHtml() {
    return '';
  },

  async save(path, data) {
    await fs.writeFile(path, data);
  },
};
