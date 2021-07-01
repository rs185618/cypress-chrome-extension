import React, {FC, useEffect, useState} from 'react';
import { Button } from 'primereact/button';
import {selectorPicker}  from '../../../selectorPicker'
import {makeLogger} from "ts-loader/dist/types/logger";
export const RecordButtons: FC<any>  = ({...props}) => {
    const [recordValue, setRecordValue] = useState(false)

    useEffect(() => {
        if (recordValue) { // stop
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, function: selectorPicker } ).then();
            });

            // chrome.webRequest.onCompleted.addListener(function (details) {
            //     // Process the XHR response.
            //
            //     chrome.debugger.attach(target=> {
            //         //console.log('params', params)
            //         console.log('source', ...target);
            //        // console.log('method', method)
            //     }, {} );
            //     console.log(details)
            //
            //
            // }, {urls: ['<all_urls>']});


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
