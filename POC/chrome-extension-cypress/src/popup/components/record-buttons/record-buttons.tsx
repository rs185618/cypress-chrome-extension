import React, {FC, useEffect, useState} from 'react';
import { Button } from 'primereact/button';
export const RecordButtons: FC<any>  = ({...props}) => {
    const [recordValue, setRecordValue] = useState('stop')

    useEffect(() => {
        chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            console.log(items);
            if (items && items['recorder']) setRecordValue(items['recorder'])
        });
    }, [])
    useEffect(() => {
            chrome.storage.local.get(/* String or Array */["popup"], (items) => {
                if (recordValue === 'start' && items && items['popup']) {
                    chrome.storage.local.set({ "popup": false } , function() {
                        debugger
                        window.close()
                    })
                }
            });

        // return () => {
        //     chrome.storage.local.set({ "recorder": 'stop' });
        // }
    }, [recordValue])

    const record = () => {
        chrome.storage.local.set({ "recorder": `${recordValue == 'stop' ?  'start': 'stop'}` }, function(){
            chrome.storage.local.set({ "popup": `${ (recordValue === 'start')}` } , function() {

                chrome.tabs.query({active: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id,{ menu: 'started' });

                })
                setRecordValue(`${recordValue == 'stop' ?  'start': 'stop'}`)
            })
        });
    }



    return <div className={'record-buttons-container'}>
        <Button label={`${recordValue === 'stop' ? 'Start' : 'Stop'} Record`} onClick={record} />
        <Button label="Clear" onClick={props.onClearTextArea} />

    </div>
}
