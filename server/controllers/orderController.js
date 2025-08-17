const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { 
      orderItems, 
      shippingAddress, 
      totalPrice,
      shippingPrice,
      taxPrice
    } = req.body;

    // Validate required fields
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    if (!shippingAddress || !totalPrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = new Order({
      user: req.user._id, // From authenticated middleware
      orderItems: orderItems.map(item => ({
        product: item.product,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingAddress,
      totalPrice,
      shippingPrice: shippingPrice || 0,
      taxPrice: taxPrice || 0,
      status: 'Pending'
    });

    const createdOrder = await order.save();
    
    res.status(201).json({
      _id: createdOrder._id,
      status: createdOrder.status,
      createdAt: createdOrder.createdAt
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      message: 'Order creation failed',
      error: error.message 
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch orders',
      error: error.message 
    });
  }
};