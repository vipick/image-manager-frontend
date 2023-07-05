<template>
  <div>
    <v-card>
      <v-form ref="form">
        <v-card-text>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :rules="[emailRules.required]"
                  label="아이디"
                  required
                  v-model="email"
                ></v-text-field>

                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  :rules="[passwordRules.required, passwordRules.counter]"
                  label="패스워드"
                  required
                  value="password"
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-btn outlined @click="onClickSignIn">로그인</v-btn>
            </v-row>
            <br />
          </v-container>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SignInForm",
  data() {
    return {
      show: false,
      email: "",
      password: "",
      passwordRules: {
        required: (value) => !!value || "패스워드 입력이 필요합니다.",
        counter: (value) =>
          value.length >= 4 || "패스워드는 4글자 이상이어야 합니다.",
      },
      emailRules: {
        required: (value) => !!value || "아이디 입력이 필요합니다.",
        counter: (value) => value.length <= 100 || "Max 100 characters",
      },
    };
  },
  methods: {
    onClickSignIn() {
      if (this.$refs.form.validate() == false) {
        return;
      }

      this.$emit("signin", this);
    },
  },
};
</script>
