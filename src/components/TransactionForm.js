import { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import api from '../api/api';

export default function TransactionForm({
  transactions,
  setTransactions,
  editingTransaction,
  setEditingTransaction,
}) {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date?.slice(0, 10)); // format for input[type=date]
      setNote(editingTransaction.note);
    } else {
      setType('income');
      setAmount('');
      setCategory('');
      setDate('');
      setNote('');
    }
  }, [editingTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = { type, amount: Number(amount), category, date, note };

    try {
      if (editingTransaction) {
        // Update transaction

        const res = await api.put(`/transactions/${editingTransaction.id}`, payload);
        setTransactions(
          transactions.map((t) => (t.id === res.data.id ? res.data : t))
        );
        setEditingTransaction(null);
      } else {
        // Add new transaction
        const res = await api.post('/transactions', payload);
        setTransactions([res.data, ...transactions]);
      }

      // Reset form
      setType('income');
      setAmount('');
      setCategory('');
      setDate('');
      setNote('');
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
    }
  };

  return (
    <Card className="p-3 shadow-sm mb-4 bg-white">
      <h5 className="mb-3">{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Type</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            placeholder="Optional note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-2">
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </Form>
    </Card>
  );
}
