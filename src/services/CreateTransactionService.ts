import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: RequestDTO): Transaction {

    if (type !== 'income' && type !== 'outcome'){
      throw Error('Tipo de transação inválida');
    }

    if (type === 'outcome'){
      const vBal = this.transactionsRepository.getBalance();
      if (value > vBal.total){
        throw Error('Saldo insuficiente');
      }
    }

    const transact = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transact;
  }
}

export default CreateTransactionService;
