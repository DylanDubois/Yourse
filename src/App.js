import React, { Component } from "react";
import "./App.scss";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import CourseView from "./pages/CourseView";
import fire from "./config/Fire";

class App extends Component {
  state = {
    selectedCourse: null,
    user: null
  };

  componentDidMount() {
    this.authListener();
  }

  courseSelectedHandler = course => {
    this.setState({ selectedCourse: course });
  };

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) this.setState({ user });
      else this.setState({ user: null });
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="h-100">
          <NavBar />
          <Route
            path="/"
            exact
            render={() => <Home courseSelected={this.courseSelectedHandler} />}
          />
          {this.state.selectedCourse && (
            <Route
              path="/course"
              render={() => <CourseView course={this.state.selectedCourse} />}
            />
          )}
          {window.location.pathname.includes("course") &&
            !this.state.selectedCourse && <Redirect to="/" />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
