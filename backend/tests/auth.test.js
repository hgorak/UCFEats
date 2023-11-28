const mongoose = require('mongoose');
require('dotenv').config();

const {
  loginUser,
  registerUser,
  verifyEmail,
  resetUserPasswordSetup,
  resetUserPassword,
  deleteUser
} = require('../controllers/userController');

const User = require('../models/userModel');

// Connect to the database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
});

// Disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

// Variable for the user's id after registration
let email = '';

// Variable to access user
let user1, user2;

// Login
describe('loginUser', () => {
  // Invalid Email
  test('Returns an error for invalid email', async () => {
    const req = {
      body: {
        email: "newuser-1@gmail.com",
        password: "Passy123!"
      }
    };
    
    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await loginUser(req, res);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'No Account Found With That Email'});
  });

  // Email Exists; Wrong password
  test('Returns an error for wrong password', async () => {
    const req = {
      body: {
        email: "newuser10@gmail.com",
        password: "PassyWrong:("
      }
    };
 
    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await loginUser(req, res);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Incorrect Password'});
  });
  
  // Successful Login
  test('Returns Successul Login', async () => {
    const req = {
      body: {
        email: "newuser10@gmail.com",
        password: "Passy123!"
      }
    };

    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await loginUser(req, res);

    // Get the object that was returned
    const result = mockJson.mock.calls[0][0];

    // Check to make sure it returned the right status
    expect(mockStatus).toHaveBeenCalledWith(200);

    // Ensure it returns a token and that the token is valid
    expect(result).toHaveProperty('token');
    expect(result.token).toBeDefined();
  });
});

// Registration
describe('registerUser', () => {
  // Invalid Email Format
  test('Returns an error for Invalid Email Format', async () => {
    const req = {
      body: {
        email: "newuser10gmail.com",
        password: "Passy123!",
        first_name: "Lochness",
        last_name: "Monster"
      }
    };
    
    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await registerUser(req, res);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Email is not valid'});
  });

  // Weak Password
  test('Returns an error for weak password', async () => {
    const req = {
      body: {
        email: "newuser92@gmail.com",
        password: "WeakPassy",
        first_name: "Lochy",
        last_name: "Monsty"
      }
    };
    
    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await registerUser(req, res);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Password must be at least 8 digits long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'});
  });

  // Email Already Exists
  test('Returns an error for Email Already Exists', async () => {
    const req = {
      body: {
        email: "newuser10@gmail.com",
        password: "Passy123!",
        first_name: "Ronald",
        last_name: "McDonald"
      }
    };

    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await registerUser(req, res);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({error: 'Email is already in use'});
  });

  // Successful Registration
  test('Returns Successful Registration', async () => {
    const req = {
      body: {
        email: "newuser92@gmail.com",
        password: "Passy123!",
        first_name: "TestFirst",
        last_name: "TestLast"
      }
    };

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await registerUser(req, res);

    // Get the object that was returned
    const result = mockJson.mock.calls[0][0];

    // Check to make sure it returned the right status
    expect(mockStatus).toHaveBeenCalledWith(200);

    // Ensure it returns a token and that the token is valid
    expect(result).toHaveProperty('token');
    expect(result.token).toBeDefined();

    email = result.email;
  });
});

// Email Verification
describe('verifyEmail', () => {
  // Invalid Token
  test('No user exists with token', async () => {
    // Create request
    req = {
      params: {
        token: 'InvalidToken123'
      }
    };
    
    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await verifyEmail(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Token does not exist. Uh oh'});
  });

  // Verify User
  test('Verification Successful', async () => {
    // Get User
    user1 = await User.findOne({email: email});

    // Create request
    req = {
      params: {
        token: user1.verification_token
      }
    };
    
    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await verifyEmail(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({message: 'User is now verified'});

  });
});

// Reset Password Setup
describe('resetPasswordSetup', () => {
  // Invalid Email
  test('Invalid Email', async () => {
    // Create req
    req = {
      body: {
        email: "NotAnEmailInTheDatabaseIHope@notemail.com"
      }
    };

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await resetUserPasswordSetup(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'No Account Found With That Email'});
  });

  // Successful
  test('Successful Email', async () => {
    // Create req with valid email
    req = {
      body: {
        email: user1.email
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await resetUserPasswordSetup(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({message: 'Reset User Password Email Successful'});
  });
})

// Reset Password
describe('resetPassword', () => {
  // No user has the token
  test('No user has token', async () => {
    // Create request
    req = {
      params: {
        token: 'asdfjkasdlfk.asdlfaksdjf'
      },
      
      body: {
        password: 'Passy123!'
      }
    };

    // Create mock status and JSON
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await resetUserPassword(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({error: 'Token does not exist. Please try the reset process again'});
  });

  // JWT is expired
  test('Expired JWT', async () => {
    // Create request
    req = {
      params: {
        token: user1.reset_token
      },

      body: {
        password: 'Passy123!'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await resetUserPassword(req, res);

    expect(mockStatus).toHaveBeenCalledWith(402);
    expect(mockJson).toHaveBeenCalledWith({error: 'Token is expired'});
  });

  // Password being old password
  test('New password cannot be old password', async () => {
    // Get updated user
    user2 = await User.findOne({email: email});

    // Create request
    req = {
      params: {
        token: user2.reset_token
      },

      body: {
        password: 'Passy123!'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await resetUserPassword(req, res);

    expect(mockStatus).toHaveBeenCalledWith(410);
    expect(mockJson).toHaveBeenCalledWith({error: 'New password cannot be old password'});
  });

  // Weak Password
  test('Ensure new password meets requirements', async () => {
    // Create request
    req = {
      params: {
        token: user2.reset_token
      },

      body: {
        password: 'Passy123'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await resetUserPassword(req, res);

    expect(mockStatus).toHaveBeenCalledWith(411);
    expect(mockJson).toHaveBeenCalledWith({error: 'Password must be at least 8 digits long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'});
  });

  // Successful Password
  test('Succesful Password Change', async () => {
    // Request
    req = {
      params: {
        token: user2.reset_token
      },

      body: {
        password: 'Passy321!'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await resetUserPassword(req, res);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({message: 'Password has been updated successfully'});
  });
})

// User Deletion
describe('deleteUser', () => {
  test('Returns an error for invalid user token', async () => {
    // Create req
    const req = {
      headers: {
        Authorization: `Bearer  15324543.23452345.qew125125`
      }
    };

    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteUser(req, res);

    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({message: 'User Not Found'});
  });

  test('Successful deletion of user', async () => {
    req = {
      user: user2
    };

    // Mock the response object
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({json: mockJson});
    let res = {status: mockStatus};

    await deleteUser(req, res);

    // Get the object that was returned
    const result = mockJson.mock.calls[0][0];

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(result).toHaveProperty('_id');
  });
});

