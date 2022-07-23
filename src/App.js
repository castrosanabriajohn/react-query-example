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

const usePokemon = () => {
  return useQuery(["Pokemon"], () => {
    const res = axios.get("https://pokeapi.co/api/v2/pokemon/");
    return res.data.results;
  });
};

const useBerries = () => {
  return useQuery(["Berries"], () => {
    const res = axios
      .get("https://pokeapi.co/api/v2/berry")
      .then((res) => res.data.results);
    return res;
  });
};

const Pokemon = () => {
  const { data, isFetching } = usePokemon();
  if (data)
    return (
      <div>
        <ol>
          {data.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ol>
        <br />
        {isFetching ? "Fetching" : null}
      </div>
    );
};

const Berries = () => {
  const { data, isFetching } = useBerries();
  if (data)
    return (
      <div>
        <ol>
          {data.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ol>
        <br />
        {isFetching ? "Fetching" : null}
      </div>
    );
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
      <Pokemon />
      <Berries />
    </div>
  );
}

export default App;
