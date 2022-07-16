<template>
    <div class="mt-3">
        <div v-for="gender in distinctGenders" :key="gender">
            <b-row>
                <b-col cols="12">
                    <h3 class="text-center h3-text">{{gender.charAt(0).toUpperCase() + gender.slice(1)}} Products</h3>
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col v-for="product in productsByGender[gender]" :key="product.id" xl="4" lg="6" md="6" sm="12" class="mb-2">
                    <category-tile 
                        :productID="product.id"
                        :imgClothing="product.id" 
                        :title="product.name" 
                        :description="product.description"
                    >
                    </category-tile>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

import CategoryTile from '@/components/CategoryTile.vue'
import History from '@/components/purchaseHistory.vue'
import axios from 'axios'

const _ = require('underscore')


export default {
    name: "Home",
    components: {
        'category-tile': CategoryTile,
        'perchaseHistory': History,
    },
    props: {

    },
    data() {
        return {
            products: [],
            distinctGenders: [],
            productsByGender: {},
            // Thinking about putting these in the index.js and pushing the genders into there
            // That will allow me to use state.(genderChosen) to call which gender I want to be rendered in the category tiles
            mensProducts: [],
            womensProducts: [],
            unisexProducts: [],
            

        }
    },
    methods: {
        collectGenders(){
            this.distinctGenders = [];
            let genderSet = new Set();
            this.products.forEach(product=>{
                genderSet.add(product.gender)
            })
            genderSet.forEach((gender)=>{
                this.distinctGenders.push(gender)
                this.productsByGender[gender] = _.filter(this.products, (product)=>{ return product.gender == gender; })
            })
        },

        // Create a forEach for the gender male
        mensClothing() {
            console.log(this.products)
            // Need to extract all genders the == male and push them into mensProducts array
            products.gender.forEach((gender) => {
                if (products.gender == male) {
                    mensProducts.push(gender)
                } else {
                    // Leave Blank beacuse only male needs to be pushed into the mensProducts array
                }
                console.log(mensProducts)
            });
        },
        // Create a forEach for the gender female
        womendsClothing() {
            products.gender.forEach((gender) => {
                if (products.gender == female) {
                    mensProducts.push(gender)
                } else {
                    // Leave Blank beacuse only male needs to be pushed into the womensProducts array
                }
                console.log(womensProducts)
            });
        },
        // Create a forEach for the gender unisex or categorize by "accessory"
        accessories() {
            products.gender.forEach((gender) => {
                if (products.gender == unisex) {
                    unisexProducts.push(gender)
                } else {
                    // Leave Blank beacuse only male needs to be pushed into the unisexProducts array
                }
                console.log(unisexProducts)
            });
        }
    },
    watch: {

    },
    computed: {
        
    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {
        axios.get('http://localhost:3000/data/products')
            .then((response) => {
                console.log(response.data)
                this.products = response.data.products
                this.collectGenders();
            })
            .catch((error) => {
                console.log(error)
            })
    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },

}
</script>

<style>

    .h3-text {
        color: yellowgreen
    }
</style>