import React from 'react';
import './App.css';
import CountButton from '../AnswerButton';
import Input from '../App/user_name';
class App extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
        this.all_qeustains = [];
        this.user_name = "";

    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
"https://opentdb.com/api.php?amount=100")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        
        const { DataisLoaded, items } = this.state;
        console.log(this.state)
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
        else
            this.all_qeustains = items.results;
        
        if(this.user_name=="")
        {return(
            <Input/>
        );
        }
        else{
        return (
        <div className = "App">
          
            <h1> Fetch data from an api in react </h1>  {
                this.all_qeustains.map((item) => ( 
                <ol key = {item.category} >
                     q_type: {item.type} 
                    </ol>
                ))
            }
        </div>
    );}
}
}

export default App