import React, {FC, useEffect} from 'react';
import { Button } from 'primereact/button';

export const RecordButtons: FC<any>  = ({...props}) => {
    useEffect(() => {

    }, [])

    const record = () => {

    }



    return <div className={'record-buttons-container'}>
        <Button label="Start Record" onClick={record} />
        <Button label="Clear" onClick={props.onClearTextArea} />

    </div>
}
