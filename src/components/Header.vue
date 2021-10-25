<template>
  <header class="header">
    <div class="header_logo">
      <img
        class="img-responsive"
        src="/img/logo.png"
        alt="product logo"
        width="729"
        height="174"
      />
    </div>
    <div class="header_search">
      <form class="form">
        <input
          class="form_input"
          type="text"
          placeholder="search for patient(name ,code,phone number)"
        />
        <button>
          <img src="/img/search-icon.png" alt="" />
        </button>
      </form>
    </div>
    <div class="header_user">
      <select name="" id="">
        <option value="">english</option>
        <option value="">arabic</option>
      </select>
      <div class="avatar">
        <div class="avatar_image">
          <img
            class="img-responsive"
            src="/img/user.png"
            alt="user"
            width="35"
            height="35"
          />
        </div>
        <span class="avatar_name">User Name</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #fff;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.05);

  &_search {
    display: flex;
    align-items: center;
    flex: 1;
    margin-inline-end: 4rem;
  }

  &_user {
    display: flex;

    select {
      text-transform: capitalize;
      color: #007bff;
      position: relative;
      border: none;
      margin-inline-end: 15px;

      &::after {
        content: "";
        height: 50px;
        width: 1px;
        background: #ccc;
        left: 0;
        bottom: 0;
      }
    }
  }

  &_logo {
    width: 140px;
    margin-inline-end: 10px;
  }
}

.form {
  display: flex;
  flex: 1;

  &_input {
    width: 100%;
    border: none;
    background: #e8f0f7;
    color: #000;
    border-right: 1px solid #0357a8;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 5px 10px;
  }

  button {
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
}

.avatar {
  display: flex;
  align-items: center;

  &_image {
    border-radius: 50%;
    overflow: hidden;
    margin-inline-end: 5px;
  }

  &_name {
    color: #325370;
  }
}
</style>
