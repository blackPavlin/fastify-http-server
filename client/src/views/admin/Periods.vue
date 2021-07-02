<template>
  <div class="periods">
    <el-card>
      <div slot="header">
        <span>Создание периода</span>
      </div>

      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="Месяц" prop="month">
          <el-date-picker
            type="month"
            placeholder="Выберите месяц"
            v-model="form.month"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onCreate('form')"
            >Создать</el-button
          >
          <el-button @click="onCancel('form')">Отмена</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="getPeriods" style="width: 100%">
      <el-table-column label="Дата">
        <template slot-scope="scope">
          {{ getDate(scope.row.date) }}
        </template>
      </el-table-column>

      <el-table-column label="Действия" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="onEdit(scope.row._id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="onRemove(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminPeriods",
  data() {
    return {
      form: {
        month: "",
      },
      rules: {
        month: [
          {
            type: "date",
            required: true,
            message: "Пожалуйста введите месяц",
            trigger: "change",
          },
        ],
      },
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("periods/getPeriods");
    } catch (error) {
      this.$message.error(error.message);
    }
  },
  computed: {
    getPeriods() {
      return this.$store.getters["periods/getPeriods"];
    },
  },
  methods: {
    getDate(date) {
      const d = new Date(date);
      const monthName = d.toLocaleDateString("ru-RU", { month: "short" });
      const nameCapitalized =
        monthName.charAt(0).toUpperCase() + monthName.slice(1);

      return `${nameCapitalized} ${d.getFullYear()}`;
    },
    onCreate(formName) {
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
            date: this.form.month,
          };

          await this.$store.dispatch("periods/createPeriod", payload);
          this.$message({
            message: "Период успешно создан",
            type: "success",
          });

          this.$refs[formName].resetFields();
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    onCancel(formName) {
      this.$refs[formName].resetFields();
    },
    onEdit(periodID) {
      this.$router.push(`/admin/reports/${periodID}`);
    },
    onRemove(periodID) {
      this.$confirm("Вы уверены, что хотите удалить период?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$store.dispatch("periods/deletePeriod", periodID);
            this.$message({
              message: "Период успешно удалён",
              type: "success",
            });
          } catch (error) {
            this.$message.error(error.message);
          }
        })
        .catch(() => {});
    },
  },
};
</script>
