export const formatDate = (dateString) => {
    let date = new Date(dateString);
    let dateStr = date.toDateString().slice(4);
    return dateStr.slice(0, 3) + ',' + dateStr.slice(3);
};

export const timeSinceUpload = (dateString) => {
    let uploadDate = new Date(dateString);
    let presentDate = new Date;
    let returnString = '';
    let num = 0;
    if ((presentDate.getFullYear() - uploadDate.getFullYear()) > 0) {
        num = (presentDate.getFullYear() - uploadDate.getFullYear());
        returnString = `${num} year`;
    } else if ((presentDate.getMonth() - uploadDate.getMonth()) > 0) {
        num = (presentDate.getMonth() - uploadDate.getMonth())
        returnString = `${num} month`;
    } else if ((presentDate.getDate() - uploadDate.getDate()) > 0) {
        num = (presentDate.getDate() - uploadDate.getDate())
        returnString = `${num} day`;
    } else if ((presentDate.getHours() - uploadDate.getHours()) > 0) {
        num = (presentDate.getHours() - uploadDate.getHours())
        returnString = `${num} hour`;
    } else if ((presentDate.getMinutes() - uploadDate.getMinutes()) > 0) {
        num = (presentDate.getMinutes() - uploadDate.getMinutes())
        returnString = `${num} minute`;
    } else {
        num = (presentDate.getSeconds() - uploadDate.getSeconds())
        returnString = `${num} second`;
    }

    if (num === 1) {
        return returnString + " ago";
    } else {
        return returnString + "s ago";
    }
};