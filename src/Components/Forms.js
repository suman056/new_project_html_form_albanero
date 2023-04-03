import React, { useEffect, useState } from "react";
import "./form_style.scss";
function Forms() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorValue, setErrorValue] = useState([]);
  const [buttonClick,setButtonClick]=useState(0)
  
  

  const nameChange = (e) => {
    setName(e.target.value);
    e.preventDefault();
  };
  const ageChange = (e) => {
    setAge(e.target.value);
    e.preventDefault();
  };
  const usernameCahnge = (e) => {
    setUserName(e.target.value);
    
    e.preventDefault();
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
    e.preventDefault();
  };
  const onbuttonClick = () => {
   
    let buttonClickValue=buttonClick
    setButtonClick(++buttonClickValue)
    formValidate();
  };
  const formValidate = function () {
    let isNameCorrect = nameValidation();
    let isAgeCorrect = ageValidation();
    let isUserNameCorrect = usernameValidation();
    let isPasswordCorrect = passwordValidation();
    console.log(isUserNameCorrect)
   

    if(buttonClick>1){
    
      setIsError(false)
      setErrorValue([])
    
  }
  let errorvalue=[]
  document.contactForm.realname.style.border=""
  document.contactForm.realage.style.border=""
  document.contactForm.realusername.style.border =""
  document.contactForm.realpassword.style.border=""
    if (!isNameCorrect) {
      document.contactForm.realname.style.border = "2px solid #cc3333";
      errorvalue.push("name");
      setIsError(true);
    }
    if (!isAgeCorrect) {
      document.contactForm.realage.style.border = "2px solid #cc3333";
      errorvalue.push("age");
      setIsError(true);
    }
    
    if (!isUserNameCorrect) {
      document.contactForm.realusername.style.border = "2px solid #cc3333";
      errorvalue.push("username");
      setIsError(true);
    }
    if (!isPasswordCorrect) {
      document.contactForm.realpassword.style.border = "2px solid #cc3333";
      errorvalue.push("password");
      setIsError(true);
    }
    setErrorValue((previousvalue)=>[...errorvalue]);
  };
  function nameValidation() {
    let newName = name.trim();
    if (newName.indexOf(" ") < 0) {
      return false;
    }
    return true;
  }
  function ageValidation() {
    let ageValue = age;
    if (ageValue.trim().length === 0) {
      return false;
    }
    
    let rightValue=/^[0-9]*$/
    if (!rightValue.test(ageValue)) {
     
      return false;
    }
    ageValue = Number(age);
    if (ageValue === 2) {
      return true;
    }
    if (ageValue < 0) {
      return false;
    }
    --ageValue;
    while (ageValue > 1) {
      // console.log(ageValue, 1);

      let age1 = age;
      if (age1 % ageValue === 0) {
        return false;
      }
      ageValue--;
    }
    return true;
  }
  function usernameValidation() {
    let correctPattern = /^[A-Za-z0-9_]*$/;
    let nameValue = userName;
     console.log(userName)
    if (nameValue.trim().length === 0) {
      return false;
    }
    
    return correctPattern.test(nameValue);
  }
  function passwordValidation() {
    let passwordValue = password;
    if (passwordValue.trim().length === 0) {
      return false;
    }
    let length = Math.floor(password.length / 2);
    let i = 0;
    while (i < length) {
      if (password[i] === password[password.length - i - 1]) {
        return false;
      }
      i++;
    }
    return true;
  }

  function renderError() {
    // console.log(errordata);
  }
  useEffect(() => {
    renderError();
    // console.log("working fine");
  }, [isError]);
  return (
    <div className="main_container">
      <div className="centre_container">
        <br />
        <br />
        <form
          onSubmit={() => {
            formValidate();
          }}
          name="contactForm"
        >
          <input
            placeholder="Name"
            name="realname"
            value={name}
            onChange={(e) => {
              nameChange(e);
            }}
          ></input>
          <br />
          <br />
          <input
            placeholder="Age"
            name="realage"
            value={age}
            onChange={(e) => {
              ageChange(e);
            }}
          ></input>
          <br />
          <br />
          <input
            placeholder="Username"
            name="realusername"
            value={userName}
            onChange={(e) => {
              usernameCahnge(e);
            }}
          ></input>
          <br />
          <br />
          <input
            placeholder="password"
            type="password"
            name="realpassword"
            value={password}
            onChange={(e) => {
              passwordChange(e);
            }}
          ></input>
        </form>
        <br />
       <div className="text_response">
        <p className="text">
          {isError ? errorValue.join(",") + " not in proper format" : ""}
        </p>
      </div>
        <br />
        <button
          onClick={() => {
            onbuttonClick();
          }}
        >
          submit 
        </button><br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>

      </div>
    </div>
  );
}

export default Forms;
