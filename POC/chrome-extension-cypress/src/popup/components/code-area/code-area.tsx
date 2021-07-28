import React, {FC, useEffect, useState} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export const CodeArea  = ({ setCodeAreaValue,describeTitle,code}) => {
    const [itTitles,setItTitles] = useState([]);
    const [numOfTests,setNumOfTests] = useState(0);
    const [codes,setCodes] = useState(['']);
    const [URL,setURL] = useState('');
    const [vw,setVW] = useState(0);
    const [vh,setVH] = useState(0);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        setURL(tabs[0].url.replace(/^(?:\/\/|[^\/]+)*\//, ""));
        setVW(tabs[0].width);
        setVH(tabs[0].height);
    });
    useEffect(()=>{
        chrome.storage.local.get(["selector", "generatedCode","itTitles",'testSuitIndex'], (items) => {
            setItTitles(items['itTitles'] ? items['itTitles']:[]);
            setNumOfTests(items['testSuitIndex']);
            setCodes(items['generatedCode'] ? items['generatedCode']:[]);
        });
    }, []);
    let testText = '';
    if(code!==''){
        for(let i = 0; i <= numOfTests;i++)
        {
            testText += `it('${itTitles[i]}',()=>{\ncy.visit("${URL}")\ncy.viewport(${vw},${vh})\n${codes[i]}\n});\n`
        }
    }

    return <div className={'code-area-container'}>
        <div className="card">
            <InputTextarea value={`describe('${describeTitle}',()=>{\n${testText}\n})`} onChange={(e) => setCodeAreaValue(e.target.value)} rows={15} cols={30} />
        </div>
    </div>
}
