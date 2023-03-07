import { verifyCredentials, verifyRoles } from "../middlewares";
import { signup, signin } from "../controllers";

export default function routeAuthentication(app) {
  app.post("/auth/signup", verifyCredentials, verifyRoles, signup);

  app.post("/auth/signin", signin);
}
