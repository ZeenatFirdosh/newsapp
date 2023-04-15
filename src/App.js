// import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 15;

  state = {
    progress:0,
    apikey : 'b9f198476d3f4f85b691409e426e1620'
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
      <Router>
          {/* console.log({this.state.apikey});
          console.log({this.state.progress}); */}

          <NavBar />
          <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress} 
        />
         
          <Routes>
            
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.state.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
       
      </Router>
      </div>
    );
  }
}

