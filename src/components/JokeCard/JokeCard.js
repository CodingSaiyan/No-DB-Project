import React, {Component} from 'react'
import axios from 'axios'

class JokeCard extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            showEdit: false
        }
    }

    componentDidMount() {
        this.setState({name: this.props.joke.name,
                       content: this.props.joke.content,
                       punchline: this.props.joke.punchline

        })
    }

    handleUpdateName = (e) => {
        this.setState({name: e.target.value})
    }

    handleUpdateContent = (e) => {
        this.setState({content: e.target.value})
    }

    handleUpdatePunchline= (e) => {
        this.setState({punchline: e.target.value})
    }

    handleEdit = () => {
        axios.put(`/jokes/${this.props.joke.id}`, {
            name: this.state.name,
            content: this.state.content,
            punchline: this.state.punchline
        
        }).then(results => {
            this.props.editJoke(results.data)
            this.showEdit()
        })
    }

    showEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    render() {
        return (
            <div>
            
                {
                    this.state.showEdit ?
                   (
                       <div>
                            <input value={this.state.name} type='text' onChange={this.handleUpdateName}/>
                            <input value={this.state.content} type='text' onChange={this.handleUpdateContent}/>
                            <input value={this.state.punchline} type='text' onChange={this.handleUpdatePunchline}/>
                            <br/>
                            <br/>
                            <button onClick={this.handleEdit}>Update</button>
                            <button onClick={this.showEdit}>Cancel</button>
                       </div>
                   ) :
                    <div>
                    <h3>{this.props.joke.name}</h3>
                    <p>{this.props.joke.content}</p>
                    <p><em>{this.props.joke.punchline}</em></p>
                    <button onClick={this.showEdit}>Edit</button>
                    <button onClick={() => this.props.deleteJoke(this.props.joke.id)}>Delete</button>
                    </div>
                }

            </div>
        )
    }
}

export default JokeCard