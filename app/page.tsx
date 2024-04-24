"use client";
import styles from "./page.module.css";
import MovieTitleComponent from "../components/MovieTitleComponent";
import { Provider } from "react-redux";
import store from "../store/store";
export default function Home() {
  return (
    <Provider store={store}>
      <main>
        <h1>This home page!</h1>
        <MovieTitleComponent />
      </main>
    </Provider>
  );
}
