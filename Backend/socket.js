import User from "./models/user.model.js"

export const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('user connected', socket.id)

        socket.on('identity', async ({ userId }) => {
            try {
                const user = await User.findByIdAndUpdate(userId, { socketId: socket.id, isOnline: true }, { returnDocument: 'after' })
                console.log('user identity', user)
            } catch (error) {
                console.log(error)
            }
        })



        socket.on('updatedLocation', async ({ latitude, longitude, userId }) => {
            try {
                const user = await User.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    isOnline: true,
                    socketId: socket.id
                }, { returnDocument: 'after' })

                if (user) {
                    io.emit('updatedDeliveryLocation', {
                        deliveryBoyId: userId,
                        latitude,
                        longitude,
                    })
                }
            } catch (error) {
                console.log(error)
            }
        })



        socket.on('disconnect', async () => {
            try {
                const user = await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null, isOnline: false })
                console.log('user disconnected', user)
            } catch (error) {
                console.log(error)
            }
        })
    })
}