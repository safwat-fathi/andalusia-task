<template>
  <section class="section panel">
    <div>
      <img
        class="img-responsive"
        src="/img/home.png"
        alt="home"
        width="330"
        height="257"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped lang="scss">
section {
  height: 70vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

div {
  width: 30%;
  margin: 0 auto;
}
</style>
