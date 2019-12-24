<template>
    <div class="wrapper">
        <header>
            <div class="navbar">
                <div class="container">
                    <div class="navbar-content">
                        <router-link class="header-logo" to="/">UImini</router-link>
                        <div class="button-burger" 
                            @click="menuShow = !menuShow"
                            :class="{ active: menuShow }"
                        >
                            <span class="line line-1"></span>
                            <span class="line line-2"></span>
                            <span class="line line-3"></span>
                        </div>
                        <div class="navbar-list__wrapper" :class="{ active: menuShow }">
                            <ul class="navbar-list">
                                <li class="navbar-item" @click="menuShow = false">
                                    <router-link class="navbar-link" to="/">Home</router-link>
                                </li>
                                <li class="navbar-item" @click="menuShow = false">
                                    <router-link class="navbar-link" to="/registration">Registration</router-link>
                                </li>
                                <li class="navbar-item" @click="menuShow = false">
                                    <router-link class="navbar-link" to="/login">Login</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            menuShow: false,
        }
    },
    methods: {},
}
</script>

<style lang="scss">
    
</style>
