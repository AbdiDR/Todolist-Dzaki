// controllers/TodoController.js
const { db } = require('../firebase'); // Adjust the path as needed

class TodoController {
  static async getItems(req, res) {
    try {
      const snapshot = await db.collection('todos').get();
      const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).send('Error getting todos: ' + error.message);
    }
  }

  static async createItem(req, res) {
    try {
      const newTodo = req.body;
      if (!newTodo) {
        res.status(401).json({
          message: "Deskripsi Todo masih kosong!",
        });
      }
      const docRef = await db.collection('todos').add(newTodo);
      res.status(201).json({ id: docRef.id, ...newTodo });
    } catch (error) {
      res.status(500).send('Error creating todo: ' + error.message);
    }
  }

  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const updatedTodo = req.body;
    
      if (!updatedTodo) {
        res.status(401).json({
          message: "Deskripsi update Todo masih kosong!",
        });
      }

      const docRef = db.collection('todos').doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        res.status(404).send('Todo not found');
      }

      await docRef.set(updatedTodo, { merge: true });
      res.status(200).json({ id, ...updatedTodo });
    } catch (error) {
      res.status(500).send('Error updating todo: ' + error.message);
    }
  }

  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const docRef = db.collection('todos').doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        res.status(404).send('Todo not found');
      }

      await docRef.delete();
      res.status(200).send('Todo deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting todo: ' + error.message);
    }
  }
}

module.exports = TodoController;
