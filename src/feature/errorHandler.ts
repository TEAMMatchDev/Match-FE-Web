export const errorHandler = ({res, error}: { res: any, error: any }) => {
    if (error.response) {
        res.status(error.response.status).send({
            error: error.response.data,
            errorMsg: error.message
        })
    } else {
        res.status(500).send({ errorMsg: error.message })
    }
}