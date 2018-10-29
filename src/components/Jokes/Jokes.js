import React, { Component } from 'react';
import Header from "../Header/Header";
import axios from 'axios';
import "./Jokes.css";
import JokeCard from '../JokeCard/JokeCard';


class Jokes extends Component {
    constructor() {
        super()

        this.state = {
            jokes: [],
            chuckJokes: [] 

        }

        this.handleName = this.handleName.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.handlePunchline = this.handlePunchline.bind(this)
        this.handleJoke = this.handleJoke.bind(this);
        this.deleteJoke = this.deleteJoke.bind(this);
        this.editJoke = this.editJoke.bind(this);
    }

    componentDidMount() {
        // console.log("state",this.state )
        axios.get("/jokes").then(res => {
            // console.log("response", res);
            this.setState({ jokes: res.data})
        }).catch(() => {console.log("Error! Error!")})

        axios.get("https://api.icndb.com/jokes/random").then(res => { 
            console.log("11111111", res)
            this.setState({ chuckJokes: res.data.value.joke})
        }).catch(() => console.log("You didn't get any chuck jokes!"))

    }

    handleName = (e) => {

        this.setState({
            nameInput: e.target.value
        })
    }

    handleContent = (e) => {

        this.setState({
            contentInput: e.target.value
        })
    }

    handlePunchline = (e) => {

        this.setState({
           punchlineInput: e.target.value
        })
    }

    handleJoke = () => {
        let { nameInput, contentInput, punchlineInput} = this.state;
        axios.post("/jokes", {
            name: nameInput,
            content: contentInput,
            punchline: punchlineInput
        }).then(res => {
            this.setState({ jokes: res.data})
        }).catch(() => console.log("You didn't add a joke!"))
    }

    deleteJoke(id) {
        axios.delete(`/jokes/${id}`).then(res => {
            this.setState({ jokes: res.data})
        }).catch(() => {console.log("Error! Not deleted")});
    }

    editJoke(jokes) {
        this.setState({jokes})
    }

    render() {


        let jokeList = this.state.jokes.map((joke, i) => {
            return (
                <JokeCard
                key={joke.id}
                joke={joke}
                deleteJoke={this.deleteJoke}
                editJoke={this.editJoke}
                />
            )
        })

        // let myJokes = String(this.state.chuckJokes);
        // myJokes = myJokes.replaceAll("&quot","\"");
        return (
            <div>
                <Header />
                <h2>{this.state.chuckJokes}</h2>
                <input type="text" value={this.state.nameInput} onChange={this.handleName} placeholder="Your name"/>
                <input type="text" value={this.state.contentInput} onChange={this.handleContent} placeholder="Joke Main" />
                <input type="text" value={this.state.punchlineInput} onChange={this.handlePunchline} placeholder="Punchline" /> 
                <button onClick={this.handleJoke}>Add a Joke</button>
                {jokeList}
            </div>
        )
    }
}

export default Jokes