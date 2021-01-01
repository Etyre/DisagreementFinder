import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
// function displayPropCard(text) {
//   return
//     <div className="Proposition_Card">
//       <div className="Proposition_text">
//         {props.text}
//       </div>
//       <div className="Agreement_slider">
//             </div>
//       <div className="Skip_button"></div>
//     </div>
// }

// function renderSkipButton() {
//   return (
//     <button className="Skip_button" onClick={function() { 
//       skipToNextCard; }}>

//     </button>
//   )
// }

// function skipToNextCard() {
//   // this should somehow skip to the next card.
// }



function SkipButton({counter, switchFunction}) {

  return(
    <button className="Skip_button" onClick={() => switchFunction(counter+1)}>
      [skip]
    </button>
  )
}


function AgreementButton({level, counter, switchFunction}) {
  return(
    <button className="Agreement_Button" onClick={() => switchFunction(counter+1)} id={"levelButton"+level}>
      [ ]
    </button>
  )
}

function AgreementSlider({switchFunction}) {
  const agreementLevels = [0,1,2,3,4,5,6,7,8]
 
  return(
    <div>
      <div className="Slider_Label">strongly agree</div>
        { agreementLevels.map( level => 
          <AgreementButton level={level} switchFunction={switchFunction}/> )}
      <div className="Slider_Label">strongly disagree</div>
    </div>
  )
}

function PropositionCard(props) {
  console.log(props.counter)
  console.log(props.numbOfTexts)
  if (props.counter > props.numbOfTexts){
    return (
      <div className="Proposition_Card">
        <p>You have used up all the cards!</p>
      </div>)
  }
  else return(
    <div className="Proposition_Card">
      {props.activeCard}
      <AgreementSlider counter={props.counter} switchFunction={props.switchFunction}/>
      <SkipButton counter={props.counter} switchFunction={props.switchFunction}/>
    </div>
  )
}


function App() {

  const [counter, setCounter] = useState(0);
  const texts = ['First Proposition', 'Second', 'Third', 'Fourth'];
  const activeCard = texts[counter]

  useEffect(() => {
    let url = 'https://api.sheety.co/f485e7922aff465ce14382e976a51c5e/disagreementFinder/usersXPropositions';
    fetch(url)
    .then((response) => response.json())
    .then(json => {
      // Do something with the data
      console.log(json.usersXPropositions);
    });

  // let url = 'https://api.sheety.co/f485e7922aff465ce14382e976a51c5e/disagreementFinder/sheet1';
  // let body = {
  //     sheet1: {
  //         "name": "arnold",
  //         "email": "d@e.com",
  //         "Column name": "I predict this will not appear"
  //     }
  // }
  // fetch(url, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  // })
  //     .then((response) => response.json())
  //     .then(json => {
  //         // Do something with object
  //         console.log(json.sheet1);
  // });
  })

  return (
    <div className="App">
      
      <div className="App_box">
        <div className="Profile_stuff">
          [this section should have a button that leads to a profile page, and a sign out button.]
        </div>

        <div className="Evaluation_funcitionality">
          <div className="Instructions">
            Click agree, disagree, or something in between, to reflect your belief...
          </div>
          <PropositionCard activeCard={activeCard} counter={counter} switchFunction={setCounter} numbOfTexts={texts.length}/>
        </div>

        <div className="Writein_functionality"> 
          <div className="Instructions">
            ...or, write in your own!
          </div>
          <div>
            <form>
              <label>
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>

          </div>
        </div>
      </div>
     
    </div>
  );
}



export default App;
