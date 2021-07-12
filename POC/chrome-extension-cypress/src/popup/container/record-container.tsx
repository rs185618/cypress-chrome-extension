import React, {FC, useEffect, useState} from 'react';
import {RecordButtons} from "../components/record-buttons/record-buttons";
import {CodeArea} from "../components/code-area/code-area";
import './record-container.scss'
export const RecordContainer: FC<any>  = ({...props}) => {
    const [codeArea, setCodeArea] = useState('');
    const [describeTitle, setDescribeTitle] = useState('');


    useEffect(() => {
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode","itTitles",'testSuitIndex'], (items) => {
            if (items['generatedCode']) {
                setCodeArea(items['generatedCode'].join('\n'));
            }
        });
    }, [])

    useEffect(() => {
        chrome.storage.local.get(['generatedCode','testSuitIndex'],(items)=>{
            let generatedCode = items['generatedCode'];
            let index = items['testSuitIndex']
            generatedCode[index]=codeArea;
            chrome.storage.local.set({ "generatedCode": generatedCode }, function(){
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

    return <div className={'record-container'}>
        <RecordButtons onClearTextArea={clearCode} hidePopup={props.hidePopup}/>
        <div className='test-title'>
            <label>Describe Title:</label>
            <input value={describeTitle} onChange={e=>setDescribeTitle(e.target.value)}/>
        </div>
        <CodeArea code ={codeArea}describeTitle={describeTitle} setCodeAreaValue={(value) => updateCode(value)}/>


    </div>
}
