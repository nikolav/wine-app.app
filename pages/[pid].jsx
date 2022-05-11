import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <Link href="/">[index]</Link>
      <pre>Page: {JSON.stringify(router.query, null, 2)}</pre>
    </>
  );
};

export default Page;

//
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "home" } },
      { params: { pid: "guest" } },
      { params: { pid: "dashboard" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(...args) {
  return {
    props: {},
  };
}

// export async function getServerSideProps(...args) {
//   console.log(...args);

//   return {
//     props: {},
//   };
// }
