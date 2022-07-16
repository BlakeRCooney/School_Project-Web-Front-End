<template>
    <div class="bg-dark px-1 py-1 h-100">
        <b-row no-gutters align-v="stretch">
            <b-col cols="4">
                <b-img v-if="selectedVariant == -1" :src="require(`../assets/ClothingImages/${imgClothing}.png`)" fluid>
                </b-img>
                <b-img v-else :src="require(`../assets/ClothingImages/${variants[selectedVariant].sku}.png`)" fluid>
                </b-img>
            </b-col>
            <b-col cols="8" class="bg-dark px-2">
                <div class="d-flex flex-column">
                    <div class="mt-2 flex-grow-1 text-center font-weight-bold text-in-box-color shadow-sm rounded">
                        {{title}}
                    </div>
                    <div class="mt-5 flex-grow-1 text-center font-weight-bold text-in-box-color shadow-sm rounded">
                        {{description}}
                    </div>
                    <div>
                        <b-row no-gutters>
                            <!-- Need to work on getting the buttons to all be the same size -->
                            <b-col v-for="(variant, index) in variants" :key="variant.sku" class="w-80">
                                <b-button :variant="`${(index == selectedVariant) ? 'info' : 'secondary'}`"
                                    :disabled="variant.quantity_on_hand < 1" @click="setSelectedVariant(index)">
                                    <div class="d-flex flex-column">
                                        <div class="font-weight-bold">
                                            {{variant.color}}
                                        </div>
                                        <div>
                                            Size: {{variant.size}}
                                        </div>
                                        <div>
                                            ${{variant.price}}
                                        </div>
                                    </div>
                                </b-button>
                            </b-col>
                        </b-row>
                    </div>
                    <div>
                        <!-- This is for the V-Modal popup which is in Stage.vue -->
                        <!-- <b-button class="mt-5" block variant="info" v-b-modal.cart> Add to cart</b-button> -->
                        <!-- This is to use the side bar transition for the add to cart button 
                             Curently trying to get only the one pressed on to open the sidebar once-->
                        <b-button :disabled="selectedVariant == -1" v-b-tooltip.hover title="Click to Add" class="mt-5"
                            block variant="info" @click="addToCart">
                            Add To Cart
                        </b-button>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios'
const _ = require('underscore')

export default {
    name: "CategotyTile",
    components: {
    },
    props: {
        productID: String,
        imgClothing: String,
        title: String,
        description: String,
        show: Boolean
    },
    data() {
        return {
            variants: [],
            selectedVariant: -1
        }
    },
    methods: {
        // Not sure if this is being used anymore
        goToLink() {
            this.$router.to({path: this.link})
        },
        setSelectedVariant(index){
            this.selectedVariant = index; 
        },
        addToCart() {
            this.$store.commit("addToCart", {
                sku: this.variants[this.selectedVariant].sku,
                title: this.title,
                description: this.description,
                color: this.variants[this.selectedVariant].color,
                size: this.variants[this.selectedVariant].size,
                price: this.variants[this.selectedVariant].price,
                image: this.variants[this.selectedVariant].sku,
            })
        },
        removeFromCart() {
            this.$store.commit("removeProduct", this.variant.sku)
        }
    },
    watch: {

    },
    computed: {

    },
    beforeCreate() {

    },
    created() {
        // sku, color, size, quantity_on_hand, price
        axios.get(`http://localhost:3000/data/variants/${this.productID}`)
        .then((response) => {
            this.variants = _.sortBy(response.data.variants, (a,b)=>{
                return a.price - b.price;
            })
            // Select the lowest price, in stock item, if no variant is in stock, then simply select none of the items
            var first = _.find(this.variants, (variant)=>{ return variant.quantity_on_hand > 0 })
            if(first != undefined){
                this.selectedVariant = _.indexOf(this.variants, first);
            }
            console.log(this.variants)
        })
        .catch((error) => {
            console.log(error)
        })
    },
    beforeMount() {

    },
    mounted() {

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
    .hide-scrollbar-sidebar {
        overflow: hidden;
    }
    .sidebar-header {
        text-align: center;
        margin: 0 auto;
        float: none;
    }
    .text-in-box-color {
        color: yellowgreen;
    }
        .modal-mask {
            position: fixed;
            z-index: 9998;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: table;
            transition: opacity 0.3s ease;
        }
    
        .modal-wrapper {
            display: table-cell;
            vertical-align: middle;
        }
    
        .modal-container {
            width: 300px;
            margin: 0px auto;
            padding: 20px 30px;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
            transition: all 0.3s ease;
        }
    
        .modal-header h3 {
            margin-top: 0;
            color: #42b983;
        }
    
        .modal-body {
            margin: 20px 0;
        }
    
        .modal-default-button {
            float: right;
        }
    
        /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */
    
        .modal-enter-from {
            opacity: 0;
        }
    
        .modal-leave-to {
            opacity: 0;
        }
    
        .modal-enter-from .modal-container,
        .modal-leave-to .modal-container {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
</style>