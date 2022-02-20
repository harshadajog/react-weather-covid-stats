import { Input, Form } from "semantic-ui-react";
import { useState} from 'react';
import './SearchBar.css';

const SearchBar = ({ getWeatherData }) => {
    const [userInput, setInput] = useState('');

    const handleChange = (e) => {   
        setInput(e.target.value); 
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        if(userInput){
        getWeatherData(userInput);
        }
        setInput('');
    }

    return (
        <div className="SearchBar">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Input  className="SearchBar-input" value = {userInput} icon='search' placeholder='Search...' onChange={(e)=> handleChange(e)}/>
            </Form>
        </div>
    )
}

export default SearchBar;