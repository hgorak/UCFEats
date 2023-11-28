const mongoose = require('mongoose');
require('dotenv').config();

const {
  getEats,
  getRecentEats,
  addEat,
  deleteEat
} = require('../controllers/eatsController');

const User = require('../models/userModel');

// Connect to the database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
});

// Disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

// User for all calls
let user;

// Get Eats
describe('get user eats', () => {
  // User doesn't exist
  test('User does not exist', async () => {
    // Create request
    req = {
      user: {
        _id: '6565016004cb81f187f88699'
      }
    };

    // Create mock JSON and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getEats(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or has invalid token'});
  });

  // Successfully get eats
  test('Success', async () => {
    user = await User.findOne({email: 'unitTestUser@notanemail.com'});

    req = {
      user: {
        _id: user._id,
        eats: user.eats
      }
    };

    // Create mock JSON and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getEats(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(user.eats);
  });
});

// Add Eat
describe('add eat to user', () => {
  // Missing name in body
  test('Missing name in request body', async () => {
    // Create request
    const req = {
      user: {
        _id: user._id
      },

      body: {}
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await addEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Please fill in the required fields', emptyFields: ['name']});
  });

  // Item doesn't exist
  test('Item does not exist', async () => {
    // Create request
    const req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'nonexistant item'
      }
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await addEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Item Does Not Exist'});
  });

  // Success
  test('Success', async () => {
    const req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await addEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // User already has item
  test('User already has the item', async () => {
    const req = {
      user: {
        _id: user._id,
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await addEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({message: 'Quantity has been updated'});
  });
});

// getRecentEats
describe('get users recent eats', () => {
  // Successfully get eats
  test('Success', async () => {
    const req = {
      user: {
        _id: user._id,
      }
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const res = { status: mockStatus };

    // Call function
    await getRecentEats(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

// Delete Eat
describe('delete eat from user', () => {
  // Missing name in body
  test('Missing name in request body', async () => {
    // Create request
    const req = {
      user: {
        _id: user._id
      },

      body: {}
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await deleteEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Please fill in the required fields', emptyFields: ['name']});
  });

  // Item doesn't exist
  test('Item does not exist', async () => {
    // Create request
    const req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'nonexistant item'
      }
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await deleteEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Item Does Not Exist'});
  });

  // Success
  test('Success', async () => {
    const req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await deleteEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // User doesn't have the eat
  test('User already has the item', async () => {
    const req = {
      user: {
        _id: user._id,
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    // Create mock JSON and status
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    const res = {status: mockStatus};

    // Call function
    await deleteEat(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({error: 'User Does Not Have This Eat'});
  });
});
