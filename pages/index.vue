<template>
  <div
    class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5"
  >
    <div
      class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
      style="max-width:1000px"
    >
      <div class="md:flex w-full">
        <Logo></Logo>
        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900 mb-4">{{ title }}</h1>
            <p>{{ sub_title }}</p>
          </div>
          <div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-6">
                <label class="text-md font-semibold px-1">Email</label>
                <div class="flex mt-2">
                  <div
                    class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  >
                    <i class="far fa-envelope text-gray-400 text-lg"></i>
                  </div>
                  <input
                    v-model="form.email"
                    type="email"
                    class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith@example.com"
                  />
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-12">
                <label class="text-md font-semibold px-1">Password</label>
                <div class="flex mt-2">
                  <div
                    class="w-10 z-10 pl-1 text-center flex items-center justify-center"
                  >
                    <i class="fas fa-lock text-gray-400 text-lg"></i>
                  </div>
                  <input
                    v-model="form.password"
                    type="password"
                    class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="******"
                  />
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <button
                  class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  @click="login"
                  :disabled="buttonLoading"
                >
                  <p v-if="!buttonLoading">{{ btnText }}</p>
                  <i class="fas fa-circle-notch fa-spin" v-else></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Login/Logo";
import authentication from "~/mixins/authentication";
import Sweetalert from "sweetalert2";
import utils from "~/mixins/utils";
export default {
  components: { Logo },
  mixins: [authentication, utils],
  layout: "login",
  data() {
    return {
      title: "Sign in",
      sub_title: "This is template for firebase purpose only.",
      buttonLoading: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    btnText() {
      return !this.buttonLoading ? "Sign in" : "";
    }
  },
  methods: {
    async signToken(response) {
      try {
        let token = await response.user.getIdToken(false);
        await this.$axios.$post("/api/v1/auth/sign_token", {
          token
        });
      } catch (e) {
        console.log(e);
      }
    },
    async login() {
      this.buttonLoading = true;
      let { email, password } = this.form;
      try {
        await this.timeOut(1000);

        //* Sign in to firebase and return data
        let response = await this.$fire.auth.signInWithEmailAndPassword(
          email,
          password
        );

        //* Signed token into cookie
        await this.signToken(response);

        await Sweetalert.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 2000
        });
        this.$router.push("/dashboard");
      } catch (e) {
        await Sweetalert.fire({ icon: "error", title: "อีเมลหรือรหัสผ่านผิด" });
      } finally {
        this.buttonLoading = false;
      }
    }
  }
};
</script>

<style></style>
