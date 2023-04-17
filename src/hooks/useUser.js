import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useEffect } from "react";

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken
  });
  useEffect(() => {
    if(data?.me === null) {
      logUserOut();
      console.log("there is a token on ls but the token did not work on the backend.");
    };
  }, [data]);
  return {data};
};

export default useUser;