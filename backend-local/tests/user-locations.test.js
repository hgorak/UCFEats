const mongoose = require('mongoose');
require('dotenv').config();

const {
  getUserLocations,
  addLocation,
  deleteLocation,
  updateLocations
} = require('../controllers/storeController');

const User = require('../models/userModel');

// Connect to the database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
});

// Disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

// A user will be assigned to this variable in the first test
let user;

// Tests for getting the user's locations
describe('User Locations', () => {
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
    await getUserLocations(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or token is invalid'});
  });

  // Successfully get all of the user's locations
  test('Get user locations', async () => {
    // Initialize user
    user = await User.findOne({email: 'unitTestUser@notanemail.com'});

    req = {
      user: {
        _id: user._id
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getUserLocations(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

// Adding a location
describe('Add Location', () => {
  // No name in the body
  test('All fields are not filled', async () => {
    // Create Request
    req = {
      user: {
        _id: user._id
      },

      body: {
      }
    };

    // Create mock JSON and Status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Run function
    await addLocation(req, res);

    // Get results and compare to expected
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Please fill in the required fields', emptyFields: ['name']});
  });
  
  // Store does not exist
  test('Store does not exist', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Not a store'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await addLocation(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Store Does Not Exist'});
  });

  // User does not exist
  test('User does not exist', async () => {
    req = {
      user: {
        _id: '6565016004cb81f187f88699'
      },

      body: {
        name: 'Chick-fil-a'
      }
    };

    // Create mock json and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await addLocation(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or token is invalid'});
  });

  // Successfully add
  test('Add successfully', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Chick-fil-a'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await addLocation(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // User already has store
  test('User already has store', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Chick-fil-a'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await addLocation(req, res);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({error: 'User Already Has This Store'});
  });
});

// Deleting a location
describe('Delete Location', () => {
  // Store does not exist
  test('Store does not exist', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Not a store'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteLocation(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Store Does Not Exist'});
  });

  // User does not exist
  test('User does not exist', async () => {
    req = {
      user: {
        _id: '6565016004cb81f187f88699'
      },

      body: {
        name: 'Chick-fil-a'
      }
    };

    // Create mock json and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await deleteLocation(req, res);

    // Ensure we got the expected response code and JSON
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or token is invalid'});
  });

  // Successfully delete
  test('Delete successfully', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Chick-fil-a'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteLocation(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // User Does Not Have Store
  test('User does not have store', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        name: 'Chick-fil-a'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteLocation(req, res);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({error: 'User Does Not Have This Store'});
  });
});

// Updating Locations
describe('Update Locations', () => {
  // Store doesn't exist
  test('Fake store', async () => {
    // Create request
    req = {
      body: {
        locationNames: ['Chick-fil-a', 'Not a store']
      }
    };

    // Create mock JSON and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await updateLocations(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Not a store not found'});
  });

  // Successfully update stores
  test('Success', async () => {
    req = {
      user: {
        _id: user._id
      },

      body: {
        locationNames: ['Steak \'n Shake']
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await updateLocations(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

