<template></template>

<script>
export default {
    mounted() {
        this.$store.dispatch("auth/logout");
        this.$router.push("/login?message=logout");
    },
}
</script>
