import React from "react";

function LoginForm() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="email" />
        <hr />
        <input type="password" name="password" id="password" />
        <hr />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
