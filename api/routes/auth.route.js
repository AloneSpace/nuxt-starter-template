const controller = require("../controllers/auth.controller");

module.exports = ({ express }) => {
  const route = express.Router();

  route.get("/profile", controller.profile);
  route.post("/sign_token", controller.signToken);
  route.post("/logout", controller.logout);

  return route;
};
