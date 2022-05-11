import { useState, useEffect } from "react";
import client from "../../src/feathers";
import { useAuth } from "../../app/store";
import { usePages } from "../../app/store";
import useSyncInput from "../../src/hooks/use-sync-input";
import useAuthRegister from "../../src/hooks/use-auth-register";
import Required from "../../components/Required/Required";
import Effect from "../../components/Effect";
import { PAGE_LOGIN, PAGE_HELP } from "../../app/store/page";
import { prevent, isEmail } from "../../src/util";
import css from "./RegisterForm.module.css";
//
export default function RegisterForm() {
  const [message, setMessage] = useState("Registracija u sistem.");
  const [isActive, setIsActive] = useState(false);
  const [sync, input] = useSyncInput({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { setPage } = usePages();

  const { user } = useAuth();
  const [register, registerStatus] = useAuthRegister();
  const handleRegister = async () => {
    if (!input.name || !input.email || !input.password || !input.password2) {
      setIsActive(true);
      return setMessage("Popunite sva polja.");
    }

    if (!isEmail(input.email)) {
      setIsActive(true);
      return setMessage("Unesite ispravnu email adresu.");
    }

    if (input.password.length < 2) {
      setIsActive(true)
      return setMessage("Lozinka treba da ima bar dva znaka.");
    }

    if (input.password !== input.password2) {
      setIsActive(true);
      return setMessage("Potvrdite lozinku ponovo.");
    }

    try {
      await register(input.email, input.password);
    } catch (error) {
      setIsActive(true);
      return setMessage(`[@RegisterForm]: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!registerStatus.error && !registerStatus.processing && user) {
      // set service.main [uid]: input.name
      // load help slide
      client.service("main")
        .create({
          name  : user.uid,
          value : input.name,
        });
      user.displayName = input.name;
      return setPage(PAGE_HELP);
    }

    if (!registerStatus.processing && registerStatus.error) {
      setIsActive(true);
      setMessage("Ovaj korisnik je već registrovan.");
    }
  }, [user, registerStatus.processing, registerStatus.error]);
  return (
    <form
      onSubmit={prevent(handleRegister)}
      className="rounded-2xl border-4 w-8/12 mx-auto mt-2"
      noValidate
    >
      <div className="login-form-header bg-gray-50 text-slate-400 px-8 py-2 w-full text-center border-b-4">
        <Effect
          effect="headShake"
          duration={1234}
          isActive={isActive}
          onEnd={setIsActive.bind(null, false)}
        >
          {message}
        </Effect>
      </div>
      <div className="login-form-body p-8 pt-4">
        <div className="mb-4">
          <label htmlFor="name">
            Korisnik <Required input={input.name} />
          </label>
          <input
            value={input.name}
            onChange={sync}
            type="email"
            className={`${css.inputUser} w-full rounded pl-12`}
            name="name"
            id="name"
            autoComplete="off"
            placeholder=""
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label htmlFor="password2">
            Potvrdi lozinku <Required input={input.password2} />
          </label>
          <input
            value={input.password2}
            onChange={sync}
            type="password"
            className={`${css.inputPassword2} w-full rounded pl-12`}
            name="password2"
            id="password2"
            autoComplete="off"
            placeholder=""
          />
        </div>
        <div id="auth-buttons" className="flex flex-col space-y-4">
          <button
            // onClick={prevent(setIsActive.bind(null, true))}
            id="auth-login"
            type="submit"
            className="button-primary min-w-[50%] mx-auto px-6"
          >
            🍷 REGISTRACIJA
          </button>
          <a
            onClick={prevent(setPage.bind(null, PAGE_LOGIN))}
            href="#"
            className="link text-center"
          >
            Imam nalog, prijavi me.
          </a>
        </div>
      </div>
    </form>
  );
}
