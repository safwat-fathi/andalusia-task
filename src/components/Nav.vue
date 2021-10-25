<template>
  <nav class="nav">
    <div class="nav_menu">
      <img
        class="img-responsive"
        src="/img/menu-icon.png"
        alt=""
        @click="this.showDropdown = !this.showDropdown"
      />
    </div>
    <ul class="nav_breadcrumb">
      <li @click="routeTo(0)" style="cursor: pointer">
        <img class="img-responsive" src="/img/home-icon.png" alt="" />
      </li>
      <li
        v-for="(breadCrumb, index) in breadCrumbList"
        :key="index"
        @click="routeTo(index)"
        :class="
          breadCrumbList[breadCrumbList.length - 1].name == breadCrumb.name
            ? 'active'
            : 'link'
        "
      >
        {{ breadCrumb.name }}
      </li>
    </ul>

    <div class="dropdown" v-if="showDropdown">
      <ul>
        <li>
          <router-link to="/product">
            <img
              class="img-responsive"
              src="/img/admin.svg"
              alt=""
              width="30"
              height="30"
            />
            Product
          </router-link>
        </li>
      </ul>
    </div>

    <div
      class="overlay"
      v-if="showDropdown"
      @click="showDropdown = !showDropdown"
    ></div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      breadCrumbList: [],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name !== from.name && this.showDropdown) {
        this.showDropdown = !this.showDropdown;
      }

      // set breadcrumb list based on route path
      this.breadCrumbList = this.$route.meta.breadCrumb;
    },
  },
  updated() {},
  methods: {
    routeTo(indexOfPath) {
      // add breadcrumbs
      console.log(this.breadCrumbList[indexOfPath].name);
      console.log(this.breadCrumbList[this.breadCrumbList.length - 1].name);
      if (this.breadCrumbList[indexOfPath].link) {
        this.$router.push(this.breadCrumbList[indexOfPath].link);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  background: #0357a8;
  margin: 15px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  z-index: 101;

  &_breadcrumb {
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      position: relative;
      margin-inline-end: 15px;
      padding-inline: 5px;
      color: #fff;

      &:after {
        display: block;
        content: ">";
        bottom: 1px;
        left: -10px;
        position: absolute;
        color: #b3b3b3;
        font-size: 15px;
      }

      span {
        font-size: 13px;
      }
    }
  }

  &_menu {
    cursor: pointer;
    margin-inline-end: 20px;
    position: relative;

    &:after {
      display: block;
      content: "";
      position: absolute;
      bottom: -7.3px;
      right: -10px;
      height: 28px;
      width: 1px;
      background: #fff;
    }
  }

  li:first-child:after {
    display: none;
  }

  .dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 2rem;
    background-color: #eafbff;
    z-index: 10;
    padding: 1rem 2rem;
    border-radius: 7px;

    ul {
      display: flex;

      li a {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        text-decoration: none;
      }

      li a img {
        margin-bottom: 0.5rem;
        width: 2rem;
      }
    }
  }

  .overlay {
    position: fixed;
    top: 3.4rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .link {
    cursor: pointer;
    color: rgb(116, 113, 113);
  }

  .active {
    color: #fff;
  }
}
</style>
