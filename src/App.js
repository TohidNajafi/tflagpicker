import './App.css';
import TFlagPicker from "./components/TFlagPicker";

function App() {
  return (
    <div className="App">
        <div className={"test-input"}>
            <TFlagPicker
                defaultCountry={"TR"}
                searchPlaceholder={"Search ..."}
                modalDirection={"ltr"}
                onChange={(country)=>console.log(country)}
            />
        </div>

    </div>
  );
}

export default App;
