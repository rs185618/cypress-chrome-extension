import React, {FC, useEffect, useState} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export const CodeArea  = ({ setCodeAreaValue,describeTitle,code}) => {
    const [itTitles,setItTitles] = useState([]);
    const [numOfTests,setNumOfTests] = useState(0);
    const [codes,setCodes] = useState(['']);
    const [URL,setURL] = useState('');
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        setURL(tabs[0].url.replace(/^(?:\/\/|[^\/]+)*\//, ""));
    });
    useEffect(()=>{
        chrome.storage.local.get(["selector", "generatedCode","itTitles",'testSuitIndex'], (items) => {
            setItTitles(items['itTitles']);
            setNumOfTests(items['testSuitIndex']);
            setCodes(items['generatedCode']);
        });
    }, []);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    let testText = '';
    if(code!==''){
        for(let i = 0; i <= numOfTests;i++)
        {
            testText += `it('${itTitles[i]}',()=>{\ncy.visit(${URL})\ncy.viewport(${vw},${vh})\n${codes[i]}\n});\n`
        }
    }

    return <div className={'code-area-container'}>
        <div className="card">
            <InputTextarea value={`describe('${describeTitle}',()=>{\n${testText}\n})`} onChange={(e) => setCodeAreaValue(e.target.value)} rows={15} cols={30} />
        </div>
    </div>
}
