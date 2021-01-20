import React, { Component } from 'react'

const getStudents = () => (
  fetch('http://localhost:5000/students')
    .then(res => res.json())
    .then(data => data)
)
export default class App extends Component {

  state = {
    data: [],
    name: "",
    age: ""
  }

  componentDidMount() {
    getStudents().then(data => {
      this.setState({data})
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.name)

    fetch('http://localhost:5000/students', {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        name: this.state.name,
        age: this.state.age
      })
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          getStudents().then(data => {
            this.setState({data})
          })
        }
      })

  }

  handleInput = (inputChoice, event) => {
    this.setState({
      [inputChoice]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>List of people</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.name}
            onChange={event => this.handleInput('name', event)}
            placeholder="Name..."
          />
          <input
            value={this.state.age}
            onChange={event => this.handleInput('age', event)}
            placeholder="Age..."
            type="number"
          />
          <button>Add</button>
        </form>
        {
          this.state.data.length > 0 &&
          this.state.data.map((element) =>
            <p key={element.id}>Name: {element.user}, Age: {element.age}</p>
          )
        }
      </div>
    )
  }
}

