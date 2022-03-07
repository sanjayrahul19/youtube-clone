import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer/User";

const App = () => {
  const rootReducers = combineReducers({
    userData: reducer,
  });
  const store = createStore(rootReducers);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
