import React, {FC, useEffect, useState} from 'react';
import {RecordButtons} from "../components/record-buttons/record-buttons";
import {CodeArea} from "../components/code-area/code-area";
import './record-container.scss'
export const RecordContainer: FC<any>  = ({...props}) => {
    const [codeArea, setCodeArea] = useState('');

    useEffect(() => {
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode"], (items) => {
            if (items['generatedCode']) {
                setCodeArea(items['generatedCode'])
            }
        });
    }, [])

    useEffect(() => {
        chrome.storage.local.set({ "generatedCode": codeArea }, function(){
            //  Data's been saved boys and girls, go on home
        });
    }, [codeArea])

    const updateCode = (value) => {
        setCodeArea(value)
    }

    const clearCode = () => {
        chrome.storage.local.set({ "generatedCode": '' }, function(){
            setCodeArea('')
        });
    }

    return <div className={'record-container'}>
        <RecordButtons onClearTextArea={clearCode} hidePopup={props.hidePopup}/>
        <CodeArea codeAreaValue={codeArea} setCodeAreaValue={(value) => updateCode(value)}/>
    </div>
}
