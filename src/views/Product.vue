<template>
  <h1 class="page">Product</h1>
  <section class="section panel">
    <div class="section_header">
      <div class="image">
        <img
          class="img-responsive"
          src="/img/files-icon.png"
          alt=""
          width="19"
          height="19"
        />
      </div>
      <h3 class="title">Basic Inofrmation</h3>
    </div>

    <section>
      <div class="product-search">
        <div class="product-search_select">
          <label for="warehouse">Warehouse</label>
          <select
            name=""
            id="warehouse"
            :style="{
              backgroundImage: 'url(/img/arrow-select.png)',
            }"
            v-model="selectedWarehouse"
            @change="handleWarehouseChange"
          >
            <option value="">Select Warehouse</option>
            <option
              v-for="warehouse of warehouses"
              :key="warehouse.id"
              :value="warehouse"
            >
              {{ warehouse.name }}
            </option>
          </select>
        </div>

        <div class="product-search_select">
          <label for="type">Type</label>
          <select
            name=""
            id="type"
            :style="{
              backgroundImage: 'url(/img/arrow-select.png)',
            }"
          >
            <option value="">Select UOM Type</option>
            <!-- <option v-for="" value="">UOM Type 1</option> -->
          </select>
          <VueMultiselect v-model="value" :options="['awdwad', 'awdawd']">
          </VueMultiselect>
        </div>

        <div class="product-search_checkbox">
          <input type="checkbox" id="balance" />
          <label for="balance">Show Zero Balance</label>
        </div>
      </div>

      <div class="product-classification">
        <h3>product classification</h3>
        <div class="select-type">
          <label class="container"
            >all product
            <input type="radio" checked="checked" name="radio" />
            <span class="checkmark"></span>
          </label>
          <label class="container"
            >specific product
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>

      <button>Search</button>
    </section>

    <section class="section">
      <div class="section_header">
        <div class="image">
          <img
            class="img-responsive"
            src="/img/file-icon.png"
            alt=""
            width="19"
            height="19"
          />
        </div>
        <h3 class="title">Products Details</h3>
      </div>
    </section>
  </section>
</template>

<script>
import data from "@/data";
import VueMultiselect from "vue-multiselect";

export default {
  name: "Product",
  components: {
    VueMultiselect,
  },
  data() {
    return {
      value: "",
      warehouses: data,
      selectedWarehouse: "",
      selectedTypes: "",
    };
  },
  mounted() {
    // console.log(data);
  },
  methods: {
    handleWarehouseChange(e) {
      this.selectedTypes = this.selectedWarehouse.products_types;
      console.log(this.selectedWarehouse);
      console.log(this.selectedTypes);
      // this.selectedTypes = this.warehouses.map((warehouse, idx) => {
      //   return warehouse.name == this.selectedWarehouse
      //     ? warehouse.products_types
      //     : null;
      // });

      // console.log(this.selectedTypes);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped lang="scss">
.product-search {
  display: flex;
  gap: 3rem;

  &_select {
    width: 290px;

    label {
      display: inline-block;
      text-transform: capitalize;
      margin-block-end: 5px;
      position: relative;
      &:after {
        position: absolute;
        right: -10px;
        top: 0;
        display: block;
        content: "*";
        color: red;
      }
    }

    select {
      width: 100%;
      padding: 7px 5px;
      border-radius: 5px;
      border: 2px solid #e4edf6;
      appearance: none;
      background-repeat: no-repeat;
      background-position: 100% 0;
      background-size: contain;
    }
  }

  &_checkbox {
    align-self: flex-end;

    input {
      margin-inline-end: 0.4rem;
    }
  }
}

.product-classification {
  margin-bottom: 20px;

  h3 {
    text-transform: capitalize;
  }

  .select-type {
    display: flex;
  }

  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    margin-inline-end: 100px;
    cursor: pointer;
    font-size: 18px;
    text-transform: capitalize;
    user-select: none;
  }

  /* Hide the browser's default radio button */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the radio button is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #fff;
    border: 2px solid #2b94f9;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .container .checkmark:after {
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #2b94f9;
  }
}

.section {
  &_header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 10px;
    margin-bottom: 20px;

    .image {
      margin-inline-end: 10px;
      // img {
      //   display: block;
      // }
    }

    .title {
      font-size: 16px;
      text-transform: capitalize;
      margin: 0;
    }
  }
}
</style>
