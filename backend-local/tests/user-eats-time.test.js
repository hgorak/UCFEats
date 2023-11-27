const mongoose = require('mongoose');
require('dotenv').config();

const {
  dayEats
} = require('../controllers/eatsController');

// Connect to the database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
});

// Disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

// Day Eats
describe('Day Eats', () => {
  // Successful
  test('Success', async () => {
    // Create Request
    req = {
      user: {
        _id: '6565016004cb81f187f88698'
      }
    };

    // Create mock JSON and Status
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    // Function call
    await dayEats(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith([]);
  });
});
