let jokes = [
    {
        id: 0,
        name: "Nick Labrum",
        content: "Why Do Hamburgers Fly South For The Winter?",
        punchline: "So they don't freeze their buns!"
    },
    {
        id: 1,
        name: "John Doe",
        content: "Why Is A Bad Joke Like A Bad Pencil?",
        punchline: "Because it has no point."
    },
    {
        id: 2,
        name: "Jane Doe",
        content: "How Do You Get A Baby Alien To Sleep?",
        punchline: "You rocket."
    }
]

let id = 3;

module.exports = {
    getJokes: (req, res) => {
        console.log(res);
        res.status(200).send(jokes)
    },

    addJoke: (req, res) => {
        const {name, content, punchline} = req.body;

        let joke = {
            id: id,
            name: name,
            content: content,
            punchline: punchline
        }

        jokes.push(joke);
        id++;

        res.status(200).send(jokes);
    },

    editJoke: (req, res) => {
        const { id } = req.params;
        let { name, content, punchline } = req.body;

        let index = jokes.findIndex(t => t.id === +id)
        if(index !== -1) {
            jokes[index].name = name;
            jokes[index].content = content;
            jokes[index].punchline = punchline;
        }
        res.status(200).send(jokes);
    },

    deleteJoke: (req, res) => {
        let {id} = req.params;

        let index = jokes.findIndex(t => t.id === +id)
        if(index !== -1) {
            jokes.splice(index, 1)
        }
        res.status(200).send(jokes); 

    }
}