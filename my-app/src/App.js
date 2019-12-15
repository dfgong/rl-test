import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Suspense} from 'react'

const OtherComponent = React.lazy(() => import('./OtherComponent'));

const ThemeContext = React.createContext('blue');

function MyComponent() {
  return (
    <div>
      OtherComponent哈哈哈
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent/>
      </Suspense>
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', value1: ['']};

    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = ThemeContext;

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleChange1(event) {
    this.setState({value1: this.state.value1.push(event.target.value)});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select multiple={true} value={['grapefruit', 'lime']} onChange={this.handleChange1}>
          <option value="grapefruit">葡萄柚</option>
          <option value="lime">酸橙</option>
          <option value="coconut">椰子</option>
          <option value="mango">芒果</option>
        </select>
        <label>
          名字{this.context}:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="提交"/>
      </form>
    );
  }
}

function Welcome(props) {
  return <h1>Hello Welcome,{props.name}</h1>
}

class Welcome2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onChangeShareName('gongdf2')
  }

  render() {
    return <h1>
      Hello Welcome2, <span onClick={this.handleClick}>{this.props.name}</span>
    </h1>;
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      name: 'gongdf1',
      shareName: 'gongdf',
    }
    this.changeShareName = this.changeShareName.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((state, props) => {
      return {
        date: new Date(),
        name: 'gongdf' + (state.name.substring(6) - 0 + 1)
      };
    });
  }

  changeShareName(val) {
    this.setState({
      shareName: val,
    })
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <Welcome2 onChangeShareName={this.changeShareName} name={this.state.shareName}></Welcome2>
        <Welcome name={this.state.shareName}></Welcome>
      </div>
    );
  }
}



function App() {
  return (
    <ThemeContext.Provider value={'dddddd'}>
      <div className="App">
        <MyComponent></MyComponent>
        <NameForm></NameForm>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Clock></Clock>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
