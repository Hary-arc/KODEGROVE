import { Request, Response } from 'express';
import { Service, serviceStore } from '../models';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceStore.findAll();
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving services'
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req: Request, res: Response) => {
  try {
    const service = await serviceStore.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving service'
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const service: Service = {
      id: crypto.randomUUID(),
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      features: req.body.features || [],
      createdAt: new Date().toISOString()
    };

    // Validation
    if (!service.title) {
      return res.status(400).json({
        success: false,
        errors: ['Title is required']
      });
    }
    if (!service.description) {
      return res.status(400).json({
        success: false,
        errors: ['Description is required']
      });
    }
    if (isNaN(service.price) || service.price < 0) {
      return res.status(400).json({
        success: false,
        errors: ['Valid price is required']
      });
    }
    if (!service.features?.length) {
      return res.status(400).json({
        success: false,
        errors: ['At least one feature is required']
      });
    }

    await serviceStore.create(service);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating service'
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await serviceStore.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const updatedService: Service = {
      ...service,
      title: req.body.title || service.title,
      description: req.body.description || service.description,
      price: req.body.price ? Number(req.body.price) : service.price,
      features: req.body.features || service.features,
      id: service.id,
      createdAt: service.createdAt
    };

    // Validation
    if (!updatedService.title) {
      return res.status(400).json({
        success: false,
        errors: ['Title is required']
      });
    }
    if (!updatedService.description) {
      return res.status(400).json({
        success: false,
        errors: ['Description is required']
      });
    }
    if (isNaN(updatedService.price) || updatedService.price < 0) {
      return res.status(400).json({
        success: false,
        errors: ['Valid price is required']
      });
    }
    if (!updatedService.features?.length) {
      return res.status(400).json({
        success: false,
        errors: ['At least one feature is required']
      });
    }

    await serviceStore.update(service.id, updatedService);

    res.json({
      success: true,
      data: updatedService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating service'
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await serviceStore.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    await serviceStore.delete(req.params.id);

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service'
    });
  }
};