import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransacDTO{
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
    const income = this.transactions.reduce((acum, valorAtual) => {

      if (valorAtual.type === 'income'){
        return acum + valorAtual.value;
      }else{
        return acum;
      }
    }, 0);

    const outcome = this.transactions.reduce((acum, valorAtual) => {

      if (valorAtual.type === 'outcome'){
        return acum + valorAtual.value;
      }else{
        return acum;
      }
    }, 0);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: TransacDTO): Transaction {
    const transact = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transact);

    return transact;
  }
}

export default TransactionsRepository;
