
const isvalidURL = (url) => {
    try {
        url = new URL(url);
        return true
    } catch (error) {
        return false
    }
}   

export default isvalidURL;