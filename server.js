
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('./generated/prisma');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware to read JSON requests
app.use(express.json());
app.use(cors());

// Welcome route
app.get('/', (req, res) => {
  res.send('AR Asset Inspection Backend is Running!');
});

// Health check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is working successfully!',
    timestamp: new Date()
  });
});

// Get all assets
app.get('/api/assets', async (req, res) => {
  try {
    const assets = await prisma.asset.findMany();

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets
    });
  } catch (error) {
    console.error('Error fetching assets:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch assets'
    });
  }
});

// Get a single asset by ID
app.get('/api/assets/:id', async (req, res) => {
  try {
    const assetId = Number(req.params.id);

    if (!Number.isInteger(assetId) || assetId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid asset ID'
      });
    }

    const asset = await prisma.asset.findUnique({
      where: {
        id: assetId
      }
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (error) {
    console.error('Error fetching asset:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch asset'
    });
  }
});

// Create a new asset
app.post('/api/assets', async (req, res) => {
  try {
    const { name, assetCode, location, status } = req.body;

    // Validate required fields
    const fields = [name, assetCode, location, status];

    if (!fields.every(
      (field) => typeof field === 'string' && field.trim().length > 0
    )) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required and must be valid strings'
      });
    }

    // Save asset in SQL Server
    const newAsset = await prisma.asset.create({
      data: {
        name: name.trim(),
        assetCode: assetCode.trim(),
        location: location.trim(),
        status: status.trim()
      }
    });

    res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: newAsset
    });

  } catch (error) {
    console.error('Error creating asset:', error);

    // Handle duplicate asset code
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Asset code already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create asset'
    });
  }
});
// Update an existing asset
app.put('/api/assets/:id', async (req, res) => {
  try {
    const assetId = Number(req.params.id);

    // Validate asset ID
    if (!Number.isInteger(assetId) || assetId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid asset ID'
      });
    }

    const { name, assetCode, location, status } = req.body;

    // Validate required fields
    const fields = [name, assetCode, location, status];

    if (!fields.every(
      (field) => typeof field === 'string' && field.trim().length > 0
    )) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required and must be valid strings'
      });
    }

    // Update asset in SQL Server
    const updatedAsset = await prisma.asset.update({
      where: {
        id: assetId
      },
      data: {
        name: name.trim(),
        assetCode: assetCode.trim(),
        location: location.trim(),
        status: status.trim()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Asset updated successfully',
      data: updatedAsset
    });

  } catch (error) {
    console.error('Error updating asset:', error);

    // Handle asset not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    // Handle duplicate asset code
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Asset code already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update asset'
    });
  }
});
// Delete an asset
app.delete('/api/assets/:id', async (req, res) => {
  try {
    const assetId = Number(req.params.id);

    // Validate asset ID
    if (!Number.isInteger(assetId) || assetId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid asset ID'
      });
    }

    // Delete asset from SQL Server
    const deletedAsset = await prisma.asset.delete({
      where: {
        id: assetId
      }
    });

    res.status(200).json({
      success: true,
      message: 'Asset deleted successfully',
      data: deletedAsset
    });

  } catch (error) {
    console.error('Error deleting asset:', error);

    // Handle asset not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete asset'
    });
  }
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
