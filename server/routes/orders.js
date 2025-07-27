const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create new order
router.post('/', authenticateToken, async (req, res) => {
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    
    const { 
      items, 
      total_amount, 
      payment_method, 
      shipping_address, 
      payment_data 
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    // Create order
    const orderId = uuidv4();
    const orderResult = await client.query(`
      INSERT INTO orders (id, user_id, total_amount, status, payment_status, payment_method, shipping_address, notes, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) 
      RETURNING *
    `, [
      orderId,
      req.userId,
      total_amount,
      'confirmed',
      'paid',
      payment_method,
      JSON.stringify(shipping_address),
      `Payment ID: ${payment_data?.id || payment_data?.orderID || 'N/A'}`
    ]);

    const order = orderResult.rows[0];

    // Create order items
    for (const item of items) {
      const unitPrice = item.product.discount_percentage > 0 
        ? item.product.price * (1 - item.product.discount_percentage / 100)
        : item.product.price;

      await client.query(`
        INSERT INTO order_items (id, order_id, product_id, quantity, price, created_at) 
        VALUES ($1, $2, $3, $4, $5, NOW())
      `, [
        uuidv4(),
        order.id,
        item.product.id,
        item.quantity,
        unitPrice
      ]);
    }

    await client.query('COMMIT');
    
    res.status(201).json({
      order,
      message: 'Order created successfully'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order' });
  } finally {
    client.release();
  }
});

// Get user orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'quantity', oi.quantity,
                 'price', oi.price,
                 'product', json_build_object(
                   'id', p.id,
                   'title', p.title,
                   'price', p.price
                 )
               )
             ) as order_items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'quantity', oi.quantity,
                 'price', oi.price,
                 'product', json_build_object(
                   'id', p.id,
                   'title', p.title,
                   'price', p.price
                 )
               )
             ) as order_items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1 AND o.user_id = $2
      GROUP BY o.id
    `, [id, req.userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

module.exports = router;
