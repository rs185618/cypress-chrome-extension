// Listen to messages sent from other parts of the extension.
import * as recordUserActivity from './recordUserActivity';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
    }
    return isResponseAsync;
});