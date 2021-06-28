import React, {FC, useEffect, useState} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export const CodeArea: FC<any>  = ({codeAreaValue, setCodeAreaValue}) => {

    return <div className={'code-area-container'}>
        <div className="card">
            <h5>Code Area</h5>
            <InputTextarea value={codeAreaValue} onChange={(e) => setCodeAreaValue(e.target.value)} rows={5} cols={30} />
        </div>
    </div>
}
