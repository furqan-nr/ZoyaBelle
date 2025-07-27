const express = require('express');
const db = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get approved reviews
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.*, p.full_name 
      FROM reviews r 
      JOIN profiles p ON r.user_id = p.id 
      WHERE r.is_approved = true 
      ORDER BY r.created_at DESC 
      LIMIT 6
    `);
    
    const reviews = result.rows.map(row => ({
      ...row,
      profiles: { full_name: row.full_name }
    }));
    
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Get reviews for a specific product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const result = await db.query(`
      SELECT r.*, p.full_name 
      FROM reviews r 
      JOIN profiles p ON r.user_id = p.id 
      WHERE r.product_id = $1 AND r.is_approved = true 
      ORDER BY r.created_at DESC
    `, [productId]);
    
    const reviews = result.rows.map(row => ({
      ...row,
      profiles: { full_name: row.full_name }
    }));
    
    res.json(reviews);
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({ message: 'Error fetching product reviews' });
  }
});

// Create a new review (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;
    
    if (!product_id || !rating) {
      return res.status(400).json({ message: 'Product ID and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const result = await db.query(`
      INSERT INTO reviews (id, product_id, user_id, rating, comment, is_approved, created_at, updated_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, false, NOW(), NOW())
      RETURNING *
    `, [product_id, req.userId, rating, comment]);

    res.status(201).json({
      ...result.rows[0],
      message: 'Review submitted successfully and is pending approval'
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
});

module.exports = router;
