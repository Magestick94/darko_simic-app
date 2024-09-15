import { collection, addDoc, deleteDoc, updateDoc, getDocs,doc } from "firebase/firestore"; 
import { firestore } from "../firebase/config";

const addDocument = async (collectionName, document) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), document);

    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await deleteDoc(docRef);

    console.log("Deleted document with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

const editDocument = async (collectionName, documentId, document) => {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await updateDoc(docRef, document);

    console.log("Updated document with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error editing document: ", e);
  }
}

const getDocuments = async (collectionName) => {
  try {
    const documents = [];
    const querySnapshot = await getDocs(collection(firestore, collectionName));

    querySnapshot.forEach((doc) => {
      documents.push({...doc.data(), id: doc.id});
    });

    return documents;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}

export { addDocument, deleteDocument, editDocument, getDocuments };