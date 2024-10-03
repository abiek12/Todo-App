export interface ITodo {
    _id: string;
    description: string;
    status: 'pending' | 'completed';
    createdAt: Date;
    updatedAt: Date;
  }
  