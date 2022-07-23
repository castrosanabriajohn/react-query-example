import { useQuery } from "react-query";
import axios from "axios";

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

export const Pokemon = () => {
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

export const Berries = () => {
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
