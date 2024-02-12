import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Transaction {
    id: number;
    category: string;
    price: number; 
    date: Date; 
}

interface Week {
    startDate: Date;
    endDate: Date | null;
    transactions: Transaction[];
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
        date.setDate(date.getDate() + 10);

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
            where: { userId }
        });

        return { transactions };
    }

    static async deleteTransaction(id: number) {
        const deletedTransaction = await prisma.transaction.delete({
            where: { id }
        });

        return  deletedTransaction;
    }

    static async fetchTransactionsForMonth(userId: number, month: number) {

      console.log(month, userId);

      try {
          const year = new Date().getFullYear();
          const startDate = new Date(2024, month - 1, 1);
          const endDate = new Date(2024, month, 0);

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
                  date: true
              },
          });
  
          return { transactions };
      } catch (error) {
          console.error('Error fetching transactions for month:', error);
          throw error; // Rethrow the error to propagate it to the caller
      }
  }

    static async fetchTransactionFotMonthByWeek(userId: number, month: number, weekStartDay = 0) {
        const year = new Date().getFullYear();
    
        const transactions = await prisma.transaction.findMany({
          where: {
            userId,
            date: {
              gte: new Date(year, month, 1),
              lt: new Date(year, month + 1, 1),
            },
          },
          select: {
            id: true,
            category: true,
            price: true,
            date: true,
          },
        });
    
        const weeks = groupTransactionsByWeeks(transactions, month, year, weekStartDay);
    
        return { weeks };
    }
}

function groupTransactionsByWeeks(
    transactions: Transaction[],
    month: number,
    year: number,
    weekStartDay = 0
  ): Week[] {
    // Calculate number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Create an array to store weeks, including potential partial weeks
    const weeks: Week[] = [];
  
    // Loop through each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month , day);
      const dayOfWeek = date.getDay(); // 0-6 (Sunday-Saturday)
  
      // Calculate the adjusted day of week and week index
      const dayOfWeekAdjusted = (dayOfWeek + 0) % 7; // Set weekStartDay to 0
      const weekIndex = Math.floor(day / 7 + dayOfWeekAdjusted / 7);
  
      // If the current day marks the start of a new week:
      if (!weeks[weekIndex] || day === 1  && dayOfWeekAdjusted !== 0 ) { // Adjusted condition
        // Create a new week object
        weeks[weekIndex] = {
          startDate: date,
          endDate: null,
          transactions: [],
        };
      }
  
      // Update the end date of the current week:
      const currentWeek = weeks[weekIndex];
      if (currentWeek.endDate === null || day - currentWeek.startDate.getDate() === 6) {
        // End date can be calculated (new week or 7 days passed)
        const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        // Handle end of month case
        if (endDate.getDate() > daysInMonth) {
          endDate.setDate(daysInMonth);
        }
        currentWeek.endDate = endDate;
      }
  
      // Find transactions for this day and add them to the week
      const dayTransactions = transactions.filter(
        (transaction: Transaction) => (transaction.date.getDate() + 1) === day
      );
      weeks[weekIndex].transactions.push(...dayTransactions);
    }
  
    return weeks;
  }

export default TransactionService;