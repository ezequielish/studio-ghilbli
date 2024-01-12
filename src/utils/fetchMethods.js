const ERROR_DEFAULT = "Something went wrong, please try again later"

function ApiFetch() {

    const handleError = (error, data = {}) => {
        if (error == 403) {
            throw Object.hasOwn(data, "message") ? data.message : "Unauthorized"
        }
        if (error == 400) {
            throw Object.hasOwn(data, "message") ? data.message : ERROR_DEFAULT
        }

        if (error == 404) {
            throw "Not Found"
        }
        if (Object.hasOwn(data, "message") && data.error) {
            throw data.message
        }
    }


    async function get(url) {

        const result = await fetch(url).catch(err => {
            throw err.message
        });

        handleError(result.status, result)
        const data = await result.json()

        return data

    }
    async function send(url, config) {


        let result = await fetch(url, config).catch(err => {
            throw err.message
        });

        const data = await result.json()
        handleError(result.status, data)

        return data?.data || data
    }


    return {
        get,
        send
    }
}

export default ApiFetch;