import { Authenticator } from "remix-auth"
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import   User  from "~/models/user.server";
export let authenticator = new Authenticator<User>(sessionStorage);



authenticator.use(
    new FormStrategy(async ({ form }) => {
        let email    = form.get("email");
        let password = form.get("password");
        let user     = await login(email, password);
        return user;
    }),
    "user-pass"
)