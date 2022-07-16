<template>
    <div class="stage homePage-background">
        <b-navbar ref="navbar" toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand to="/" class="text-success  font-weight-bold">
                <b-icon-check2-square></b-icon-check2-square> Done-It - A Clothing Store
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav-dropdown right>
                        <b-nav-item-dropdown right>
                            <!-- Using a 'button-content' slot -->
                            <template #button-content>
                                <em>
                                    User Settings
                                    <b-icon-gear-fill></b-icon-gear-fill>
                                </em>
                            </template>

                            <!-- Needs to open the cart Sidebar when clicked, or maybe have a modal open up with the items in the shaopping cart -->
                            <b-dropdown-item id="cart" @click="showSidebar">Shopping Cart</b-dropdown-item>
                            <!-- Needs to display the cart sidebar -->
                            <!-- Created a function called toggleSidebar to see if it will display the customers sidebar cart with all of the products currently in it -->
                            <b-sidebar id="cart"></b-sidebar>

                            <!-- Creating a modal for the order history -->
                            <b-dropdown-item v-b-modal.history>Order History</b-dropdown-item>
                            <b-modal id="history" title="Order History">
                                <p class="my-4">Your Order History</p>
                            </b-modal>

                            <!-- The Gerneric About Page -->
                            <b-dropdown-item to="/about">About</b-dropdown-item>

                            <!-- Log the user out -->
                            <b-dropdown-item @click.stop.prevent="performLogout">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div class="stage-content" :style="`max-height: ${innerAllowableHeight}px; height: ${innerAllowableHeight}`">
            <div>
                <!-- Start of the cart sidebar -->
                <b-sidebar id="shoppingCart" bg-variant="dark" text-variant="light" right shadow
                    v-model="$store.state.itemHasBeenAdded">
                    <h3 class="sidebar-header">Your Cart</h3>
                    <div class="px-3 py-2" v-if="$store.state.itemHasBeenAdded">
                        <p class="sidebar-header">Item has been added to the cart!</p>
                        <b-row>
                            <b-col cols="4">
                                <b-img
                                    :src="require(`../assets/ClothingImages/${$store.state.lastItemAdded.image}.png`)"
                                    fluid></b-img>
                            </b-col>
                            <b-col cols="8" class="d-flex flex-column">
                                <div class="font-weight-bold">
                                    {{ $store.state.lastItemAdded.title }} <small>{{ $store.state.lastItemAdded.color }}
                                        {{ $store.state.lastItemAdded.size }}</small>
                                </div>
                                <div>
                                    {{ $store.state.lastItemAdded.description }}
                                </div>
                                <div class="font-weight-bold">
                                    ${{ $store.state.lastItemAdded.price }}
                                </div>
                            </b-col>
                        </b-row>
                    </div>

                    <!-- Items in Cart Header -->
                    <div class="mx-auto py-2">
                        <h4 class="text-center">Current items in Cart</h4>
                    </div>
                    <div id="removeAllItems">
                        <div v-for="item in $store.state.theCart" :key="item.image" id="itemInCart" class="my-1">
                            <b-row>
                                <b-col cols="4">
                                    <b-img :src="require(`../assets/ClothingImages/${item.image}.png`)" fluid></b-img>
                                </b-col>
                                <b-col cols="8" class="d-flex flex-column">
                                    <div class="font-weight-bold">
                                        {{ item.title }} <small>{{ $store.state.lastItemAdded.color }} {{
                                            $store.state.lastItemAdded.size }}</small>
                                    </div>
                                    <div>
                                        {{ item.description }}
                                    </div>
                                    <div>
                                        ${{ item.price }}
                                    </div>

                                    <!-- Adding button to remove a THIS product from the cart -->
                                    <!-- Remove the button becuase it does not say items need to be deleted in the assignment -->
                                    <b-row>
                                        <div class="mr-3 flex-grow-1">
                                            <div class="mt-2">
                                                <b-button pill variant="outline-danger" block @click="removeProduct">
                                                    Remove Item
                                                </b-button>
                                            </div>
                                        </div>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </div>
                    </div>


                    <!-- Start of the Buttons in the Sidebar-->
                    <div class="mt-5 py-lg-5">
                        <div class="mt-2 px-3">

                            <!-- Need to create the function to remove all items currently in the cart -->
                            <!-- Remove the button becuase it does not say items need to be deleted in the assignment -->
                            <b-row>
                                <div class="mt-2 flex-grow-1">
                                    <div class="mt-2">
                                        <b-button pill variant="outline-danger" block @click="removeAllCartProducts">
                                            Remove All Items
                                        </b-button>
                                    </div>
                                </div>
                            </b-row>

                            <!-- Need to have the checkout button pull up a modal or a seperate page so user can input shipping address and fake "credit card" infromation -->
                            <b-row>
                                <div class="mt-2 flex-grow-1">
                                    <div class="mt-2">
                                        <b-button pill variant="outline-success" block v-b-modal.checkoutModal>Check Out
                                        </b-button>
                                    </div>
                                </div>
                            </b-row>
                        </div>
                    </div>
                </b-sidebar>

                <!-- Creation of the checkout modal -->
                <!-- Have the user be prompted after clicking checkout that their order has been processed -->
                <b-modal id="checkoutModal" title="Check Out" ok-title="Purchase">
                    <div class="ml-auto mr-auto">
                        <h3>Order Review:</h3>
                        <div id="removeAllItems">
                            <div v-for="item in $store.state.theCart" :key="item.image" id="itemInCart" class="my-1">
                                <b-row>
                                    <b-col cols="8" class="d-flex flex-column">
                                        <div class="font-weight-bold">
                                            {{ item.title }} <small>{{ $store.state.lastItemAdded.color }} {{
                                                $store.state.lastItemAdded.size }}</small>
                                        </div>
                                        <div>
                                            {{ item.description }}
                                        </div>
                                        <div>
                                            ${{ item.price }}
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Shipping Infomation:</h3>
                        <div>
                            <b-input-group prepend="First and last name:" variant="info">
                                <b-form-input></b-form-input>
                            </b-input-group>
                        </div>
                        <div>
                            <b-input-group prepend="Address:">
                                <b-form-input></b-form-input>
                            </b-input-group>
                        </div>
                        <div>
                            <b-input-group prepend="Email:">
                                <b-form-input></b-form-input>
                            </b-input-group>
                        </div>
                        <div>
                            <b-input-group prepend="Phone Number:">
                                <b-form-input></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                    <div>
                        <h3>Credit Card Information:</h3>
                        <div>
                            <b-input-group prepend="Card Number:">
                                <b-form-input></b-form-input>
                            </b-input-group>
                        </div>
                        <div>
                            <b-input-group prepend="First and last name:">
                                <b-form-input></b-form-input>
                            </b-input-group>
                        </div>
                        <div>
                            <b-input-group prepend="Address:">
                                <b-form-input></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                </b-modal>
            </div>
            <router-view />
        </div>
    </div>
