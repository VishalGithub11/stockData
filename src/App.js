import logo from './logo.svg';
import './App.css';
import Instruments from "./Instruments";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Quotes from "./Quotes";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Instruments} />
          <Route path="/quotes" component={Quotes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
