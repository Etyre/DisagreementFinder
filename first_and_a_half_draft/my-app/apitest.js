const fetch = require("node-fetch");

const APIcall = async ({url, method, body=null}) => {
    // This code is an implementation of the code provided at this address: https://dashboard.sheety.co/projects/5fdd446dcd1aeb557b792574/sheets/usersXPropositions
    const content = {
        method: method,
        headers: {
        'Content-Type': 'application/json'
        }    
    }
    
    if (body) {content["body"] = body} // TODO -- make this more legible? 
    
    var outputJSON = {}

    var tiger = await fetch(url, content)
    .then( response => {
       // console.log(response)
        if (!response.ok) {
            throw response
        }
        return response.json()
    }).then(json => 
        outputJSON = json
      // console.log(json)
    )

    return outputJSON
}

const textToID = (text) => {
    //currently this just returns the text, but in the future we want it to give a alphanumeric id.
    // Actually, do we want to check if the exact text exists, and if it does, get the id of that text?
    return text
}

const getRowNum = async (userID) => {
    const data = await APIcall({
        url: 'https://api.sheety.co/b145b971b7e828b2b940f8b41a78931a/disagreementFinder/usersXPropositions',
        method: 'GET'
    })
    const row = data.usersXPropositions.find( row => row.name == userID)        
    return row.id
}

function addNewProposition({text}) {
    APIcall({
        url: 'https://api.sheety.co/b145b971b7e828b2b940f8b41a78931a/disagreementFinder/propositions',
        body: {
            // NOTE: Weird bug in sheety API pruning "s" at the end of sheet names, specifically for the root property
            proposition: {
            "name": text,
            "id": textToID(text)
            }
        },
        method: 'POST'
    })
}


async function updateOpinion(currentUserID, activePropositionID, opinion) {
    const rowNumber = await getRowNum(currentUserID);
    
    let url = 'https://api.sheety.co/f485e7922aff465ce14382e976a51c5e/disagreementFinder/usersXPropositions/'+rowNumber.toString();
    
    
    let body = {
        usersxproposition: {
            [activePropositionID]: opinion,
        }
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(body)
    })

    .then( response => {
  
        return response.json()
    })
    .then(json => {

    });
}

updateOpinion("jakey", "hello", 649589)