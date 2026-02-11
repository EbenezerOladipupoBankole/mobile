import { db } from '../utils/firebase';
import {
    collection,
    getDocs,
    query,
    orderBy,
    addDoc,
    Timestamp
} from 'firebase/firestore';

const jobsCollection = collection(db, 'jobs');

export const jobService = {
    getJobs: async () => {
        try {
            const snapshot = await getDocs(jobsCollection);
            const jobs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort by creation date
            return jobs.sort((a: any, b: any) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Error fetching jobs:', error);
            return [];
        }
    }
};
