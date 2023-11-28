const mongoose = require('mongoose');
require('dotenv').config();

const {
  getDailyMacros,
  setGoalMacros,
  getGoals
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

// Get daily macros
describe('daily macros', () => {
  // User doesn't exist
  test('user does not exist', async () => {
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

    // Call function
    await getDailyMacros(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or has invalid token'});
  });

  // Success
  test('Success', async () => {
    user = await User.findOne({email: 'unitTestUser@notanemail.com'});

    // Create request
    req = {
      user: {
        _id: user._id
      }
    };

    // Create mock JSON and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await getDailyMacros(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

// Set daily macros
describe('set Goals', () => {
  // Success
  test('Success', async () => {
    // Create request
    req = {
      user: {
        _id: user._id
      },

      body: {
        calories: 2000,
        fat: 100,
        carbs: 150,
        protein: 150
      }
    };

    // Create mock JSON and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await setGoalMacros(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith([2000, 100, 150, 150]);
  });
});

// Get daily macro goals
describe('get goals', () => {
  // User doesn't exist
  test('user does not exist', async () => {
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

    // Call function
    await getGoals(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'User does not exist or has invalid token'});
  });

  // Success
  test('Success', async () => {
    user = await User.findOne({email: 'unitTestUser@notanemail.com'});

    // Create request
    req = {
      user: {
        _id: user._id
      }
    };

    // Create mock JSON and status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Call function
    await getGoals(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith([2000, 100, 150, 150]);
  });
});
