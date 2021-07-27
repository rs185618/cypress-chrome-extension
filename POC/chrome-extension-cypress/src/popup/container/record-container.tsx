import React, {FC, useEffect, useState} from 'react';
import {RecordButtons} from "../components/record-buttons/record-buttons";
import {CodeArea} from "../components/code-area/code-area";
import './record-container.scss'
import {Button} from "primereact/button";

export const RecordContainer: FC<any> = ({...props}) => {
  const [codeArea, setCodeArea] = useState('');
  const [describeTitle, setDescribeTitle] = useState('');
  const [qaMode, setQaMode] = useState(false);
  const [url, setURL] = useState('');


  useEffect(() => {
    chrome.storage.local.get(/* String or Array */["selector", "generatedCode", "itTitles", 'testSuitIndex',"qaMode", "URLToTest"], (items) => {
      if (items['generatedCode']) {
        setCodeArea(items['generatedCode'].join('\n'));
      }
      if (items["qaMode"]) {
        setQaMode(items["qaMode"]);
      }
      if (items["URLToTest"]) {
        setURL(items["URLToTest"]);
      }
    });
  }, [setCodeArea,setQaMode,setURL]);

  useEffect(() => {
    chrome.storage.local.get(['generatedCode', 'testSuitIndex', 'itTitles'], (items) => {
      let generatedCode = items['generatedCode'];
      let index = items['testSuitIndex'];
      generatedCode[index] = codeArea;
      chrome.storage.local.set({
        "generatedCode": generatedCode,
        "testSuitIndex": index,
        'itTitles': items['itTitles']
      }, function () {
        //  Data's been saved boys and girls, go on home
      });
    })

  }, [codeArea])

  const updateCode = (value) => {
    setCodeArea(value)
  }

  const clearCode = () => {
    chrome.storage.local.set({"generatedCode": [], "testSuitIndex": 0, itTitles: ['']}, function () {
      setCodeArea('')
    });
  }
  const onBlurURL = e => {
    chrome.storage.local.set({"URLToTest": e.target.value});
  }
  const changeMode = e => {
    setQaMode(() => !qaMode);
    chrome.storage.local.set({"qaMode": !qaMode});
  }

  return (
    <div className={'record-container'}>
      <div className="toggle-container">
        <h1>QA/DEV</h1>
        <label className="switch">
          <input type="checkbox" checked={qaMode} onChange={changeMode}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="input-container">
        <div className="container">
        </div>
        <div className="container">
          <label htmlFor="url">URL:</label>
          <input id="url"
                 value={url}
                 onChange={(e) => setURL(e.target.value)}
                 onBlur={onBlurURL}
          />
        </div>
      </div>


      <div className={qaMode?"animated-container":"invisible-container"}>
        <RecordButtons onClearTextArea={clearCode} hidePopup={props.hidePopup}/>
        <div className='test-title'>
          <label>Describe Title:</label>
          <input value={describeTitle} onChange={e => setDescribeTitle(e.target.value)}/>
        </div>
        <CodeArea code={codeArea} describeTitle={describeTitle} setCodeAreaValue={(value) => updateCode(value)}/>
      </div>
        {!qaMode && <Button>Copy code</Button>}


    </div>)
}