</template>

<script>
import router from '@/router'

// Import the perchase history vue file to use with the Order History modal
import History from '@/components/purchaseHistory.vue'

export default {
    name: 'Stage',
    components: {
        'perchaseHistory': History,
    },
    data() {
        return {
            innerAllowableHeight: 800,
            navObserver: null,
            isSidebarActive: false,
        }
    },
    methods: {
        // Checking to see if this will toggle the sidebar with the current products in the cart after clicking the addToCart button
        showSidebar() {
            this.$root.$emit("bv::toggle::collapse","shoppingCart")
        },
        performLogout() {
            this.$store.dispatch('logoutUser')
        },
        watchHeight() {
            this.innerAllowableHeight = window.innerHeight - this.$refs['navbar'].$el.getBoundingClientRect().height
        },
        // Create the remove item in cart button, this will remove the whole item that the button is associated with
        removeFromTableFields(row) {
            console.log("Removing Attachment")
            console.log(row)
        }
    },

    computed: {

    },
    mounted() {
        this.navObserver = new ResizeObserver((entires) => {
            this.watchHeight();
        })
        this.navObserver.observe(this.$refs['navbar'].$el)
        this.watchHeight()
    },
    created() {
        window.addEventListener("resize", this.watchHeight);
    },
    destroyed() {
        window.removeEventListener("resize", this.watchHeight);
        this.navObserver.unobserve(this.$refs['navbar'].$el)
    }
}
</script>

<style>

.stage-content {
    overflow-y: auto;
    overflow-x: hidden;
}
.homePage-background {
    background: black;
    background-image: no-repeat;
    background-size: cover;
}
</style>