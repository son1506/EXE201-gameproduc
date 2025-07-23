export interface FakeTransaction {
  orderCode: string;
  amount: number;
  status: string;
  bankName: string;
  channelName: string;
  createdAt: string;
  description: string;
  id: string;
}

const FAKE_TRANSACTIONS_KEY = 'fake_transactions';

export const fakeTransactionUtils = {
  // Lấy tất cả fake transactions từ localStorage
  getFakeTransactions(): FakeTransaction[] {
    try {
      const stored = localStorage.getItem(FAKE_TRANSACTIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading fake transactions:', error);
      return [];
    }
  },

  // Thêm fake transaction mới
  addFakeTransaction(transaction: Omit<FakeTransaction, 'id' | 'createdAt'>): FakeTransaction {
    const newTransaction: FakeTransaction = {
      ...transaction,
      id: `fake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const existingTransactions = this.getFakeTransactions();
    const updatedTransactions = [newTransaction, ...existingTransactions];
    
    localStorage.setItem(FAKE_TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
    console.log('🎭 Added fake transaction:', newTransaction);
    
    return newTransaction;
  },

  // Xóa tất cả fake transactions (cho testing)
  clearFakeTransactions(): void {
    localStorage.removeItem(FAKE_TRANSACTIONS_KEY);
    console.log('🗑️ Cleared all fake transactions');
  },

  // Tạo fake transaction từ payment data
  createFakeTransactionFromPayment(paymentAmount: number): FakeTransaction {
    const banks = ['Vietcombank', 'Techcombank', 'BIDV', 'VietinBank', 'Agribank', 'MB Bank'];
    const channels = ['QR Code', 'Internet Banking', 'Mobile Banking', 'ATM', 'Bank Transfer'];
    
    return this.addFakeTransaction({
      orderCode: `ORD${Date.now()}`,
      amount: paymentAmount,
      status: 'PAID',
      bankName: banks[Math.floor(Math.random() * banks.length)],
      channelName: channels[Math.floor(Math.random() * channels.length)],
      description: 'Sweeties Dodging Merchandise Purchase'
    });
  }
};