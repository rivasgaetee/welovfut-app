/**
 * Utility functions for Firebase authentication
 */

/**
 * Maps Firebase authentication error codes to user-friendly messages
 * @param error The error object from Firebase
 * @returns A user-friendly error message
 */
export function mapFirebaseErrorToMessage(error: unknown): string {
  // Default error message
  let message = 'An unknown error occurred. Please try again.';

  // If the error is not an object or doesn't have a code property, return the default message
  if (!error || typeof error !== 'object' || !('code' in error)) {
    return message;
  }

  // Extract the error code
  const errorCode = (error as { code: string }).code;

  // Map Firebase error codes to user-friendly messages
  switch (errorCode) {
    // Authentication errors
    case 'auth/user-not-found':
      message = 'No account found with this email address.';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password. Please try again.';
      break;
    case 'auth/invalid-email':
      message = 'The email address is not valid.';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled.';
      break;
    case 'auth/email-already-in-use':
      message = 'This email address is already in use by another account.';
      break;
    case 'auth/weak-password':
      message = 'The password is too weak. Please use a stronger password.';
      break;
    case 'auth/operation-not-allowed':
      message = 'This operation is not allowed.';
      break;
    case 'auth/account-exists-with-different-credential':
      message = 'An account already exists with the same email but different sign-in credentials.';
      break;
    case 'auth/invalid-credential':
      message = 'The provided credential is invalid or has expired.';
      break;
    case 'auth/invalid-verification-code':
      message = 'The verification code is invalid.';
      break;
    case 'auth/invalid-verification-id':
      message = 'The verification ID is invalid.';
      break;
    case 'auth/requires-recent-login':
      message = 'This operation requires recent authentication. Please log in again.';
      break;
    case 'auth/too-many-requests':
      message = 'Too many unsuccessful login attempts. Please try again later.';
      break;
    case 'auth/network-request-failed':
      message = 'A network error occurred. Please check your connection and try again.';
      break;
    case 'auth/popup-closed-by-user':
      message = 'The authentication popup was closed before completing the sign in.';
      break;
    case 'auth/unauthorized-domain':
      message = 'This domain is not authorized for OAuth operations.';
      break;
    case 'auth/expired-action-code':
      message = 'The action code has expired.';
      break;
    case 'auth/invalid-action-code':
      message = 'The action code is invalid.';
      break;
    default:
      // If we have an error message in the error object, use it
      if ('message' in error && typeof error.message === 'string') {
        message = error.message;
      }
      break;
  }

  return message;
}