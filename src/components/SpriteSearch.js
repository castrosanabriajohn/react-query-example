import { useQuery } from "react-query";
import axios from "axios";
/*
app.js
const [target, setTarget] = useState("");
<input value={target} onChange={(e) => setTarget(e.target.value)} />
<SpriteSearch target={target} />
*/
export const SpriteSearch = ({ target }) => {
  const query = useQuery(
    target,
    () => {
      const controller = new AbortController();
      const promise = new Promise((res) => setTimeout(res, 3000))
        .then(() => {
          return axios.get(`https://pokeapi.co/api/v2/pokemon/${target}`, {
            signal: controller.signal,
          });
        })
        .then((res) => res.data.sprites.front_default);
      promise.cancel = () => {
        controller.abort();
      };
      return promise;
    },
    {
      retry: false,
      enabled: target !== "",
    }
  );
  return query.isLoading ? (
    "Loading"
  ) : query.isError ? (
    "Error"
  ) : (
    <div>
      {query.data ? <img src={query.data} alt="Pokemon" /> : "Not found"}
    </div>
  );
};
