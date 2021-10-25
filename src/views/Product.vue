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
            id="type"
            :style="{
              backgroundImage: 'url(/img/arrow-select.png)',
            }"
            :disabled="selectedWarehouse == '' || allProducts"
            v-model="selectedType"
          >
            <option value="">Select UOM Type</option>
            <option v-for="type in types" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="product-search_checkbox">
          <input type="checkbox" id="balance" v-model="zeroBalance" />
          <label for="balance">Show Zero Balance</label>
        </div>
      </div>

      <div class="product-classification">
        <h3>product classification</h3>
        <div style="display: flex; align-items: flex-end; height: 4rem;">
          <div class="select-type">
            <label
              :class="[selectedWarehouse == '' ? 'disabled' : '', 'container']"
              >all product
              <input
                type="radio"
                checked="checked"
                name="radio"
                :disabled="selectedWarehouse == ''"
                @change="handleProductClass"
              />
              <span class="checkmark"></span>
            </label>
            <label
              :class="[selectedWarehouse == '' ? 'disabled' : '', 'container']"
              >specific product
              <input
                type="radio"
                name="radio"
                :disabled="selectedWarehouse == ''"
                @change="handleProductClass"
              />
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="product-search_select" v-if="!allProducts">
            <label for="product">Product</label>
            <multiselect
              v-model="selectedName"
              :options="productsNames"
              :multiple="true"
              placeholder="Select product or search product"
              label="name"
              track-by="name"
              @select="handleName"
            >
              <!-- <template slot="selection" slot-scope="{ values, search, isOpen }">
								<span
                  class="multiselect__single"
                  v-if="values.length &amp;&amp; !isOpen"
                  >{{ values.length }} options selected</span>
								</template> -->
            </multiselect>
          </div>
        </div>
      </div>

      <button @click="handleSearch">Search</button>

      <div v-if="noResult">
        <h3>No results</h3>
      </div>
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

      <div>
        <div
          style="display: flex;
justify-content: center;
align-items: center;"
          v-if="!filteredProducts.length"
        >
          <img src="/img/noDataFoundGreen.svg" alt="" />
        </div>

        <table v-else>
          <!-- headers -->
          <tr>
            <th>Product</th>
            <th>On-Hand</th>
            <th>Type</th>
          </tr>
          <!-- search -->
          <tr>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <!-- data -->
          <!-- v-if="!filteredProducts.length" -->
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.items }}</td>
            <td>{{ product.type }}</td>
          </tr>
        </table>
      </div>
    </section>
  </section>
</template>

<script>
import data from "@/data";
import Multiselect from "vue-multiselect";

export default {
  name: "Product",
  components: {
    Multiselect,
  },
  data() {
    return {
      warehouses: data,
      types: [],
      warehouseProducts: [],
      filteredProducts: [],
      selectedWarehouse: "",
      productsNames: [],
      selectedType: "",
      selectedName: "",
      allProducts: true,
      zeroBalance: false,
      noResult: false,
    };
  },
  mounted() {
    // console.log(data);
  },
  methods: {
    handleName(value, id) {
      // console.log(value);
      // console.log(this.selectedName);
      // this.selectedName.push(value);
    },
    handleWarehouseChange(e) {
      if (this.selectedWarehouse == "") {
        this.warehouseProducts = [];
        this.filteredProducts = [];
        this.selectedType = "";
        this.types = [];
        return;
      }

      this.warehouseProducts = this.selectedWarehouse.products;
      // get types
      let typesFromProducts = this.warehouseProducts.map(
        (product) => product.type
      );
      // set unique types
      this.types = [...new Set(typesFromProducts)];
      this.productsNames = this.warehouseProducts.map((product) => ({
        name: product.name,
        id: product.id,
      }));
    },
    handleProductClass() {
      this.allProducts = !this.allProducts;
    },
    handleFilterProductByName(value, id) {
      // console.log(this.warehouseProducts);
      // console.log(this.filteredProducts);
    },
    handleSearch() {
      // reset no result
      this.noResult = false;

      this.filteredProducts = this.warehouseProducts;

      // apply filters
      if (this.zeroBalance) {
        this.filteredProducts = this.filteredProducts.filter(
          (product) => product.items == 0
        );
      }

      if (this.selectedType != "") {
        this.filteredProducts = this.filteredProducts.filter(
          (product) => product.type == this.selectedType
        );
      }

      if (this.selectedName != "") {
        let names = this.selectedName.map((el) => el.name);

        this.filteredProducts = this.filteredProducts.filter(
          (product) => names.indexOf(product.name) >= 0
        );
      }

      if (!this.filteredProducts.length) {
        this.noResult = !this.noResult;
      }

      console.log(this.filteredProducts);
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

// disabled radio button
.disabled {
  color: #ccc;

  input:checked ~ .checkmark {
    border: 2px solid #ccc !important;

    &::after {
      background: #ccc;
    }
  }
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
