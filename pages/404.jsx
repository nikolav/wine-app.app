import React from "react";
import Link from "next/link";

const NotFound404 = () => {
  return (
    <div className="flex flex-col space-y-8 justify-center items-center text-xl text-slate-500 w-screen h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <strong> 404 | Strana nije pronađena. | 🤔😬</strong>
      <Link href="/" replace>
        <a>
          <strong className="text-6xl"> 🏠 </strong>
        </a>
      </Link>
    </div>
  );
};

export default NotFound404;
