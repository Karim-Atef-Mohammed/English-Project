import { 
    collection, addDoc, getDocs, query, where, 
    orderBy, limit, doc, getDoc, updateDoc, deleteDoc
  } from 'firebase/firestore';
  import { db } from './config';
  
  // Save survey response to Firestore
  export const saveSurveyResponse = async (surveyData) => {
    try {
      // Add timestamp
      const dataToSave = {
        ...surveyData,
        submittedAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, "surveyResponses"), dataToSave);
      return docRef.id;
    } catch (error) {
      console.error("Error saving survey response:", error);
      throw error;
    }
  };
  
  // Get survey responses with optional filters
  export const getSurveyResponses = async (options = {}) => {
    try {
      const { 
        startDate, endDate, orderByField = 'submittedAt', 
        orderDirection = 'desc', limitCount = 100 
      } = options;
      
      let q = collection(db, "surveyResponses");
      const queryConstraints = [];
      
      // Add date filters if provided
      if (startDate) {
        queryConstraints.push(where("submittedAt", ">=", startDate));
      }
      
      if (endDate) {
        queryConstraints.push(where("submittedAt", "<=", endDate));
      }
      
      // Add ordering
      queryConstraints.push(orderBy(orderByField, orderDirection));
      
      // Add limit
      queryConstraints.push(limit(limitCount));
      
      // Apply all constraints
      q = query(q, ...queryConstraints);
      
      const querySnapshot = await getDocs(q);
      const responses = [];
      
      querySnapshot.forEach((doc) => {
        responses.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return responses;
    } catch (error) {
      console.error("Error fetching survey responses:", error);
      throw error;
    }
  };
  
  // Get survey analytics
  export const getSurveyAnalytics = async () => {
    try {
      // Get total number of responses
      const totalQuery = await getDocs(collection(db, "surveyResponses"));
      const totalResponses = totalQuery.size;
      
      // Get today's responses
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayQuery = query(
        collection(db, "surveyResponses"),
        where("submittedAt", ">=", today.toISOString())
      );
      
      const todaySnapshot = await getDocs(todayQuery);
      const todayResponses = todaySnapshot.size;
      
      // Return analytics object
      return {
        totalResponses,
        todayResponses,
        // Add more analytics as needed
      };
    } catch (error) {
      console.error("Error fetching survey analytics:", error);
      throw error;
    }
  };
  
  // Get a single survey response by ID
  export const getSurveyResponseById = async (responseId) => {
    try {
      const docRef = doc(db, "surveyResponses", responseId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Survey response not found");
      }
    } catch (error) {
      console.error("Error fetching survey response:", error);
      throw error;
    }
  };
  
  // Delete survey response
  export const deleteSurveyResponse = async (responseId) => {
    try {
      await deleteDoc(doc(db, "surveyResponses", responseId));
      return true;
    } catch (error) {
      console.error("Error deleting survey response:", error);
      throw error;
    }
  };