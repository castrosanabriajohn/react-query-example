import { useQuery } from "react-query";
import axios from "axios";
import user from "./user";
const email = "Sincere@april.biz";

export const PostsById = () => {
  const userIdQuery = useQuery(
    "user",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((res) => res.data[0]);
    },
    {
      initialData: user,
    }
  );

  return userIdQuery.isLoading ? (
    "Loading"
  ) : (
    <div>
      <pre>{JSON.stringify(userIdQuery.data, null, 2)}</pre>
      {userIdQuery.isFetching ? "Fetching" : null}
    </div>
  );
};
