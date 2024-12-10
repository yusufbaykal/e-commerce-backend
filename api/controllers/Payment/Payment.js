const expres = require('express');
const router = expres.Router();
const Payment = require('../../db/models/Payment');
const Response = require('../../lib/Response');

const PaymentAdd = async (req, res) => {
  let body = req.body;
  try {
    const PaymentCreated = await Payment.create({
      user_id: body.user_id,
      order_id: body.order_id,
      amount: body.amount,
      currency: body.currency,
      status: body.status,
      payment_method: body.payment_method,
      transaction_id: body.transaction_id,
      refund: {
        status: body.refund.status,
        refund_amount: body.refund.refund_amount,
        refund_date: body.refund.refund_date,
      },
    });

    res.status(201).json({ status: 201, message: 'Payment Created Successfully', data: PaymentCreated });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Create Payment Failed', err.message));
  }
};

module.exports = { PaymentAdd };
