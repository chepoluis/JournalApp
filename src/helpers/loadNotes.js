import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe.');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef); // Aqui se pueden agregar filtros(orderBy, etc)

    const notes = [];

    // Itera entre los documentos
    docs.forEach( doc => {
        // This comes from the prototype "data()"
        notes.push({ id: doc.id, ...doc.data() })
    })

    return notes;
}
