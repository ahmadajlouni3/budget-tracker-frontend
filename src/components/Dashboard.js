import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import api from '../api/api';

// Recharts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });

  // Fetch transactions on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data);
        calculateSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  // Recalculate summary when transactions change
  useEffect(() => {
    calculateSummary(transactions);
  }, [transactions]);

  const calculateSummary = (data) => {
    let income = 0;
    let expense = 0;
    data.forEach((t) => {
      if (t.type === 'income') income += Number(t.amount);
      else expense += Number(t.amount);
    });
    const balance = income - expense;
    setSummary({ income, expense, balance });
  };

  // Group by category for the chart
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 };
      acc[t.category].value += Number(t.amount);
      return acc;
    }, {})
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#2E7D32'];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        {/* Left column: form */}
        <Col md={6}>
          <TransactionForm
            transactions={transactions}
            setTransactions={setTransactions}
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />
        </Col>

        {/* Right column: summary + chart */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body className="text-center">
              <h5 className="mb-3">Summary</h5>
              <Row>
                <Col>
                  <h6>Income</h6>
                  <p className="text-success fw-bold">${summary.income}</p>
                </Col>
                <Col>
                  <h6>Expense</h6>
                  <p className="text-danger fw-bold">${summary.expense}</p>
                </Col>
                <Col>
                  <h6>Balance</h6>
                  <p className="text-primary fw-bold">${summary.balance}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="text-center mb-3">Transactions by Category</h5>
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Transaction List */}
      <Row>
        <Col>
          <TransactionList
            transactions={transactions}
            setTransactions={setTransactions}
            setEditingTransaction={setEditingTransaction}
          />
        </Col>
      </Row>
    </Container>
  );
}
