export default {
  async asyncData({ $axios, redirect, route }) {
    //* Request to /api/v1/auth/profile for get data from JWT
    const profile = await $axios.$get("/api/v1/auth/profile");

    //! If server return not ok, meanwhile it seem doesn't has authorize
    if (!profile.ok) return redirect("/");
    if (route.path === "/") return redirect("/dashboard");
  }
};
