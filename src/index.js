import ReactDOM from "react-dom";

import "./index.css";
import AppRouter from "./Routes";

//redux
import store from './redux/configStore';
import { Provider } from "react-redux";

// import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>, 
    document.getElementById("root")
);

// Provider는 리액트