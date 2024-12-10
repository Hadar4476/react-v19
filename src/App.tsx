import "./App.css";
import NewFormShowcase from "./components/form/NewFormShowcase";
import { SampleProvider } from "./context/SampleContext";

const App = () => {
  return (
    <SampleProvider>
      <NewFormShowcase />
    </SampleProvider>
  );
};

export default App;
