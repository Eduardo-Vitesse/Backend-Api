const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngsController')
const IncidentController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const router = Router()

//Rotas de Login e Logout
router.post('/session', SessionController.create)

//Rotas da Ongs
//Rota de Listar as ongs
router.get('/ongs', OngController.indexe)

//Rota de Cadastrar uma Ong
router.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2),
    }),
}),OngController.create)

//Confirindo parametros vindo do Headers
router.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),ProfileController.index)

//Rotas dos Incidents
router.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.index)

router.post('/incidents', IncidentController.create)

//Rota de leletar Incidents
router.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
}),IncidentController.delete)


module.exports = router