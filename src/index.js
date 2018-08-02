import React from 'react';
import ReactDom from 'react-dom';
import {Route, BrowserRouter as Router} from "react-router-dom"
import Login from "./component/login"

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const App = () => (
  // Router路由组件，Router是根并且只能有一个元素，所以加了div
  <Router>
    <div>
      {/* Route负责静态路由，exact严格匹配路径，path是路径 */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
)

ReactDom.render(<App />, document.getElementById("root"))