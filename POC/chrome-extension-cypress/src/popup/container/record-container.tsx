import React, {FC, useEffect, useState} from 'react';
import {RecordButtons} from "../components/record-buttons/record-buttons";
import {CodeArea} from "../components/code-area/code-area";
import './record-container.scss'
import {Button} from "primereact/button";
export const RecordContainer: FC<any>  = ({...props}) => {
    const [codeArea, setCodeArea] = useState('');
    const [describeTitle, setDescribeTitle] = useState('');
    const [qaMode,setQaMode] = useState(false);
    const [email,setEmail] = useState('');
    const [url,setURL] = useState('');

    useEffect(()=>{
        chrome.storage.local.get(["qaMode","email","URLToTest"],items=>{
            if(items["qaMode"]){
                setQaMode(items["qaMode"]);
            }
            if(items["email"]){
                setEmail(items["email"]);
            }
            if(items["URLToTest"]){
                setURL(items["URLToTest"]);
            }
        })
    },[])
    useEffect(() => {
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode","itTitles",'testSuitIndex'], (items) => {
            if (items['generatedCode']) {
                setCodeArea(items['generatedCode'].join('\n'));
            }
        });
    }, [])

    useEffect(() => {
        chrome.storage.local.get(['generatedCode','testSuitIndex','itTitles'],(items)=>{
            let generatedCode = items['generatedCode'];
            let index = items['testSuitIndex'];
            generatedCode[index]=codeArea;
            chrome.storage.local.set({ "generatedCode": generatedCode,"testSuitIndex":index,'itTitles':items['itTitles'] }, function(){
                //  Data's been saved boys and girls, go on home
            });
        })

    }, [codeArea])

    const updateCode = (value) => {
        setCodeArea(value)
    }

    const clearCode = () => {
        chrome.storage.local.set({ "generatedCode": [] ,"testSuitIndex":0,itTitles:['']}, function(){
            setCodeArea('')
        });
    }
    const onBlurURL = e =>{
        chrome.storage.local.set({"URLToTest":e.target.value});
    }
    const onBlurEmail = e =>{
        chrome.storage.local.set({"email":e.target.value});
    }
    const changeMode = e =>{
        setQaMode(()=>!qaMode);
        chrome.storage.local.set({"qaMode":!qaMode});
    }

    const emailText = `mailto:${email}?body=test&subject=Reproduction steps`
    return(
      <div className={'record-container'}>
          <div className="toggle-container">
              <h1>CLIENT/QA</h1>
              <label className="switch">
                  <input type="checkbox" checked={qaMode} onChange={changeMode}/>
                  <span className="slider round"></span>
              </label>
          </div>
          <div className="input-container">
              <div className="container">
                  <label htmlFor="email">Email:</label>
                  <input id="email"
                         value={email}
                         onChange={e=>setEmail(e.target.value)}
                         onBlur={onBlurEmail}/>
              </div>
              <div className="container">
                  <label htmlFor="url">URL:</label>
                  <input id="url"
                         value={url}
                         onChange={(e)=>setURL(e.target.value)}
                         onBlur={onBlurURL}
                  />
              </div>
          </div>


          {qaMode&&<>
              <RecordButtons onClearTextArea={clearCode} hidePopup={props.hidePopup}/>
              <div className='test-title'>
                  <label>Describe Title:</label>
                  <input value={describeTitle} onChange={e=>setDescribeTitle(e.target.value)}/>
              </div>
              <CodeArea code ={codeArea}describeTitle={describeTitle} setCodeAreaValue={(value) => updateCode(value)}/>
          </>}
          <a href={emailText} className="send-button">Send To QA Team</a>




    </div>)
}
