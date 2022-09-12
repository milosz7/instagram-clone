export const weakPassword = {
  status: 400,
  message:
    'Password has to be at least 8 characters, one uppercase, one digit and a special sign.',
};

export const provideData = { status: 400, message: 'Please provide all necessary data!' };

export const usernameTaken = { status: 409, message: 'The username is already taken!' };

export const emailTaken = { status: 409, message: 'The email is already taken!' };

export const phoneTaken = { status: 409, message: 'The phone number is already taken!' };

export const internalServerError = { status: 500, message: 'Internal server error.' };
