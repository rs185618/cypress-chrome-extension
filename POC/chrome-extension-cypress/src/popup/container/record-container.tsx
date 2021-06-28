import React, {FC, useState} from 'react';
import {RecordButtons} from "../components/record-buttons/record-buttons";
import {CodeArea} from "../components/code-area/code-area";
import './record-container.scss'
export const RecordContainer: FC<any>  = ({}) => {
    const [codeArea, setCodeArea] = useState('');

    return <div className={'record-container'}>
        <RecordButtons onClearTextArea={() => setCodeArea('')}/>
        <CodeArea codeAreaValue={codeArea} setCodeAreaValue={(value) => setCodeArea(value)}/>
    </div>
}
