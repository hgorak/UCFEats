const mongoose = require('mongoose');
require('dotenv').config();

const {
  addFavorite,
  getFavorites,
  deleteFavorite
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

// General user to access methods
let user;

// Add Favorite
describe('Add a favorite', () => {
  // No name in the body
  test('All fields are not filled', async () => {
    user = await User.findOne({email: 'unitTestUser@notanemail.com'});

    // Create Request
    req = {
      user: {
        _id: user._id
      },

      body: {}
    };

    // Create mock JSON and Status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Run function
    await addFavorite(req, res);

    // Get results and compare to expected
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Please fill in the required fields', emptyFields: ['name']});
  });
  
  // Item does not exist
  test('Item does not exist', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Not an item'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await addFavorite(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Item Does Not Exist'});
  });

  // User does not exist
  test('User does not exist', async () => {
    req = {
      user: {
        _id: '6565016004cb81f187f88699'
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    // Create mock json and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await addFavorite(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or has invalid token'});
  });

  // Successfully add
  test('Add successfully', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await addFavorite(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // User already has favorite
  test('User already has favorite', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await addFavorite(req, res);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({error: 'User Already Has This Favorite'});
  });
});

// Get Favorites
describe('User Favorites', () => {
  // Invalid User
  test('Error finding user', async () => {
    // Create request
    req = {
      user: {
        _id: '6565016004cb81f187f88699'
      }
    };

    // Create mock json and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await getFavorites(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or has invalid token'});
  });

  // Successfully get all of the user's locations
  test('Get user locations', async () => {
    req = {
      user: {
        _id: user._id
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getFavorites(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

// Delete Favorite
describe('Delete Favorite', () => {
  // Item does not exist
  test('Item does not exist', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Not an item'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteFavorite(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Item Does Not Exist'});
  });

  // User does not exist
  test('User does not exist', async () => {
    req = {
      user: {
        _id: '6565016004cb81f187f88699'
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    // Create mock json and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await deleteFavorite(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or has invalid token'});
  });

  // Successfully delete
  test('Delete successfully', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteFavorite(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // User Does Not Have Favorite
  test('User does not have favorite', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Spicy Chicken Biscuit'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteFavorite(req, res);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({error: 'User Does Not Have This Favorite'});
  });
});
