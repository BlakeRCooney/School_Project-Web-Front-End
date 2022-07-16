<template>
    <div class="bg-dark px-1 py-1 h-100">
        <div>
            <!-- This will be if I want to have a second page for the order history or jsut have it be a modal -->
            <!-- Might change this to the checkout page insted and just have the history load in a modal when clikced on in the nav dropdown -->
        </div>
    </div>
</template>

<script>

export default {
    name: " Purchase History",

    components: {},

    props: ['product'],

data() {
    return {}
},

    watch: {},

    computed: {},


beforeCreate() { },

created() { },

beforeMount() { },

mounted() { },

beforeUpdate() { },

updated() { },

beforeDestroy() { },

destroyed() { },
} 

</script>

<style>

.items-box {
    background-color: rgba(1.0, 1.0, 1.0, 0.8);
    background-image: url("");
}
</style>
