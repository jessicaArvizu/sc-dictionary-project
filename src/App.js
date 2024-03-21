import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Dictionary</h1>
      </header>

      <main>
        <div className="main-container">
          <Search />
        </div>
      </main>

      <footer>
        This project was coded by
        <a href="https://www.linkedin.com/in/jessica-arvizu/" target="_blank" rel="noopener noreferrer">
          {" "}
          Jessica Arvizu
        </a>
        , is open-sourced on
        <a href="https://github.com/jessicaArvizu/sc-dictionary-project" target="_blank" rel="noopener noreferrer">
          {" "}
          GitHub
        </a>
        , and hosted on
        <a href="https://superb-phoenix-f438fd.netlify.app/" target="_blank" rel="noopener noreferrer">
          {" "}
          Netlify
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
