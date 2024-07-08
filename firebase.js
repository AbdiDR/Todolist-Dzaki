const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com" // Replace with your database URL
});

const db = admin.firestore();

const checkFirestoreConnection = async () => {
  try {
    await db.collection('test').limit(1).get();
    console.log('Connected to Firestore successfully');
  } catch (error) {
    console.error('Failed to connect to Firestore:', error.message);
  }
};

// Call the function to check the connection
checkFirestoreConnection();

module.exports = { admin, db };
