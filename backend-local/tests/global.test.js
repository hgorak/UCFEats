const mongoose = require('mongoose');
require('dotenv').config();

const {
  getAllItems,
  getItems,
  getItem
} = require('../controllers/itemController');

const { getAllLocations } = require('../controllers/storeController');

// Connect to the database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
});

// Disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

// Get all items
describe('All items', () => {
  // Get all items
  test('Get all', async () => {
    // Create request and response objects
    req = {};
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getAllItems(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

// Get all items from one location
describe('Items from location', () => {
  // Store doesn't exist
  test('Store that does not exist', async () => {
    // Create Request
    req = {
      body: {
        name: "Not A Store"
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getItems(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // Success
  test('Get all items from location', async () => {
    // Create Request
    req = {
      body: {
        name: "Chick-fil-a"
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getItems(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

// Get singular item from location
describe('Singular item from location', () => {
  // Store Doesn't Exist
  test('Store could not be found', async () => {
    // Create Request
    req = {
      body: {
        storeName: "Non-existant",
        itemName: "Spicy Chicken Biscuit"
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getItem(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });

  // Item Doesn't Exist
  test('Item could not be found', async () => {
    // Create request
    req = {
      body: {
        storeName: 'Chick-fil-a',
        itemName: 'Not Item by any means'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getItem(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
  
  // Found Item
  test('Successfully find item', async () => {
    // Create request
    req = {
      body: {
        storeName: 'Chick-fil-a',
        itemName: 'Spicy Chicken Biscuit'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getItem(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});

// Get all locations
describe('Get all locations', () => {
  test('Successfully get all items', async () => {
    // Create request
    req = {};

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await getAllLocations(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(expect.anything());
  });
});
