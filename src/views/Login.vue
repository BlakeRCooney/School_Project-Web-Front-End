<template>
    <div class="d-flex flex-row justify-content-center align-items-center h-100 login-background">
        <div class="login-box py-3 px-4 rounded-lg">
            <b-row>
                <b-col class="text-center">
                    <span class="text-success logo-font-weight">
                        <b-icon-check2-square></b-icon-check2-square>
                        Done-it
                    </span>
                    <b-row class="justify-content-center">
                        <span class="text-success login-text-size">
                            A clothing store
                        </span>
                    </b-row>
                </b-col>
            </b-row>
            <b-row v-if="hasError">
                <b-col>
                    <b-form-text text-variant="danger">{{helpText}}</b-form-text>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col class="text-center">
                    <b-form-input text="text" placeholder="Username" v-model="username"></b-form-input>
                    <b-form-input text="text" placeholder="Password" v-model="password"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-center">
                    <div class="d-flex flex-row justify-content-center align-items-center login-info-text-color">
                        <b-row>
                            <b-col>
                                Usename: blahblah@example.com
                            </b-col>
                        </b-row>
                    </div>
                    <div class="d-flex flex-row justify-content-center align-items-center login-info-text-color">
                        <b-row>
                            <b-col>
                                Password: 12345
                            </b-col>
                        </b-row>
                    </div>
                    <!-- <b-button variant="info" @click="createAccount">
                        Create Account
                    </b-button> -->
                    <b-button variant="success" @click="login">
                        Login
                    </b-button>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
// const underscore = require('underscore')
const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_BASE_URL
})

    export default {
        name: "login",
        components:{

        },
        props:{

        },
        data(){
            return {
                username: null,
                password: null,
                hasError: null,
                helpText: null,
                redirectTo: "/"
            }
        },
        methods: {
            checkValidInputs(){
                var anyInvalid = false;
                 if(this.password != null && this.password.length > 0){

                }else{
                    this.hasError = true;
                    this.helpText = "Please Enter Password";
                    anyInvalid = true;
                }
                if(this.username != null && this.username.length > 4 && this.username.indexOf("@") != -1 && this.username.indexOf(".") != -1){
                    //Possibly Valid Email

                }else{
                    this.hasError = true;
                    this.helpText = "User is Invalid";
                    anyInvalid = true;
                }
                if(!anyInvalid){
                    this.hasError = false;
                    this.helpText = null;
                    anyInvalid = true;
                }
            },
            login(){
                this.checkValidInputs();
                if(!this.hasError){
                    var packed = {
                        username: this.username,
                        password: this.password
                    };
                    instance.post("/auth/login", packed)
                    .then((reponse) =>{
                        this.$store.commit('loginUser');
                        this.$router.push({ path: this.redirectTo })
                    })
                    .catch((err) => {
                        // Promises are rejected in Axios when one of the following condintions is met
                        // The request can not be sent - No network connection, the host requested is unreachable
                        //       -- This one DOES NOT have a response Obeject
                        // The request was rejected preflight = CORS Issues - Other misc issues
                        //       -- This one DOES NOT have a response Obeject
                        // The request was made, and the response was a bad respone code - i.e 400-599
                        //       -- This one HAS a response Object
                        if (err.response) {
                                //If resspones is not a key on err, then iut wont run this
                            var resStatus = err.response.status;
                            if (resStatus == 400) {
                                this.hasError = true;
                                this.helpText = "Username of Password is Invalid"
                            } else if (resStatus == 500) {
                                this, hasError = true;
                                this.helpText = "An Error Occured During Login"
                            } else{
                                this.hasError = true;
                                this.helpText = `An Undeified Error has Occured. Status: ${resStatus}`
                            }
                        }else{
                            //If response it undefined
                            this, hasError = true;
                            this.helpText = "An Network Error has Occured"
                            console.log(err);
                        }
                        
                    })
                }
                //ToDo create login
                // console.log("User Clicked Login")
            },
                //ToDO ability to create an account
            createAccount(){
                
            }
        },
    watch:{

    },
    computed: {

    },
    beforeCreate() {
    },
    created() {
        // Check if this user needs to be redirected
        if (this.$route.query) {
            if (this.$route.query.redirect) {
                // Need to redirect the user
                this.redirectTo = this.$route.query.redirect
            }
        }
        instance.get('/auth/status')
            .then((response) => {
                //User is already logged in and that they are on the wrong page
                this.$store.commit('loginUser');
                this.$router.push({ path: this.redirectTo })
            })
            .catch((err) => {
                //The user us not aleady logged in
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

<style scoped>
    .logo-font-weight{
        font-size: 3rem;
        font-weight:300;
    }
    .login-box{
        background-color: rgba(1.0, 1.0, 1.0, 0.8);
        background-image: url("");
    }
    .login-background{
        background-image: url("~@/assets/Store-Background.jpg");
        background-image: no-repeat;
        background-size: cover;
    }
    .login-title{
        font-size: 2rem;
    }
    .login-text-size{
        font-size: 1rem;
    }
    .login-info-text-color{
        color: limegreen
    }
</style>