import { db } from '../utils/firebase';
import {
    collection,
    getDocs,
    query,
    orderBy
} from 'firebase/firestore';

const talentsCollection = collection(db, 'talents');

export const talentService = {
    getTalents: async () => {
        try {
            const snapshot = await getDocs(talentsCollection);
            const talents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort by creation date
            return talents.sort((a: any, b: any) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Error fetching talents:', error);
            return [];
        }
    }
};
