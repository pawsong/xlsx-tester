import React, { Component } from 'react';
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import JSONTree from 'react-json-tree'
import './App.css';

class App extends Component {
  state = {
    workbook: null,
  }

  handleDrop = (files) => {
    const file = files[0];

    const reader = new FileReader();
    reader.onload = event => {
      const data = event.target['result'];

      const workbook = XLSX.read(data, {
        type: 'binary',
        cellStyles: true,
        cellNF: true,
      });

      this.setState({ workbook });
    };

    reader.readAsBinaryString(file);
  }

  render() {
    const { workbook } = this.state;

    return (
      <div className="App">
        <Dropzone onDrop={this.handleDrop}>
          Drop xlsx file here
        </Dropzone>
        <div className="App-json">
          <JSONTree data={workbook} />
        </div>
      </div>
    );
  }
}

export default App;
