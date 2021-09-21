//uses api to get sentiment of text
async function sentiment(text){
    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/",{
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
          },
          method: "POST", //postig data
          body: JSON.stringify({
            text: text
          }),      
    });
    //check if the response is ok
    if(response.ok) {
      const result = await response.json();
      
      let res = result['result'];
      let pol = res['polarity'];
      let type = res['type'];
      
      document.getElementById("polarity").textContent= pol;
      document.getElementById("type").textContent=type ;

      //changes result to green
      if(type=="positive"){
        document.getElementById("polarity").style.color = "green";
        document.getElementById("type").style.color = "green";
      }

      //changes result to red
      else if(type=="negative"){
        document.getElementById("polarity").style.color = "red";
        document.getElementById("type").style.color = "red";
      }

      //changes result to gray
      else if(type=="neutral"){
        document.getElementById("polarity").style.color = "grey";
        document.getElementById("type").style.color = "grey";
      }
    //hidden loading gif
    typeElement.parentElement.querySelector(".loading").hidden = true;
    polarityElement.parentElement.querySelector(".loading").hidden = true;  
    }
    else{
      alert("HTTP-Error: " + response.status);
    }
  }

  //save the value of the text input
  function hundleButtonClick(){
    let text = document.getElementById('text').value;
    sentiment(text);  
    
    //Add loading effect and Clear prev Results
    typeElement.parentElement.className = "";
    polarityElement.parentElement.className = "";
    typeElement.textContent = "";
    polarityElement.textContent = "";


    typeElement.parentElement.querySelector(".loading").hidden = false;
    polarityElement.parentElement.querySelector(".loading").hidden = false;  
  
  }

  const typeElement = document.getElementById("type");
  const polarityElement = document.getElementById("polarity");
