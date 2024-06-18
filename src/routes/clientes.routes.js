import express from 'express';
import pool from '../database.js';

const router = express.Router();

router.get('/add', (req, res) => {
    res.render('clientes/add');
});

router.post('/add', async(req, res) => {
    try{
        const {nomcli, apecli, nrodnicli, telcli} = req.body;
        const newCliente = {
            nomcli, apecli, nrodnicli, telcli
        }
        await pool.query('INSERT INTO clientes SET ?', [newCliente]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        const clienteEdit = cliente[0];
        res.render('cliente/edit', {cliente: clienteEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {nomcli, apecli, nrodnicli, telcli} = req.body;
        const {id} = req.params;
        const editCliente = {nomcli, apecli, nrodnicli, telcli};
        await pool.query('UPDATE clientes SET ? WHERE id = ?', [editcCliente, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});
export default router;.
