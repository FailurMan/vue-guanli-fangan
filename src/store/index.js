import { createStore } from "vuex";
import user from "./module/user.js";
import app from "./module/app.js";
import theme from "./module/theme.js";
import getters from "./getters";
export default createStore({
  modules: {
    user,
    app,
    theme,
  },
  getters,
});
