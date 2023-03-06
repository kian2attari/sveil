// Other video: https://www.youtube.com/watch?v=gwktlvFHLMA

// import { events } from '$db/events'
// import type { PageServerLoad } from '$types/page'


// export const load: PageServerLoad = async function () {
//     const data = await events.find({}, {limit: 50, projection: {
//         _id: 0,
//     }}).toArray()

//     return {
//         events: data
//     }
// }



// This is probably what we want to use: https://www.youtube.com/watch?v=E9J2VXd-bzE
// import type { Actions } from './$types'
// import { prisma } from '$server/prisma'

// export const actions: Actions = {
//     createEvent: async ({ request }) => {
//         const { events }
//         const { name, description, date } = body

//         const event = {
//             name,
//             description,
//             date,
//             id: Math.random().toString()
//         }

//         // await events.insertOne(event)

//         return {
//             status: 201,
//             body: event
//         }
//     }