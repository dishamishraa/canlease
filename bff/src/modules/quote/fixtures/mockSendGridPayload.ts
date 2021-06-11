import { SendQuote } from '../types';

const payload: SendQuote = {
  from: {
    email: 'orders@example.com',
    name: 'Example Order Confirmation',
  },
  template_id: '[template_id]',
  personalizations: [{
    to: [
      {
        email: 'john_doe@example.com',
        name: 'John Doe',
      },
    ],
    subject: 'Your Example Order Confirmation',
  }],
};

export default payload;
