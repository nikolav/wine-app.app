import { useAuth } from "../../app/store";
import cli from "../../src/feathers";
import useIsMounted from "./use-is-mounted";
import { noop, has } from "../../src/util";
////
////
export default function useChatNotify() {
  const isMounted = useIsMounted();
  const { user } = useAuth();
  //
  return isMounted ? notifyChat_ : noop;
  //
  function notifyChat_(message = null) {
    return new Promise((resolve, reject) => {
      if (null == message)
        return reject({ error: "@useChatNotify(); No message provided." });
      if (0 === String(has(message, "text") ? message.text : "").trim().length)
        return reject({ error: "@useChatNotify(); No `msg.text` provided." });
      //
      cli
        .service("chat")
        .create({
          author:
            null != message?.author
              ? message.author
              : user
              ? user.displayName || "👤"
              : "👤",
          text: String(message.text),
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
