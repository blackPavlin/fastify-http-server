<template>
  <div class="auth">
    <div class="auth__banner"></div>
    <div class="auth__form">
      <span class="ui-title-2">Login</span>
      <form @submit.prevent="onSubmit">
        <div class="form-item" :class="{ errorInput: v.login.$error }">
          <input
            type="email"
            placeholder="Login"
            v-model="login"
            :class="{ error: v.login.$error }"
            @change="v.login.$touch()"
          />
          <p
            class="error"
            v-for="(error, index) of v.login.$errors"
            :key="index"
          >
            {{ error.$message }}
          </p>
        </div>
        <div class="form-item" :class="{ errorInput: v.password.$error }">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            :class="{ error: v.password.$error }"
            @change="v.password.$touch()"
          />
          <p
            class="error"
            v-for="(error, index) of v.password.$errors"
            :key="index"
          >
            {{ error.$message }}
          </p>
        </div>
        <div class="buttons-list">
          <button
            class="button button-success"
            :class="{ 'button--disable': v.$invalid }"
            type="submit"
          >
            Login
          </button>
          <div class="buttons-list buttons-list--info">
            <p class="typo__p" v-if="submitStatus === 'OK'">
              Thanks for your submission!
            </p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">
              Please fill the form correctly
            </p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
          </div>
          <div class="buttons-list buttons-list--info">
            <span>Do you need account?</span>
            <router-link to="/registration"> Enter Here</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

import { useStore } from "@/store";
import { AuthActionE } from "@/store/modules/auth/actions";

export default defineComponent({
  name: "AdminLogin",
  setup() {
    const login = ref("");
    const password = ref("");
    const submitStatus = ref("");

    const router = useRouter();
    const store = useStore();

    const rules = {
      login: { required, email },
      password: { required },
    };

    const v = useVuelidate(rules, { login, password });

    const onSubmit = async (): Promise<void> => {
      try {
        v.value.$touch();
        if (v.value.$invalid) {
          return;
        }

        const payload = {
          login: login.value,
          password: password.value,
        };

        submitStatus.value = "PENDING";
        await store.dispatch(AuthActionE.login, payload);
        submitStatus.value = "OK";
        router.push("/admin/periods");
      } catch (error) {
        submitStatus.value = "ERROR";
        console.error(error);
      }
    };

    return {
      login,
      password,
      submitStatus,
      onSubmit,
      v,
    };
  },
});
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
input {
  &.error {
    border-color: #fc5c65;
    animation: shake 0.3s;
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
