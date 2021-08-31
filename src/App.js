import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery";

export class App extends Component {
  state = {
    query: "",
  };

  getQueryFromInput = (data) => {
    this.setState({ query: data });
  };

  render() {
    const { getQueryFromInput } = this;
    const { query } = this.state;

    return (
      <>
        <Searchbar giveDataToApp={getQueryFromInput} />
        <ImageGallery query={query} />
      </>
    );
  }
}

export default App;
