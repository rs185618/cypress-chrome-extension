import React, {FC, useEffect, useState} from 'react';
import { Button } from 'primereact/button';
export const RecordButtons: FC<any>  = ({...props}) => {
    const [recordValue, setRecordValue] = useState('stop')

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            // onMessage must return "true" if response is async.
            let isResponseAsync = false;

            return isResponseAsync;
        });
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            if(changes.refresh){
                setRecordValue('stop');
            }
            chrome.storage.local.set({ "refresh":  false});
        });
        chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            if (items && items['recorder']) setRecordValue(items['recorder'])
        });

    }, [])
    useEffect(() => {
            chrome.storage.local.get(/* String or Array */["popup"], (items) => {
                if (recordValue === 'start' && items && items['popup']) {
                    chrome.storage.local.set({ "popup": false } , function() {
                        window.close()
                    })
                }
            });
    }, [recordValue])

    const record = () => {
        chrome.storage.local.get(['testSuitIndex'],(items)=>{
            chrome.storage.local.set({ "recorder": `${recordValue == 'stop' ?  'start': 'stop'}` }, function(){
                chrome.storage.local.set({ "popup": `${ (recordValue === 'start')}` } , function() {
                    chrome.tabs.query({active: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id,{ menu:recordValue == 'stop'? 'started' :'stopped' });

                    });
                    setRecordValue(`${recordValue == 'stop' ?  'start': 'stop'}`);

                })
            });
        })

    }



    return <div className={'record-buttons-container'}>
        <Button label={`${recordValue === 'stop' ? 'Start' : 'Stop'} Record`} onClick={record} />
        <Button label="Clear" onClick={props.onClearTextArea} />

    </div>
}
