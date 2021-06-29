import React, {FC, useEffect, useState} from 'react';
import { Button } from 'primereact/button';
import {selectorPicker}  from '../../../selectorPicker'
export const RecordButtons: FC<any>  = ({...props}) => {
    const [recordValue, setRecordValue] = useState(false)

    useEffect(() => {
        if (recordValue) { // stop

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { code:  selectorPicker(tabs[0])});
            });
        } else { // start

        }
    }, [recordValue])

    const record = () => {
        setRecordValue(!recordValue)
    }



    return <div className={'record-buttons-container'}>
        <Button label={`${recordValue ? 'Stop' : 'Start'} Record`} onClick={record} />
        <Button label="Clear" onClick={props.onClearTextArea} />

    </div>
}
