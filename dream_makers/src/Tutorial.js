/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import stubs from "./stubs";

const Tutorial=React.forwardRef((props,ref)=> {
  const [code, setCode] = useState(null);
  const [language, setLanguage] = useState("");
  const [output, setOutput] = useState("");
//  custom hook to prevent useEffect's initial render:
  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);
  
    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };

  useEffect(() => {
    if(!props.initCode)
    setCode(stubs[language]);
  }, [language]);

  useEffect(() => {
    setCode(`${props.initCode}`);
  }, []);

  const submitHandler = async () => {
    let postTokenoptions = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*", wait: true },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "x-rapidapi-key": "078ccedceemsh7c7f7228a49c5b1p17ab36jsnaf56639a0967",
      },
      data: {
        language_id: 71,
        source_code: code,
        // source_code: "print('Hello World')",
        stdin: null,
      },
    };

    try {
      const response = await axios.request(postTokenoptions);
      setOutput(response.data.stdout);
    } catch (err) {
      console.log(err);
    }
  };

  //  code for sending data 
   useDidMountEffect(() => {
     props.sendFunc(output);
   },[output]);

  React.useImperativeHandle(ref,()=>({
    languageHandler(commandData){
      setLanguage(commandData.language.value.toLowerCase());
    },
    handleSubmit(){
      submitHandler();
    },
    myCleatFunction() {
      let str = "";
      return setCode(str);
    },
    myForFunction(a, b, c) {
      let str =
        "for" +
        " " +
        "x" +
        " " +
        "in" +
        " " +
        "range" +
        "(" +
        a +
        ", " +
        b +
        ", " +
        c +
        ")" +
        ":";
      let res = setCode((prevState) => prevState.concat(str));
  
      return res;
    },
    myListFunction(a, b, c, d) {
      let str =
        a +
        " " +
        "=" +
        " " +
        "[" +
        '"' +
        b +
        '"' +
        "," +
        " " +
        '"' +
        c +
        '"' +
        "," +
        " " +
        '"' +
        d +
        '"' +
        "]";
      let res = setCode((prevState) => prevState.concat(str));
  
      return res;
    },
    myDecrFunction(a, b) {
      // eslint-disable-next-line no-useless-concat
      let str = a + " " + "-" + "=" + " " + b;
      let res = setCode((prevState) => prevState.concat(str));
  
      return res;
    },
    myIncFunction(a, b) {
      // eslint-disable-next-line no-useless-concat
      let str = a + " " + "+" + "=" + " " + b;
      let res = setCode((prevState) => prevState.concat(str));
      return res;
    },
    myFuncFunction(a, b) {
      // eslint-disable-next-line no-useless-concat
      let str = "def" + " " + a + "(" + b + ")" + ":";
  
      return setCode((prevState) => prevState.concat(str));
    },
    myLoopFunction(a, b, c, d) {
      let e;
      if (c == "greater than") {
        e = ">";
      } else if (c == "less than") {
        e = "<";
      } else if (c == "equal equal to") {
        e = "==";
      } else if (c == "equal") {
        e = "=";
      }
      let str = a + " " + b + e + d + ":";
      let res = setCode((prevState) => prevState.concat(str));
  
      return res;
    },
    myVarFunction(a, b) {
      let str = a + "=" + b;
      let res = setCode((prevState) => prevState.concat(str));
  
      return res;
    },
    myPrintFunction(a) {
      let str = 'print("' + a + '")';
      let res = setCode((prevState) => prevState.concat(str));
  
      return res;
    }
  }))

  function inputChangeHandler(event) {
    console.log("abs3", code);
    
    setCode(event.target.value);
  }

  return (
    <div>
      <section className="p-10 ">
        <h1 className="text-4xl sm:text-5xl flex justify-center p-5 font-exo">
          Compiler
        </h1>
        <textarea
          rows="20"
          value={code}
          onChange={(e) => inputChangeHandler(e)}
          className="border-2 border-gray-200 p-2 rounded-xl lg:w-[50vw] w-full"
        ></textarea>
        <div className="my-2">
          <button
            className="text-lg border-2 border-red-600 rounded-xl bg-red-200 hover:bg-red-500 px-3 py-1"
            onClick={submitHandler}>
            Submit
          </button>
        </div>
        <textarea
          className="border-2 border-gray-200 h-36 lg:w-[50vw] w-full rounded-xl p-2"
          placeholder="Output"
          value={output}>
 </textarea>
        
      </section>
    </div>
  );
})

export default Tutorial;
