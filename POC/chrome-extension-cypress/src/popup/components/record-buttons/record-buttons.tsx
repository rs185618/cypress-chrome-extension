import React, {FC, useEffect, useState} from 'react';
import { Button } from 'primereact/button';
export const RecordButtons: FC<any>  = ({...props}) => {
    const [recordValue, setRecordValue] = useState(false)

    useEffect(() => {
        if (recordValue) { // stop

        } else { // start

        }
        // return () => {
        //     chrome.storage.local.set({ "recorder": 'stop' });
        // }
    }, [recordValue])

    const record = () => {
        chrome.storage.local.set({ "recorder": `${recordValue  ?  'stop': 'start'}` }, function(){
            setRecordValue(!recordValue)
        });
    }




    return <div className={'record-buttons-container'}>
        <Button label={`${recordValue ? 'Stop' : 'Start'} Record`} onClick={record} />
        <Button label="Clear" onClick={props.onClearTextArea} />

    </div>
}
