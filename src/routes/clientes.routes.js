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
export default router;
