<template>
    <div class="content-wrapper">
        <section>
            <div class="container">
                <div class="auth">
                    <div class="auth__banner"></div>
                    <div class="auth__form">
                        <span class="ui-title-2">Registration</span>
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
                                <div class="error" v-if="!$v.email.email">
                                    Email is not correct
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
                                <div class="error" v-if="!$v.password.minLength">
                                    Password must have at least {{ $v.password.$params.minLength.min }} letters
                                </div>
                            </div>
                            <div class="form-item" :class="{ errorInput: $v.repeatPassword.$error }">
                                <input
                                    type="password"
                                    placeholder="Repear password"
                                    v-model="repeatPassword"
                                    :class="{ error: $v.repeatPassword.$error }"
                                    @change="$v.repeatPassword.$touch()"
                                >
                                <div class="error" v-if="!$v.repeatPassword.required">
                                    Repeat password is required
                                </div>
                                <div class="error" v-if="!$v.repeatPassword.sameAsPassword">
                                    Passwords must be identical
                                </div>
                            </div>
                            <div class="buttons-list">
                                <button 
                                    class="button button-success" 
                                    type="submit"
                                    :class="{ 'button--disable': $v.$invalid }"
                                >
                                    Registration
                                </button>

                                <div class="buttons-list buttons-list--info">
                                    <p class="typo__p" v-if="submitStatus === 'OK'">
                                        Thanks for your submission!
                                    </p>
                                    <p class="typo__p" v-if="submitStatus === 'ERROR'">
                                        Please fill the form correctly
                                    </p>
                                    <p class="typo__p" v-if="submitStatus === 'PENDING'">
                                        Sending...
                                    </p>
                                </div>

                                <div class="buttons-list buttons-list--info">
                                    <span>Do you have account?</span>
                                    <router-link to="/login">  Enter Here</router-link>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators"

export default {
    data () {
        return {
            email: "",
            password: "",
            repeatPassword: "",
            submitStatus: null,
        }
    },
    validations: {
        email: {
            required,
            email,
        },
        password: {
            required,
            minLength: minLength(6),
        },
        repeatPassword: {
            required,
            sameAsPassword: sameAs("password"),
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

                await this.$store.dispatch("auth/signup", formData);
                this.$router.push("/");
            } catch(error) {
                console.log(error)
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
    }

    @media screen and (max-width: 480px) {
        .auth {
            flex-direction: column-reverse;
        }

        .auth__banner, 
        .auth__form {
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
