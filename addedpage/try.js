// Import Firebase Functions and Admin SDK
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Admin SDK
admin.initializeApp();

/**
 * Cloud Function: getUIDByEmail
 * This function returns the UID of a user given their email.
 * Only authenticated users can call this function.
 */
exports.getUIDByEmail = functions.https.onCall(async (data, context) => {
  const email = data.email;

  // Check if the request is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be signed in to call this function."
    );
  }

  // Validate email
  if (!email || typeof email !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A valid email must be provided."
    );
  }

  try {
    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(email);

    // Return the UID
    return { uid: userRecord.uid };
  } catch (error) {
    // Handle user not found
    throw new functions.https.HttpsError("not-found", "User not found");
  }
});
