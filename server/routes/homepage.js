const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get homepage content
router.get('/content', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM homepage_content LIMIT 1');
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      // Return default content if none found
      res.json({
        id: '',
        hero_title: 'BEYOND SHOPPING, IT\'S A LIFESTYLE',
        hero_subtitle: 'Discover premium beauty and fashion essentials curated just for you. Elevate your style with our exclusive collections.',
        hero_image_url: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
        updated_at: ''
      });
    }
  } catch (error) {
    console.error('Get homepage content error:', error);
    res.status(500).json({ message: 'Error fetching homepage content' });
  }
});

// Get store info
router.get('/store-info', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM store_info LIMIT 1');
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      // Return default store info if none found
      res.json({
        id: '',
        business_name: 'Zoya Belle',
        address: '123 Collins Street, Melbourne VIC 3000, Australia',
        phone: '+61 3 9123 4567',
        email: 'hello@zoyabelle.com.au',
        whatsapp_number: '+61411632317',
        business_hours: null,
        created_at: '',
        updated_at: ''
      });
    }
  } catch (error) {
    console.error('Get store info error:', error);
    res.status(500).json({ message: 'Error fetching store info' });
  }
});

module.exports = router;
