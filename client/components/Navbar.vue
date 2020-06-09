<template>
    <div class="navbar">
        <div class="container">
            <div class="navbar-content">
                <router-link class="header-logo" to="/">UImini</router-link>
                <div class="button-burger" 
                    @click="showMenu = !showMenu"
                    :class="{ active: showMenu }"
                >
                    <span class="line line-1"></span>
                    <span class="line line-2"></span>
                    <span class="line line-3"></span>
                </div>
                <div class="navbar-list__wrapper" :class="{ active: showMenu }">
                    <ul class="navbar-list">
                        <li class="navbar-item" @click="showMenu = false">
                            <router-link class="navbar-link" to="/">Main</router-link>
                        </li>
                        <li class="navbar-item" @click="showMenu = false" v-if="isAuth">
                            <router-link class="navbar-link" to="/home">Home</router-link>
                        </li>
                        <li class="navbar-item" @click="showMenu = false" v-if="!isAuth">
                            <router-link class="navbar-link" to="/registration">Registration</router-link>
                        </li>
                        <li class="navbar-item" @click="showMenu = false" v-if="!isAuth">
                            <router-link class="navbar-link" to="/login">LogIn</router-link>
                        </li>
                        <li class="navbar-item" @click="showMenu = false" v-if="isAuth">
                            <router-link class="navbar-link" to="/logout">LogOut</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false,
        }
    },
    watch: {
        "$route" (to, from) { 
            document.title = to.meta.title;
        },
    },
    computed: {
        isAuth() {
            return this.$store.getters['auth/isAuth'];
        },
    },
}
</script>