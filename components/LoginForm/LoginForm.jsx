import { useState, useEffect } from "react";
import Effect from "../../components/Effect";
import Required from "../Required/Required";
import useAuthLogin from "../../src/hooks/use-auth-login";
import { usePages, useAuth } from "../../app/store";
import { PAGE_REGISTER, PAGE_HELP } from "../../app/store/page";
import useSyncInput from "../../src/hooks/use-sync-input";
import { prevent, isEmail } from "../../src/util";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const [message, setMessage] = useState("Prijava na sistem.");
  const [isActive, setIsActive] = useState(false);

  const { user } = useAuth();
  const [login, loginStatus] = useAuthLogin();

  const [sync, input] = useSyncInput({ email: "", password: "" });
  const { setPage } = usePages();
  //
  const handleLogin = async () => {
    if (!input.email || !input.password) {
      setIsActive(true);
      return setMessage("Popunite oba polja.");
    }

    if (!isEmail(input.email)) {
      setIsActive(true);
      return setMessage("Unesite ispravnu email adresu.");
    }

    try {
      await login(input.email, input.password);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (!loginStatus.error && !loginStatus.processing && user)
      return setPage(PAGE_HELP);

    if (!loginStatus.processing && loginStatus.error) {
      setIsActive(true);
      setMessage("Greška, ovaj korisnik nije registrovan.");
    }
  }, [user, loginStatus.error, loginStatus.processing]);

  return (
    <form
      onSubmit={prevent(handleLogin)}
      className="rounded-2xl border-4 **p-8 w-8/12 mx-auto mt-2"
      noValidate
    >
      <div className="bg-gray-50 text-slate-400 login-form-header px-8 py-2 w-full text-center border-b-4">
        <Effect
          effect="headShake"
          duration={888}
          isActive={isActive}
          onEnd={setIsActive.bind(null, false)}
        >
          {message}
        </Effect>
      </div>
      <div className="login-form-body p-8">
        <div className="mb-8">
          <label htmlFor="email">
            Email <Required input={input.email} />
          </label>
          <input
            value={input.email}
            onChange={sync}
            type="email"
            className={`${css.inputEmail} w-full rounded pl-12`}
            name="email"
            id="email"
            autoComplete="off"
            placeholder=""
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password">
            Lozinka <Required input={input.password} />
          </label>
          <input
            value={input.password}
            onChange={sync}
            type="password"
            className={`${css.inputPassword} w-full rounded pl-12`}
            name="password"
            id="password"
            autoComplete="off"
            placeholder=""
          />
        </div>
        <div id="auth-buttons" className="flex flex-col space-y-6">
          <button
            id="auth-login"
            type="submit"
            className="button-primary min-w-[50%] mx-auto"
          >
            🥂 PRIJAVA
          </button>
          <a
            onClick={prevent(setPage.bind(null, PAGE_REGISTER))}
            href="#!"
            className="link text-center"
          >
            Nemam nalog, registruj me.
          </a>
        </div>
      </div>
    </form>
  );
}
