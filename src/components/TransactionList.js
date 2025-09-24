import { Table, Button } from 'react-bootstrap';
import api from '../api/api';

export default function TransactionList({
  transactions,
  setTransactions,
  setEditingTransaction,
}) {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;

    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      alert('Failed to delete transaction');
    }
  };

  return (
    <div className="bg-white p-3 shadow-sm rounded">
      <h5 className="mb-3">Transactions</h5>
      {transactions.length === 0 ? (
        <p className="text-muted">No transactions yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.date ? new Date(t.date).toLocaleDateString() : ''}</td>
                <td>{t.note}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => setEditingTransaction(t)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
