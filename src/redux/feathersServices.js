import { feathers } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'

const app = feathers()

// Connect to a different URL
const restClient = rest('http://localhost:3333')

// Configure an AJAX library (see below) with that client
app.configure(restClient.fetch(window.fetch.bind(window)))

export const curriculaService = app.service('curricula')
// export const feedbackService = app.service('feedback')
// export const groupService = app.service('feedback')
// export const lecturesService = app.service('feedback')
// export const studentsService = app.service('feedback')
export default app
