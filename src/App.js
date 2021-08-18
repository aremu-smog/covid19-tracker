import Layout from "./components/layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Country, Homepage } from "./pages";

import ctl from "@netlify/classnames-template-literals";
function App() {
  const appStyle = ctl(`flex items-center justify-center py-12 px-4`);
  return (
    <div className={appStyle}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/country/:slug/:name" component={Country} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
