import React from "react";

function RegisterForm({...rest}) {
  return (
      <form {...rest}>
        <input placeholder="name" type="name" name="name" id="name" />
        <hr />
        <input placeholder="email" type="email" name="email" id="email" />
        <hr />
        <input placeholder="password" type="password" name="password" id="password" />
        <hr />
        <input placeholder="password2" type="password" name="password2" id="password2" />
        <hr />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded-md">login</button>
      </form>
  );
}

export default RegisterForm;
