import { useState, useEffect } from "react";
import Effect from "../../components/Effect";
import Required from "../Required/Required";
import useAuthLogin from "../../src/hooks/use-auth-login";
import { usePages, useAuth } from "../../app/store";
import { PAGE_REGISTER, PAGE_HELP } from "../../app/store/page";
import useSyncInput from "../../src/hooks/use-sync-input";
import { prevent, isEmail } from "../../src/util";
import css from "./LoginForm.module.css";
import { useFlags, IS_PROCESSING_AUTH } from "../../src/hooks/use-flags-global";
import { signIn } from "next-auth/react";
import {
  FcGoogle,
  FaFacebook,
  AiFillTwitterCircle,
  FaGithubAlt,
} from "../icons";
import Tooltip from "../Tooltip/Tooltip";
import useStateSwitch from "../../src/hooks/use-state-switch";
///////
export default function LoginForm() {
  const [message, setMessage] = useState("Prijava na sistem.");
  const [isActive, setIsActive] = useState(false);

  const { user } = useAuth();
  const [login, loginStatus] = useAuthLogin();

  const [sync, input] = useSyncInput({ email: "", password: "" });
  const { setPage } = usePages();
  //
  const { toggle: toggleFlags } = useFlags();
  const isProcessingAuthOn = () => toggleFlags.on(IS_PROCESSING_AUTH);
  const isProcessingAuthOff = () => toggleFlags.off(IS_PROCESSING_AUTH);
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
    //
    // trigger spinner
    isProcessingAuthOn();
    try {
      await login(input.email, input.password);
    } catch (error) {
      setMessage(error.message);
    } finally {
      isProcessingAuthOff();
    }
  };

  useEffect(() => {
    if (!loginStatus.error && !loginStatus.processing && user) {
      isProcessingAuthOff();
      return setPage(PAGE_HELP);
    }

    if (!loginStatus.processing && loginStatus.error) {
      isProcessingAuthOff();
      setIsActive(true);
      setMessage("Greška, ovaj korisnik nije registrovan.");
    }
  }, [user, loginStatus.error, loginStatus.processing]);
  //
  // soclial login tooltips
  const { isOn: isActiveTooltipGoogle, toggle: toggleIsActiveTooltipGoogle } =
    useStateSwitch();
  const [refPopperGoogle, setRefPopperGoogle] = useState();

  const {
    isOn: isActiveTooltipFacebook,
    toggle: toggleIsActiveTooltipFacebook,
  } = useStateSwitch();
  const [refPopperFacebook, setRefPopperFacebook] = useState();

  const { isOn: isActiveTooltipTwitter, toggle: toggleIsActiveTooltipTwitter } =
    useStateSwitch();
  const [refPopperTwitter, setRefPopperTwitter] = useState();

  const { isOn: isActiveTooltipGithub, toggle: toggleIsActiveTooltipGithub } =
    useStateSwitch();
  const [refPopperGithub, setRefPopperGithub] = useState();

  //

  return (
    <form
      onSubmit={prevent(handleLogin)}
      className="rounded-2xl border-4 **p-8 w-full sm:w-10/12 md:w-8/12 lg:w-10/12 xl:w-8/12 mx-auto mt-2"
      noValidate
    >
      <div className="w-full px-8 py-2 text-center border-b-4 bg-gray-50 text-slate-400 login-form-header">
        <Effect
          effect="headShake"
          duration={888}
          isActive={isActive}
          onEnd={setIsActive.bind(null, false)}
        >
          {message}
        </Effect>
      </div>
      <div className="p-8 login-form-body">
        <div className="mb-8">
          <label htmlFor="email">
            <Required input={input.email} /> Email
          </label>
          <input
            value={input.email}
            onChange={sync}
            type="email"
            className={`input-styled ${css.inputEmail} !pl-12`}
            name="email"
            id="email"
            autoComplete="off"
            placeholder=""
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password">
            <Required input={input.password} /> Lozinka
          </label>
          <input
            value={input.password}
            onChange={sync}
            type="password"
            className={`input-styled ${css.inputPassword} !pl-12`}
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
          <div className="text-center flex flex-row items-center justify-center space-x-8">
            <strong ref={setRefPopperGoogle} onClick={() => signIn("google")}>
              <FcGoogle
                onMouseOver={toggleIsActiveTooltipGoogle.on}
                onMouseLeave={toggleIsActiveTooltipGoogle.off}
                className={`opacity-80 hover:opacity-100 hover:scale-110 transition-transform duration-75 ${css.iconLoginSocial} `}
                title="google"
              />
              <Tooltip
                refElement={refPopperGoogle}
                isActive={isActiveTooltipGoogle}
                placement="top"
                offset={[0, 18]}
              >
                👤 poveži <em className="italic font-bold">google</em> nalog
              </Tooltip>
            </strong>{" "}
            <strong
              ref={setRefPopperFacebook}
              onClick={() => signIn("facebook")}
            >
              <FaFacebook
                onMouseOver={toggleIsActiveTooltipFacebook.on}
                onMouseLeave={toggleIsActiveTooltipFacebook.off}
                className={`opacity-80 hover:opacity-100 hover:scale-110 transition-transform duration-75 ${css.iconLoginSocial} text-[#4267b2]`}
                title="facebook"
              />
              <Tooltip
                refElement={refPopperFacebook}
                isActive={isActiveTooltipFacebook}
                placement="top"
                offset={[0, 18]}
              >
                👤 poveži <em className="italic font-bold">facebook</em> nalog
              </Tooltip>
            </strong>
            <strong ref={setRefPopperTwitter} onClick={() => signIn("twitter")}>
              <AiFillTwitterCircle
                onMouseOver={toggleIsActiveTooltipTwitter.on}
                onMouseLeave={toggleIsActiveTooltipTwitter.off}
                className={`opacity-80 hover:opacity-100 hover:scale-110 transition-transform duration-75 ${css.iconLoginSocial} text-[#1da1f2]`}
                title="twitter"
              />
              <Tooltip
                refElement={refPopperTwitter}
                isActive={isActiveTooltipTwitter}
                placement="top"
                offset={[0, 18]}
              >
                👤 poveži <em className="italic font-bold">twitter</em> nalog
              </Tooltip>
            </strong>
            <strong ref={setRefPopperGithub} onClick={() => signIn("github")}>
              <FaGithubAlt
                onMouseOver={toggleIsActiveTooltipGithub.on}
                onMouseLeave={toggleIsActiveTooltipGithub.off}
                className={`opacity-80 hover:opacity-100 hover:scale-110 transition-transform duration-75 ${css.iconLoginSocial} text-[#171515]`}
                title="github"
              />
              <Tooltip
                refElement={refPopperGithub}
                isActive={isActiveTooltipGithub}
                placement="top"
                offset={[0, 18]}
              >
                👤 poveži <em className="italic font-bold">github</em> nalog
              </Tooltip>
            </strong>
          </div>
          <a
            onClick={prevent(setPage.bind(null, PAGE_REGISTER))}
            href="#!"
            className="text-center link"
          >
            Nemam nalog, registruj me.
          </a>
        </div>
      </div>
    </form>
  );
}
