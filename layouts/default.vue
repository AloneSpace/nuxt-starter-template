<template>
  <div>
    <vs-sidebar absolute v-model="active" open>
      <template #logo class="pb-16">
        <img src="/icon.png" />
      </template>
      <template v-for="item in sidebar_items">
        <vs-sidebar-item :id="item.id">
          <template #icon>
            <i :class="item.icon"></i>
          </template>
          {{ item.text }}
        </vs-sidebar-item>
      </template>

      <template #footer>
        <div class="w-full px-3 mb-5">
          <button
            class="block w-full max-w-xs mx-auto bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white rounded-lg px-3 py-3 font-semibold"
            :disabled="btnLoading"
            @click="logout"
          >
            <template v-if="!btnLoading">
              <i class="fas fa-sign-out-alt pr-1"></i> Logout
            </template>
            <i class="fas fa-circle-notch fa-spin" v-else></i>
          </button>
        </div>
      </template>
    </vs-sidebar>
    <div class="">
      <nuxt></nuxt>
    </div>
  </div>
</template>
<script>
import utils from "~/mixins/utils";

export default {
  mixins: [utils],
  data() {
    return {
      active: true,
      sidebar_items: [
        {
          id: "home",
          icon: "fas fa-home",
          text: "Home"
        },
        {
          id: "market",
          icon: "fas fa-comment-dollar",
          text: "Market Overview"
        },
        {
          id: "music",
          icon: "fas fa-music",
          text: "Music"
        },
        {
          id: "donate",
          icon: "fas fa-donate",
          text: "Donate"
        },
        {
          id: "drink",
          icon: "fas fa-cocktail",
          text: "Drink"
        },
        {
          id: "shopping",
          icon: "fas fa-shopping-cart",
          text: "Shopping"
        },
        {
          id: "chat",
          icon: "fas fa-comment",
          text: "Chat"
        }
      ],
      btnLoading: false
    };
  },
  methods: {
    async logout() {
      this.btnLoading = true;
      try {
        await this.timeOut(2000);

        //* Sign out from firebase and revoke token
        await this.$fire.auth.signOut();

        //* Clear cookie from client
        await this.$axios.$post("/api/v1/auth/logout");

        this.btnLoading = false;
        window.location.reload();
      } catch (e) {}
    }
  }
};
</script>
