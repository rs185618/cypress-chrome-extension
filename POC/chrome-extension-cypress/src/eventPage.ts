// Listen to messages sent from other parts of the extension.
import * as recordUserActivity from './recordUserActivity';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;
    const USER_ACTIVITIES_STORAGE_KEY = 'USER_ACTIVITIES';

    switch (true){
        case request.sendEmailTo:
            chrome.storage.local.get([USER_ACTIVITIES_STORAGE_KEY], (result) => {
                const href = `mailto:${request.sendEmailTo}?body=${result[USER_ACTIVITIES_STORAGE_KEY]}&subject=Reproduction steps`
            });
            break;
        case request.modeChanged:
            if(request.modeChanged){
                recordUserActivity.addListeners();
            }else{
                recordUserActivity.removeListeners();
            }
            break;
    }

    if (request.popupMounted) {
    }
    return isResponseAsync;
});