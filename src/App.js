import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  pageSize=20;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* Default route */}
            <Route
              path="/"
              element={<News key="general" pageSize={this.pageSize} country="in" category="general" />}
            />
            {/* Science category route */}
            <Route
              path="/science"
              element={<News key="science" pageSize={this.pageSize} country="in" category="science" />}
            />
            {/* Other category routes can be added here */}
            <Route
              path="/business"
              element={<News key="business" pageSize={this.pageSize} country="in" category="business" />}
            />
            <Route
              path="/technology"
              element={<News key="technology" pageSize={this.pageSize} country="in" category="technology" />}
            />
            <Route
              path="/sports"
              element={<News key="sports" pageSize={this.pageSize} country="in" category="sports" />}
            />
            <Route
              path="/health"
              element={<News key="health" pageSize={this.pageSize} country="in" category="health" />}
            />
            <Route
              path="/entertainment"
              element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
