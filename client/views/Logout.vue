<template></template>

<script>
export default {
    mounted() {
        this.$store.dispatch("auth/logOut");
        this.$router.push("/login?message=logout");
    },
}
</script>
