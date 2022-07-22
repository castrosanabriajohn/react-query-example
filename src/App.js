import { useQuery } from "react-query";
import "./App.css";
import axios from "axios";

function Data({ queryKey }) {
  const { isLoading, isError, data, isFetching } = useQuery(
    [`${queryKey}`],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get("https://jsonplaceholder.typicode.com/users/1/todos")
        .then((res) => res.data);
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
  return (
    <div>
      <Data queryKey="data" />
      <Data queryKey="data" />
    </div>
  );
}

export default App;
