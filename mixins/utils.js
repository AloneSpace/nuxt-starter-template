export default {
  methods: {
    async timeOut(milliseconds) {
      return new Promise(resolve =>
        setTimeout(() => resolve("Passed"), milliseconds)
      );
    }
  }
};
