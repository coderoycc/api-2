import {Router} from 'express'

const router = Router()

router.get('/digital/:ci',(req,res)=>{ // Mostrar uno

})

router.get('/digital', (req,res)=>{ // mostrar todos

})

router.post('/digital/:ci', (req,res)=>{ // Agregar

})

router.put('/digital/:ci', (req,res)=>{ // Editar

})

router.delete('/digital/:ci', (req,res)=>{

})

export default router 
// DEFAULT Permite que se pueda nombrar de cualquier manera en la importación