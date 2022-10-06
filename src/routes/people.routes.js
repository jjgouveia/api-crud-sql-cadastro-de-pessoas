import express from 'express';
import { getAllPeople, getPeopleById, insert, remove, update } from '../../db/peopleDB.js'
import morgan from 'morgan';


const router = express.Router();
router.use(morgan('dev'));

router.get('/', async (_req, res) => {
    try {
        const [ result ] = await getAllPeople();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Não foi possível exibir a lista :('
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [[result]] = await getPeopleById(id);
        
        if(result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message: 'Pessoa não encontrada!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'An error has occurred :('
        })
    }
});

router.post('/', async (req, res) => {
    const person = req.body;
    try {
        const [result] = await insert(person);
        res.status(201).json({  message: `Pessoa cadastrada com sucesso com o id ${result.insertId}` });
    } catch (error) {
        res.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' });
  }
    }
);

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const person = req.body;
      const [result] = await update(person, id);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: `Pessoa de id ${id} atualizada com sucesso` });
      } else {
        res.status(404).json({ message: 'Pessoa não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ message: err.sqlMessage });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await remove(id);

        if(result.affectedRows > 0) {
        res.status(200).json({
            message: `Pessoa de id ${id} excluída com sucesso`
        });
    } else {
        res.status(404).json({
            message: `Pessoa não encontrada!`
        });
    }
    } catch (error) {
        res.status(500).json({
            message: error.sqlMessage
        });
    }    
  });


export default router;