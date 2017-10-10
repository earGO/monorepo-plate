const initialState = {

}

export default (app = initialState, action) => {
    //eslint-disable-next-line
    const { type, payload } = action

    switch (type) {

      default:
        return app
    }
}
