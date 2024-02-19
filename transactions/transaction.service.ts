import { PrismaClient, TransactionCategory } from '@prisma/client';

const prisma = new PrismaClient();

interface Transaction {
    id: number;
    category: string;
    price: number; 
    date: Date; 
}

class TransactionService {
    static async addTransaction(
        userId: number,
        category: 'Entertainment' | 'Groceries' | 'Bills' | 'Transportation' | 
        'Utilities' | 'Food' | 'Health' | 'Clothing' | 'Travel' | 'Miscellaneous',
        price: number,
        name?: string,
        description?: string,
    ){  
        const date = new Date();
        date.setDate(date.getDate());

        const transactionData: {
            userId: number;
            category: typeof category;
            price: number;
            date: Date;
            name?: string;
            description?: string;
        } = {
            userId,
            category,
            price,   
            date,
        };

        if (name !== undefined) {
            transactionData.name = name;
        }

        if (description !== undefined) {
            transactionData.description = description;
        }

        const transaction = await prisma.transaction.create({
            data: transactionData,
        });

        return { transaction };
    }

    static async fetchTransactions(userId: number) {
        const  transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' }
        });

        return { transactions };
    }

    static async deleteTransaction(id: number) {
        const deletedTransaction = await prisma.transaction.delete({
            where: { id },
        });

        return  deletedTransaction;
    }

    static async fetchTransactionsForMonth(
      userId: number,
      month: number,
    ): Promise<{ transactions: Transaction[] }> {
      try {
        const year = new Date().getFullYear();
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
  
        const transactions = await prisma.transaction.findMany({
          where: {
            userId,
            AND: [
              { date: { gte: startDate } },
              { date: { lt: endDate } },
            ],
          },
          select: {
            id: true,
            category: true,
            price: true,
            date: true,
          },
        });
  
        return { transactions };
      } catch (error) {
        console.error('Error fetching transactions for month:', error);
        throw error;
      }
    }

	static async getTransactionsCategory(userId: number, month: number) {
		const year = new Date().getFullYear();
		const transactions = await prisma.transaction.findMany({
		where: {
			userId,
				AND: [
				{ date: { gte: new Date(year, month - 1, 1) } },
				{ date: { lt: new Date(year, month, 0)} }
				]
		  	}
		});
	  
		const categoryAmounts: Record<TransactionCategory, { amount: number }> = {
			Entertainment: { amount: 0 },
			Groceries: { amount: 0 },
			Bills: { amount: 0 },
			Transportation: { amount: 0 },
			Utilities: { amount: 0 },
			Food: { amount: 0 },
			Health: { amount: 0 },
			Clothing: { amount: 0 },
			Travel: { amount: 0 },
			Miscellaneous: { amount: 0 }
		};
	
		transactions.forEach(transaction => {
			const { category, price } = transaction;
			categoryAmounts[category].amount += price;
		});
	
		const result = Object.entries(categoryAmounts)
			.filter(([category, { amount }]) => amount !== 0)
			.map(([category, { amount }]) => ({
				category,
				amount
			})
		);

	  return result;
	  
	}
}
export default TransactionService;