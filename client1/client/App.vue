<template>
    <div class="wrapper">
        <header>
            <Navbar></Navbar>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
    components: {
        'Navbar': Navbar,
    }
}
</script>

<style lang="scss">

</style>
