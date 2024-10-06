let isNum = true;
let ans; // Antwortspeicher

function toDisplay(e){
    let text = e.target.innerHTML
    let display = document.getElementById("display");
    
    console.log(isNum);
    switch(e.target.id){ 
        case "num": {
            console.log("num");
            if(display.innerText =="0" && text!= ".")
                display.innerHTML = text;
            
            else
                display.innerHTML = display.innerHTML + text;
            
            isNum = text == "." ? false :  true;
            break;
        }
        case "CE":
            display.innerHTML = "0";
            isNum = true;
            break;
        
        case "C":
            if(isNum){
                let list = display.innerText.split(" ");
                display.innerHTML = list.length <= 1 ? 0 : list.slice(0,-2).join("");
            }
            break;
            //todo beheben
        case "backspace":
            //deletes 3 letters
            if(display.innerText.length>1 && !isNum){
                display.innerHTML = display.innerHTML.slice(0,-3);
                isNum = true;
            }
            else if(display.innerText.length>1)
                display.innerHTML = display.innerHTML.slice(0,-1);
            else if(display.innerText.length == 1)
                display.innerHTML = "0";
            break;
        case "=":
            if(isNum){
                
                let calcArray = display.innerText.split(" ");
                display.innerHTML = calc(calcArray)
                ans = display.innerHTML;
                
            }
            break;
        case "ANS":
            if(typeof ans == "string"){
                display.innerHTML = !isNum ?  display.innerHTML+ans : ans;
                isNum = true;
            }
            break;
        

    }
    if (e.target.className == "operator" && isNum){
        display.innerHTML = display.innerHTML + " "+ text + " ";
        isNum = false;
    }
    
}
/**
 * 
 * @param {String} stringNum String containing Numbers (float and Int)
 * @returns A float or an int depending on the Input
 */
function convertToNumber(stringNum){
    if(typeof stringNum == "undefined"){
        return null;
    }
    else if(typeof stringNum == "number")
        return stringNum;
     if(stringNum.indexOf(".") != -1 || stringNum.indexOf("e")!=-1){
        return parseFloat(stringNum);
    }
    else{
        return parseInt(stringNum);
    }
}


function calc(numArray){
    //Punkt vor Strich
    console.log(numArray);
    i = numArray.indexOf("*");
    j = numArray.indexOf("/");
    
    while(i > 0 || j > 0){
        
        
        if(j==-1 || (i!=-1 && i<j) ){
            
        
            numArray[i + 1] = convertToNumber(numArray[i - 1]) * convertToNumber(numArray[i + 1]);
            numArray = numArray.slice(0,i-1).concat(numArray.slice(i+1));
            
        }

        else if((j!=-1  && i>j)||i==-1){
            numArray[j + 1] = convertToNumber(numArray[j - 1]) / convertToNumber(numArray[j + 1]);
            numArray = numArray.slice(0,j-1).concat(numArray.slice(j+1));
        }
        else
            {
                console.error("Fail");
                return null;

            }
        //console.log("end ",numArray);
        i = numArray.indexOf("*");
        j = numArray.indexOf("/");
        console.log("nach-> ",numArray);
    }
    

    
    i = numArray.indexOf("+");
    j = numArray.indexOf("-");
    count = 0;
    while(i > 0 || j > 0){
        if(j==-1 || (i!=-1 && i<j) ){
            
           
            numArray[i + 1] = convertToNumber(numArray[i - 1]) + convertToNumber(numArray[i + 1]);
            numArray = numArray.slice(0,i-1).concat(numArray.slice(i+1));
        }

        else if((j!=-1  && i>j)||i==-1){
            numArray[j + 1] = convertToNumber(numArray[j - 1]) - convertToNumber(numArray[j + 1]);
            numArray = numArray.slice(0,j-1).concat(numArray.slice(j+1));
        }
        else
            {
                console.error("Fail");
                return null;

            }
        //console.log("end ",numArray);
        i = numArray.indexOf("-");
        j = numArray.indexOf("+");
        
    }
    return String(numArray[0]);
}


document.addEventListener("click", toDisplay);

