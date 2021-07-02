<template>
  <div class="login">
    <el-card>
      <div slot="header">
        <span>Вход</span>
      </div>

      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="Логин" prop="login">
          <el-input v-model="form.login" placeholder="Логин"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input
            v-model="form.password"
            placeholder="Пароль"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin('form')">Войти</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      form: {
        login: "",
        password: "",
      },
      rules: {
        login: [{ required: true, message: "Введите логин", trigger: "blur" }],
        password: [
          { required: true, message: "Введите пароль", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async onLogin(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          this.$message({
            message: "Пожалуйста заполните обязательные поля",
            type: "warning",
          });

          return;
        }

        try {
          const payload = {
            login: this.form.login,
            password: this.form.password,
          };

          await this.$store.dispatch("auth/login", payload);

          this.$router.push("/admin");
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
  },
};
</script>
