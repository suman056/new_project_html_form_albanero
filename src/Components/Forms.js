import React, { useEffect, useState } from "react";
import "./form_style.scss";
function Forms(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(true);
  const [isSubmit,setIsSubmit]=useState(false)
  const [errorValue,setErrorvalue]=useState({"name":false,"username":false,"password":false,"age":false})
 
  
//name change handle on change of input name
  const nameChange = (e) => {
    setIsSubmit(false)
    setName(e.target.value);
    e.preventDefault();
    document.contactForm.realname.style.border=""
    let isNameCorrect = nameValidation(e.target.value)
     setErrorvalue({...errorValue,"name":false})
    if (!isNameCorrect) {
      setErrorvalue({...errorValue,"name":true})
      document.contactForm.realname.style.border = "2px solid #cc3333";
      
      setIsError(true);
    }
    else{
      setIsError(false)
    }
    
  };
//age change on change of input value
  const ageChange = (e) => {
    setIsSubmit(false)
    setAge(e.target.value);
    e.preventDefault()
    let isAgeCorrect=ageValidation(e.target.value)
    
    document.contactForm.realage.style.border=""
    setErrorvalue({...errorValue,"age":false})
    if(!isAgeCorrect){
    document.contactForm.realage.style.border = "2px solid #cc3333"
    setErrorvalue({...errorValue,"age":true})
    setIsError(true)
    }
    else{
      setIsError(false)
    }
    ;
  };
  //username change on change of usename value
  const usernameCahnge = (e) => {
    setIsSubmit(false)
    setUserName(e.target.value);
    e.preventDefault();
    let isUserNameCorrect=usernameValidation(e.target.value)
    document.contactForm.realusername.style.border=""
    setErrorvalue({...errorValue,"username":false})
    if(!isUserNameCorrect){
      document.contactForm.realusername.style.border = "2px solid #cc3333"
      setErrorvalue({...errorValue,"username":true})
      
      setIsError(true)
    }
    else{
      setIsError(false)
    }
    
  };
  //password change on change of password value
  const passwordChange = (e) => {
    setIsSubmit(false)
    setPassword(e.target.value);
    e.preventDefault();
    let isPasswordCorrect=passwordValidation(e.target.value)
    document.contactForm.realpassword.style.border =""
    setErrorvalue({...errorValue,"password":false})
    if(!isPasswordCorrect){
      document.contactForm.realpassword.style.border ="2px solid #cc3333"
      setErrorvalue({...errorValue,"password":true})
      setIsError(true)
    }
    else{
        setIsError(false)
    }
    
  };

 // on click button we are sending the data from childern to parent component
  const onbuttonClick = () => {
   
    setIsSubmit(false)
    if(!isError&&name.length>0&&userName.length>0&&password.length>0&&age.length>0){
    setIsSubmit(true)
    props.handleCallBack({name:name,username:userName,password:password,age:age})
    setAge("")
    setName("")
    setPassword("")
    setUserName("")
    }
   
  };





//name validation
  function nameValidation(newName) {
   
     let newName1=newName.trim()
    if (newName1.indexOf(" ") < 0) {
      return false;
    }
    return true;
  }
//age validation
  function ageValidation(ageValue) {
   
   let age1=ageValue
    if (ageValue.trim().length === 0) {
      return false;
    }
    
    let rightValue=/^[0-9]*$/
    if (!rightValue.test(ageValue)) {
     
      return false;
    }
    ageValue = Number(ageValue);
    
    if (ageValue === 2) {
      return true;
    }
    if (ageValue < 0) {
      return false;
    }
    --ageValue;
    while (ageValue > 1) {
     

      
      if (age1 % ageValue === 0) {
        return false;
      }
      ageValue--;
    }
    return true;
  }


//username validation
  function usernameValidation(nameValue) {
    let correctPattern = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,8}$/;
    
   
    if (nameValue.trim().length === 0) {
      return false;
    }
    
    return correctPattern.test(nameValue);
  }



//password validation
  function passwordValidation(passwordValue) {
     
    if (passwordValue.trim().length === 0) {
      return false;
    }
   let correctPasswordFormat=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

    return correctPasswordFormat.test(passwordValue);
  }
  
  
  return (
    <div className="main_container">
      <div className="centre_container">
        <br/>
        <br/>
        <h2>User Deatils</h2>
        <form
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
          <p className="errorMessage">{errorValue["name"]?"name is not in correct format ex:-Suman Dhang":""}</p>
          <br/>
       
          <input
            placeholder="Age"
            name="realage"
            value={age}
            onChange={(e) => {
              ageChange(e);
            }}
          ></input>
          <p className="errorMessage">{errorValue["age"]?"age should be prime number ex:-23":""}</p>
          <br/>
         
          <input
            placeholder="Username"
            name="realusername"
            value={userName}
            onChange={(e) => {
              usernameCahnge(e);
            }}
          ></input>
          <p className="errorMessage">{errorValue["username"]?"username  should contain lowercase with number ex:-suman056":""}</p>
         
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
          <p className="errorMessage">{errorValue["password"]?"password must contains one uppercase ,one lowercase and one special character ex:-gYUI*U":""}</p>
        </form>
        <br />
       <div className="text_response">
        <p className="text">
          {isSubmit ? "userdetails submitted sucessfully" : ""}
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

      </div>
    </div>
  );
}

export default Forms;
