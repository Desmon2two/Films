import Greeting from "./components/Greeting";
import Button from "./components/ButtonCount";
import SearchBar from "./components/Search";

export default function App() {
  return (
    <section className="section">
      <h1>Hello World</h1>
      <Greeting name="Tito"></Greeting>
      <Button></Button>
      <SearchBar></SearchBar>
    </section>
  );
}
