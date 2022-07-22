import { useQuery } from "react-query";
import "./App.css";
import axios from "axios";

const useData = () => {
  return useQuery(["Data"], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => res.data);
  });
};

const Count = () => {
  const { data } = useData();
  if (data) return <h3>You have {data.length} todos</h3>;
};

const Data = () => {
  const { isLoading, isError, data, isFetching } = useData();
  if (data) console.log(data);
  return isLoading ? (
    "Loading..."
  ) : isError ? (
    "Error"
  ) : (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <br />
      {isFetching ? "Fetching...." : null}
    </div>
  );
};

function App() {
  return (
    <div>
      <Count />
      <Data />
    </div>
  );
}

export default App;
