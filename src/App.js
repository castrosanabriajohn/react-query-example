import { useQuery } from "react-query";
import "./App.css";
import axios from "axios";

function Data() {
  const { isLoading, isError, data, error, status, isFetching } = useQuery(
    ["todos"],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      /*       if (true) {
        throw new Error();
      } */
      return axios
        .get("https://jsonplaceholder.typicode.com/users/1/todos")
        .then((res) => res.data);
    },
    {
      staleTime: 5000, // the query is going to be marked as fresh before returning to stale state to be refetched
    }
  );
  if (data) console.log(data);
  return isLoading ? (
    "Loading..."
  ) : isError ? (
    "Error"
  ) : (
    <div>
      {data.map((item) => (
        <div key={item.title}>{item.title}</div>
      ))}
      <br />
      {isFetching ? "Fetching...." : null}
    </div>
  );
}

function App() {
  return <Data />;
}

export default App;
