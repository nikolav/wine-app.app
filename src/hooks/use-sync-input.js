import { useState } from "react";
export default function useSyncInput(initialValue = {}) {
  const [input, setInput] = useState(initialValue);

  return [sync_, input, setInput];
  // return { sync: sync_, input, setInput };

  function sync_(evt) {
    setInput((_) => ({ ..._, [evt.target.name]: evt.target.value }));
  }
}
