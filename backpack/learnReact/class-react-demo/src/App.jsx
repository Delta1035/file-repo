
import React from "react"
class App extends React.Component {

  constructor() {
    super()
    this.state = {
      text: "今天的天气很炎热"
    }
    this.changeWight = this.changeWight.bind(this)
  }

  changeWight(){
    console.log('changeWight');
  }

  changeColor = ()=>{
    console.log(2);
  }

  changeText = () => {
    console.log(1);
    this.setState({
      text: "今天的天气不太热"
    })
  }

  render() {

    return (
      <p style={{ color: 'red' }} onClick={() => this.changeText()}>{this.state.text}</p>
    )
  }
}

export default App
