<template>
  <div class="reports">
    <el-card>
      <div slot="header">
        <span>Создание отчёта</span>
      </div>

      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="Неделя" prop="week">
          <el-select v-model="form.week" placeholder="Выберите неделю">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Профит, %" prop="profit">
          <el-input
            v-model="form.profit"
            placeholder="Введите профит"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="Текст" prop="text">
          <el-input
            type="textarea"
            v-model="form.text"
            show-word-limit
            maxlength="240"
            rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onCreate('form')"
            >Создать</el-button
          >
          <el-button @click="onCancel('form')">Отмена</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="report-list">
      <div class="empty-block" v-if="getReports.length === 0">
        <span class="empty-block__text">Нет данных</span>
      </div>
      <div
        class="report-list__item"
        v-for="report in getReports"
        v-bind:key="report._id"
      >
        <el-card>
          <div slot="header">
            <span>Неделя: {{ report.week }}</span>
          </div>
          <div>
            <span class="card-text">{{ report.text }}</span>
            <div class="bottom clearfix">
              <span class="profit-wrapper"
                >Профит: <span>{{ report.profit }}</span></span
              >
              <el-button
                type="text"
                class="button"
                @click="onRemove(report._id)"
                >Удалить</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminReports",
  data() {
    return {
      periodID: null,
      form: {
        week: "",
        profit: 0,
        text: "",
      },
      rules: {
        week: [
          {
            required: true,
            message: "Пожалуйста выберите неделю",
            trigger: "change",
          },
        ],
        profit: [
          {
            required: true,
            message: "Пожалуйста введите профит",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async mounted() {
    this.periodID = Array.isArray(this.$route.params.id)
      ? this.$route.params.id[0]
      : this.$route.params.id;

    try {
      await this.$store.dispatch("reports/getReports", this.periodID);
    } catch (error) {
      this.$message.error(error.message);
    }
  },
  computed: {
    getReports() {
      return this.$store.getters["reports/getReports"];
    },
  },
  methods: {
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
            periodID: this.periodID,
            week: this.form.week,
            text: this.form.text,
            profit: this.form.profit,
          };

          await this.$store.dispatch("reports/createReport", payload);
          this.$message({
            message: "Отчёт успешно создан",
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
    onRemove(reportID) {
      this.$confirm("Вы уверены, что хотите удалить отчёт?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Отмена",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$store.dispatch("reports/deleteReport", {
              periodID: this.periodID,
              reportID,
            });
            this.$message({
              message: "Отчёт успешно удалён",
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

<style lang="scss" scoped>
.report-list {
  margin-top: 20px;
}

.report-list__item {
  margin-bottom: 5px;
}

.report-list__item:last-child {
  margin-bottom: 0;
}

.empty-block {
  text-align: center;
  border-bottom: 1px solid #ebeef5;
}

.empty-block__text {
  line-height: 60px;
  width: 50%;
  color: #909399;
}

.card-text {
  font-size: 14px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.profit-wrapper {
  line-height: 1;
  font-size: 14px;
}
</style>
