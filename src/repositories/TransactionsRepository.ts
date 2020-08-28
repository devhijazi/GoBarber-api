import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RquestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (bagpack, transaction) => {
        if (transaction.type === 'income') {
          bagpack.income += transaction.value;
        } else {
          bagpack.outcome += transaction.value;
        }
        return bagpack;
      },
      {
        income: 0,
        outcome: 0,
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: RquestDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;