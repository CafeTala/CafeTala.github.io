import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import OtpLogin from './components/OtpLogin';
// ...existing code...

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth" component={AuthPage} />
        <Route path="/otp-login" component={OtpLogin} />
        // ...existing routes...
      </Switch>
    </Router>
  );
}

export default App;
