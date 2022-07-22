import { useReducer } from "react";
import { useQuery } from "react-query";
import "./App.css";
import axios from "axios";

const initialState = { visible: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 1:
      return { visible: true };
    case 0:
      return { visible: false };
    default:
      return state;
  }
};

function Data({ dispatch }) {
  const { isLoading, isError, data, isFetching } = useQuery(
    ["todos"],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get("https://jsonplaceholder.typicode.com/users/1/todos")
        .then((res) => res.data);
    },
    {
      cacheTime: 5000, // sets a cache time, after which it will dispose the query if it's not triggered
    }
  );
  const hideData = () => dispatch({ type: 0 });
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
      <button onClick={() => hideData()}>Inactivate</button>
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const showData = () => dispatch({ type: 1 });

  return (
    <div>
      {state.visible ? (
        <div>
          <Data dispatch={dispatch} />
        </div>
      ) : (
        <div>
          <button onClick={() => showData()}>Activate</button>
        </div>
      )}
    </div>
  );
}

export default App;
