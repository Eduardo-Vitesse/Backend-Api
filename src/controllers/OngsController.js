const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
    //Rota para listar Ongs
    async indexe(request,response){
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    },

    //Controller para criar Ongs
    async create(request, response){
        const { name,email,whatsapp,city,uf } = request.body
        const id = generateUniqueId()

        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf,
        })

        return response.json({ id })
    }
}