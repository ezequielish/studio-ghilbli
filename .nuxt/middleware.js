const middleware = {}

middleware['redirectRoute'] = require('../src/middleware/redirectRoute.js')
middleware['redirectRoute'] = middleware['redirectRoute'].default || middleware['redirectRoute']

export default middleware
