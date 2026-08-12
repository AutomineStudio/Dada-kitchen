import { db, dbDefault } from './firebase';
import { doc, writeBatch, Firestore } from 'firebase/firestore';
import { INITIAL_DADAS, INITIAL_TRAITEURS, INITIAL_MENU_ITEMS, INITIAL_ADDRESSES, INITIAL_ORDERS } from '../data/mockData';

async function seedTargetDatabase(targetDb: Firestore, label: string) {
  try {
    const batch = writeBatch(targetDb);

    // 1. Seed Dadas
    for (const dada of INITIAL_DADAS) {
      const ref = doc(targetDb, 'dadas', dada.id);
      batch.set(ref, dada, { merge: true });
    }

    // 2. Seed Traiteurs
    for (const traiteur of INITIAL_TRAITEURS) {
      const ref = doc(targetDb, 'traiteurs', traiteur.id);
      batch.set(ref, traiteur, { merge: true });
    }

    // 3. Seed Menu Items
    for (const item of INITIAL_MENU_ITEMS) {
      const ref = doc(targetDb, 'menuItems', item.id);
      batch.set(ref, item, { merge: true });
    }

    // 4. Seed Addresses
    for (const addr of INITIAL_ADDRESSES) {
      const ref = doc(targetDb, 'addresses', addr.id);
      batch.set(ref, addr, { merge: true });
    }

    // 5. Seed Orders
    for (const order of INITIAL_ORDERS) {
      const ref = doc(targetDb, 'orders', order.id);
      batch.set(ref, order, { merge: true });
    }

    // 6. Seed Default User
    const defaultUserRef = doc(targetDb, 'users', '0661234567');
    batch.set(defaultUserRef, {
      fullName: 'Sidi Ahmed',
      email: 'ahmed@exemple.ma',
      phone: '06 61 23 45 67',
      city: 'Casablanca',
      deliveryAddress: 'Appartement 12, Résidence Les Almohades, Gauthier',
      isLoggedIn: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_z4E55MUwGDvGIpRhY74Apvft1V0uosGxOG7Yzp6QifFJ5vWLOq2sjtpFK_3G6k2IPBbgCh4-W41oR2Ns9hgyHWadEETVO8Ybu4oi51UFwNy5K_6bcPwE9nF355_xJu3lhryuDsDHmBWqTOzgIcXkLuo_k6hZR1kD9NoqB-s9gfIx0seCiqTij44pX52faPgUI4dAXWXsuKUCghm9KBUSDJ6sUJSwg1YlRez9CGb04wLFnPT-aISjty6bfoldmYZ4GOshOnIXnCg',
      createdAt: new Date().toISOString()
    }, { merge: true });

    await batch.commit();
    console.log(`[Firestore Seed] Successfully seeded ${label}`);
  } catch (err) {
    console.warn(`[Firestore Seed Warning] Could not seed ${label}:`, err);
  }
}

export async function seedAllFirestoreData() {
  console.log('[Firestore Seed] Initializing data seeding...');
  await seedTargetDatabase(db, 'Custom Database (ai-studio-dadakitchen...)');
  await seedTargetDatabase(dbDefault, 'Default Database ((default))');
}
