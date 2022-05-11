

import { 
    collection, 
    addDoc,
    getDocs, 
    doc, 

    // write/create
    // accepts `options: object` as 3rd arg { merge: true }
    setDoc,

    // throws in doc does not exist
    updateDoc,

    deleteDoc,
    deleteField,

    onSnapshot,
    
    query,
    where,
    orderBy,
    limit,

    serverTimestamp,

    arrayUnion, 
    arrayRemove,

    increment,


} from "firebase/firestore"; 



// .collection
// .query
// .orderBy


const collA = collection(db, 'path', 'to', 'document');

// cli
// https://firebase.google.com/docs/cli?authuser=0#command_reference

// add data
// https://firebase.google.com/docs/firestore/quickstart?authuser=0&hl=en#add_data

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}


// read data
// https://firebase.google.com/docs/firestore/quickstart?authuser=0&hl=en#read_data

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});


