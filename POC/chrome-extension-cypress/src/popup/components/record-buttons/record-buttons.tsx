import React, {FC, useEffect, useState} from 'react';
import { Button } from 'primereact/button';
export const RecordButtons: FC<any>  = ({...props}) => {
    const [recordValue, setRecordValue] = useState('stop')

    useEffect(() => {
        chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            if (items && items['recorder']) setRecordValue(items['recorder'])
        });
    }, [])
    useEffect(() => {
        if (recordValue === 'start') { // stop

        } else { // start

        }
    }, [recordValue])

    const record = () => {
        chrome.storage.local.set({ "recorder": `${recordValue == 'stop' ?  'start': 'stop'}` }, function(){
            setRecordValue(`${recordValue == 'stop' ?  'start': 'stop'}`)
            chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            });
        });
    }



    return <div className={'record-buttons-container'}>
        <Button label={`${recordValue === 'stop' ? 'Start' : 'Stop'} Record`} onClick={record} />
        <Button label="Clear" onClick={props.onClearTextArea} />

    </div>
}
