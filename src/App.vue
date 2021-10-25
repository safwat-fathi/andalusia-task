<template>
  <Header />
  <Nav />
  <router-view />
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Nav,
    Footer,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/normalize.scss";
</style>
