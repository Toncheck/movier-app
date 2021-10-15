module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/_variables.scss";
        @import "@/assets/_functions.scss";
        @import "@/assets/_mixins.scss";`,
      },
    },
  },
};
