<template>
    <div class="content-wrapper">
        <section>
            <div class="container">
                <div class="auth">
                    <div class="auth__banner"></div>
                    <div class="auth__form">
                        <span class="ui-title-2">Login</span>
                        <form @submit.prevent="onSubmit">
                            <div class="form-item" :class="{ errorInput: $v.email.$error }">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    v-model="email"
                                    :class="{ error: $v.email.$error }"
                                    @change="$v.email.$touch()"
                                >
                                <div class="error" v-if="!$v.email.required">
                                    Field is required
                                </div>
                            </div>
                            <div class="form-item" :class="{ errorInput: $v.password.$error}">
                                <input 
                                    type="password"
                                    placeholder="Password"
                                    v-model="password"
                                    :class="{ error: $v.password.$error }"
                                    @change="$v.password.$touch()"
                                >
                                <div class="error" v-if="!$v.password.required">
                                    Password is required
                                </div>
                            </div>
                            <div class="buttons-list">
                                <button 
                                    class="button button-success" 
                                    type="submit"
                                    :class="{ 'button--disable': $v.$invalid }"
                                >
                                    Login
                                </button>

                                <div class="buttons-list buttons-list--info">
                                    <span>Do you need account?</span>
                                    <router-link to="/registration">  Enter Here</router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
    data () {
        return {
            email: "admin@admin.ru",
            password: "123456",
        }
    },
    validations: {
        email: {
            required,
        },
        password: {
            required,
        },
    },
    methods: {
        async onSubmit() {
            try {
                this.$v.$touch();
                if (this.$v.$invalid) return;

                const formData = {
                    login: this.email,
                    password: this.password,
                };

                await this.$store.dispatch("login", formData);
                this.$router.push("/");
            } catch(error) {
                console.error(error);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .auth {
        display: flex;
    }

    .auth__banner, 
    .auth__form {
        width: 50%;

        @media screen and (max-width: 768px) {
            width: 100%;
            margin-bottom: 30px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .form-item {
        .error {
            display: none;
            margin-bottom: 8px;
            font-size: 13.4px;
            color: #fc5c65;
        }

        &.errorInput {
            .error {
                display: block;
            }
        }
    }

    .shake {
        animation-name: shake;
    }

    @keyframes shake {
        from, to {
            transform: translate3d(0, 0, 0);
        }

        10%, 30%, 50%, 70%, 90% {
            transform: translate3d(-4px, 0, 0);
        }

        20%, 40%, 60%, 80% {
            transform: translate3d(4px, 0, 0);
        }
    }
    
    input {
        &.error {
            border-color: #fc5c65;
            animation: shake .3s;
        }
    }

    .buttons-list {
        text-align: right;
        margin-bottom: 20px;

        &.buttons-list--info {
            text-align: center;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    a {
        color: #444ce0;
    }
</style>
