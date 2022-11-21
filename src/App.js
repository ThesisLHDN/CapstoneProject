import "./App.css";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <Button variant="contained" size="small">
        Small
      </Button>
      <Button variant="contained" size="medium">
        Medium
      </Button>
      <Button variant="contained" size="large">
        Large
      </Button>
      <span class="text-3xl font-bold underline">Hello world!</span>
    </div>
  );
}

export default App;
