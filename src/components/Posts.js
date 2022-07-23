import { useQuery } from "react-query";
import axios from "axios";

const email = "Sincere@april.biz";

export const PostsById = () => {
  const userIdQuery = useQuery("user", () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then((res) => res.data[0])
  );
  const postsQuery = useQuery(
    "posts",
    () =>
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userIdQuery.data.id}`
        )
        .then((res) => res.data),
    {
      enabled: userIdQuery.data?.id !== undefined,
    }
  );
  if (postsQuery.data && userIdQuery.data)
    return (
      <div>
        User id: {userIdQuery.data.id}
        <br />
        <br />
        {postsQuery.isLoading ? (
          "loading"
        ) : (
          <div>Post count: {postsQuery.data.length}</div>
        )}
      </div>
    );
};
