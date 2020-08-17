import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from "./Header.js";
import images_qv from "./images/qv.png" //this is clearly not how I'm meant to do this



function About() {
    return(
    <div>
     <Header/>
    <div className="aboutBox">
        <p>Quadratic voting is a method of voting that aims to 
            aggregate a groups preferences in the fairest way.
        </p>
        <p>
            Each vote for an option will cost the square of the 
            number of one plus the previous votes for that option
        </p>
        <p>
            i.e your first vote for an option will cost 1, your 
            second vote will cost 4, then 9, then 16 etc
        </p>
        <img src={images_qv} alt="" style={{width: '100%'}}/>
    </div>
    <div style={ { textAlign: "center", marginTop: "10px" }}>
      <Link to={"/"}>Home</Link> 
    </div>


    </div>
    )
}

export default About