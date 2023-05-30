import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    if (!response.ok) {
      throw new Error("error on calling events");
    }
    return response.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      loadedData?.events.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData(loadedData);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  useEffect(() => {
    if (data && data.events.length > 0) {
      setLast(data.events[0]);
    }
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        last,
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
