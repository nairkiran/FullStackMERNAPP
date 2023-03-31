import React from "react";
import { Link } from "react-router-dom";
function Navigation (){
    return (
        <div>
        <nav className="App-nav">
            <Link to="/"><button id="Home">Home</button></Link>
            <p></p>
            <Link to="/add-exercise"><button id="Add">Add</button></Link>
            <p></p>
        </nav>
        </div>
    )
}
export default Navigation