import React, {FC, useEffect, useState} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export const CodeArea  = ({codeAreaValue, setCodeAreaValue}) => {
    return <div className={'code-area-container'}>
        <div className="card">
            <InputTextarea value={codeAreaValue} onChange={(e) => setCodeAreaValue(e.target.value)} rows={15} cols={30} />
        </div>
    </div>
}
