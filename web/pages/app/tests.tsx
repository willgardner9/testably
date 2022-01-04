import type {NextPage} from "next";
import {useUser} from "../../context/auth";

const Tests: NextPage = () => {
  const {user} = useUser();

  return (
    <>
      <h1 className="text-gray-500">tests.tsx</h1>
      <h1 className="text-gray-500">{JSON.stringify(user, null, 2)}</h1>
    </>
  );
};

export default Tests;
