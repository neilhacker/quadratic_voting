import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { Chart } from "react-google-charts";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Main () {
const [tokens, setTokens] = useState(100)
const [initialTokens, setInitialTokens] = useState(100)
const [voters, setVoters] = useState(2) //used 1000 so the results won't show initially 
const [round, setRound] = useState(0)
const [options, setOptions] = useState([])
const [hide, setHide] = useState('block') //hides initial input boxes
const [show, setShow] = useState('none') // shows completed options
const [againHover, setAgainHover] = useState(false)

function tokenSubmit(event) {
    const tokencount = document.getElementById("tokens").value
    setTokens(tokencount);
    setInitialTokens(tokencount);
    document.getElementById("tokens").value = "" //clears box
  }

function voterSubmit(event) {
    const x = document.getElementById("voters").value
    setVoters(x);
    document.getElementById("voters").value = ""
  }

const optionSubmit = () => { 
    // when you submit option add option name add slot to vote count, overall vote count, cost array
    setOptions([
      ...options,
      {
        id: options.length,
        value: document.getElementById("option").value,
        votes: 0,
        cost: 1,
        totalVotes: 0,
      }
    ]);
    
    document.getElementById("option").value = ""
  }

function changeBackground(e) {
    e.target.style.background = '#f8969e';
  }

function changeBackgroundBack(e) {
    e.target.style.background = 'rgb(161, 159, 159)';
  }

  function deleteOption(id){
    setOptions(options.filter(item => item.id !== id));
  }

  function Hide() {
    setHide('none');
    setShow('block');
  }
  
  function updateCount(id) { //update the votes for option and reduce tokens by 1
        
    const newList = options.map((item) => {
    if (item.id === id) {
        const updatedItem = {
            ...item,
            votes: item.votes +1,
            cost: (item.votes+2) ** 2,
        };
        if (item.cost < tokens) {
            setTokens(prevTokens => prevTokens - item.cost )
            return updatedItem;
        }
        else {
            return item
        }

    }
    return item;
    });

    setOptions(newList);
    
  }

  function deupdateCount(id) { //update the votes for option and reduce tokens by 1
        
    const newList = options.map((item) => {
    if (item.id === id) {
        const updatedItem = {
            ...item,
            votes: item.votes -1,
            cost: (item.votes) ** 2,
        };
        if (item.votes > 0) {
            setTokens(prevTokens => prevTokens + item.votes**2 )
            return updatedItem;
        }
        else {
            return item
        }

    }
    return item;
    });

    setOptions(newList);
    
  }

  function resetVotes() {
    setTokens(prevTokens => initialTokens)

    const newList = options.map((item) => {
    
    const updatedItem = {
        ...item,
        votes: 0,
        cost: 1,
        };
        return updatedItem;
    });

    setOptions(newList);
  }

  function submitVotes() {

    setTokens(prevTokens => initialTokens);

    const newList = options.map((item) => {
    const updatedItem = {
        ...item,
        votes: 0,
        cost: 1,
        totalVotes: item.totalVotes + item.votes,
        };
        return updatedItem;
    });

    setOptions(newList);

    setRound(prevRound =>
        prevRound + 1)
  }

  function goAgain() {
    setHide('block');
    setShow('none');
    setRound(0);
    setOptions([]);
    setVoters(2);
    setTokens(100);
    setInitialTokens(0)
  }
  
  function showStartAgainMess() {
    setAgainHover(true)
  }

  function hideStartAgainMess() {
    setAgainHover(false)
  }

   var b = [['Options', 'Votes']] 
        options.map(item => (
        <div key={item.id}>
          {b.push([item.value,item.votes])}
        </div>
    )) 

    var c = [['Options', 'Total Votes']] 
        options.map(item => (
        <div key={item.id}>
          {c.push([item.value,item.totalVotes])}
        </div>
    ))

  return (
    <div>  
     {/* initial form    */}
    <div className='maincontainer' style={{display: hide}}> 
        <form onSubmit={voterSubmit}>
            <label>
            Number of voters: <br></br> 
            <input 
                type="text" 
                id="voters" 
                // onKeyPress={event => event.key === 'Enter' && voterSubmit()}
            />
            </label>
            <input type="button" value="Submit" onClick={voterSubmit}/>
        </form>
        <br></br>
        <form onSubmit={tokenSubmit}>
            <label>
            Tokens:<br></br>
            <input type="text" id="tokens"  />
            </label>
            <input type="button" value="Submit" onClick={tokenSubmit} />
        </form>
        <br></br>
        <form onSubmit={optionSubmit}>
            <label>
            Add options:<br></br>
            <input type="text" id="option"  />
            </label>
            <input type="button" value="Submit" onClick={optionSubmit} />
        </form>
    <br></br>
    <p>Voters: {voters}</p>
    <p>Tokens: {tokens}</p>
    
    <h3>Options: </h3>
        {options.map(item => (
            <p key={item.id} className='initialOptions'>
                {item.value +'  '}
                <button //deleting option button
                 onMouseOver={changeBackground} 
                 onMouseLeave={changeBackgroundBack} 
                 style={ {
                     backgroundColor: 'rgb(161, 159, 159)',
                     borderRadius:"5px"}}
                onClick={() => deleteOption(item.id)}
                 >X</button>
            </p>
            
        ))}

    <button onClick={Hide} style={{display: hide, margin: "0 auto", marginTop: "10px"}}>Done</button>  
    </div>

    {/* voting form */}
    <div style={ { textAlign: "center", marginTop: "10px", display: hide }}>
        <Link to={"About"}>What is Quadratic Voting?</Link> 
    </div>


    <div style={{display: round < voters? show: "none"}}>
      <div className="columns">
        <div className="column" style={{marginLeft:'100px',marginTop:'50px'}}>
          <h2>Voter # {round+1}</h2>

          <p>Tokens remaining: {tokens}</p>
          <h3>Options: </h3>
              {options.map(item => (
                <p key={item.id} style={{
                  backgroundColor: '#e0dbdb', 
                  width:'50%', 
                  padding:"7px", 
                  borderRadius: "10px"}} 
                  >
                  <h4>{item.value} </h4>
                  <p>Current votes: {item.votes}</p>
                  <p>Cost of next vote: {item.cost} </p>
                  
                  <button 
                  type="button"
                  onClick={() => updateCount(item.id)}>
                  Vote
                  </button> 
                  <button 
                  type="button"
                  onClick={() => deupdateCount(item.id)}>
                  Unvote
                  </button>  
                </p>
              ))}
          
              <button onClick={submitVotes}>Submit</button> 
              <button onClick={resetVotes}>Reset</button>
              <button 
              onClick={goAgain} 
              style={ { backgroundColor:'#ed8989', borderRadius:'5px'}}
              onMouseOver={showStartAgainMess}
              onMouseLeave={hideStartAgainMess}
              >Start Again</button> <div style={{display: againHover===true? 'block':'none'}}>This will take you back to the start page</div>
        </div>
        <div className="column" style={{marginRight:'10%',marginLeft:'50%',marginTop:'100px', position:'fixed'}}>
          <Chart 
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={b}
            options={{
              title: 'Quadratic votes',
              chartArea: { width: '50%' },
              hAxis: {
                title: 'Votes',
                minValue: 0,
              },
              vAxis: {
                title: 'Option',
              },
            }}
          /> 
        </div>
        </div>
    </div> 
    

    {/* if round is greater than voters show results  */}
    <div style={{display: round < voters? "none": "block"}} className='results'> 
    
       <h1>Results</h1>
       <div className="columns">
         <div className="column">
        {options.map(item => (
            <p key={item.id}  >
                <h4>{item.value} {item.totalVotes}</h4>
            </p>
        ))}
        </div>
        <div className="column">
        <Chart 
            width={'500px'}
            height={'300px'}
            background-color={'#e0dbdb'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={c}
            options={{
              title: 'Quadratic votes',
              chartArea: { width: '100%' },
              hAxis: {
                title: 'Votes',
                minValue: 0,
              },
              vAxis: {
                title: 'Option',
              },
            }}
          /> 
          <br></br>
          </div>
          </div> {/* end column element */}
        <button onClick={goAgain}>Go Again</button>
    </div>
     
  </div>
  )
}

export default Main;