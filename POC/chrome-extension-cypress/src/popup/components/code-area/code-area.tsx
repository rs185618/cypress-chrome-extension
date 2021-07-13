import React, {FC, useEffect, useState} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export const CodeArea  = ({ setCodeAreaValue,describeTitle,code}) => {
    const [itTitles,setItTitles] = useState([]);
    const [numOfTests,setNumOfTests] = useState(0);
    const [codes,setCodes] = useState(['']);
    useEffect(()=>{
        chrome.storage.local.get(["selector", "generatedCode","itTitles",'testSuitIndex'], (items) => {
            setItTitles(items['itTitles']);
            setNumOfTests(items['testSuitIndex']);
            setCodes(items['generatedCode']);
        });
    }, []);
    let testText = '';
    if(code!==''){
        for(let i = 0; i <= numOfTests;i++)
        {
            testText += `it('${itTitles[i]}',()=>{\n${codes[i]}\n});\n`
        }
    }

    return <div className={'code-area-container'}>
        <div className="card">
            <InputTextarea value={`describe('${describeTitle}',()=>{\n${testText}\n})`} onChange={(e) => setCodeAreaValue(e.target.value)} rows={15} cols={30} />
        </div>
    </div>
}
