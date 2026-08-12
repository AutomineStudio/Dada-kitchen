import { useState, useEffect } from 'react';
import {
  AuthStep,
  User,
  Dada,
  MenuItem,
  CartItem,
  Order,
  Address,
  ActiveTab
} from './types';
import {
  INITIAL_DADAS,
  INITIAL_TRAITEURS,
  INITIAL_MENU_ITEMS,
  INITIAL_ADDRESSES,
  INITIAL_ORDERS
} from './data/mockData';
import { Header, BottomBar } from './components/Navigation';
import { AuthScreen } from './components/AuthScreen';
import { DadasTab } from './components/DadasTab';
import { TraiteursTab } from './components/TraiteursTab';
import { DadaDetailScreen } from './components/DadaDetailScreen';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { OrdersTab } from './components/OrdersTab';
import { RatingModal } from './components/RatingModal';
import { AddressSelectionModal } from './components/AddressSelectionModal';
import { NewAddressModal } from './components/NewAddressModal';
import { AddressBookScreen } from './components/AddressBookScreen';
import { ProfileTab } from './components/ProfileTab';
import { MobileFrame } from './components/MobileFrame';
import { seedAllFirestoreData } from './lib/seedFirestore';

export default function App() {
  // Auth & User State
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('dada_kitchen_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      fullName: 'Sidi Ahmed',
      email: 'ahmed@exemple.ma',
      phone: '06 61 23 45 67',
      city: 'Casablanca',
      deliveryAddress: 'Appartement 12, Résidence Les Almohades, Gauthier',
      isLoggedIn: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_z4E55MUwGDvGIpRhY74Apvft1V0uosGxOG7Yzp6QifFJ5vWLOq2sjtpFK_3G6k2IPBbgCh4-W41oR2Ns9hgyHWadEETVO8Ybu4oi51UFwNy5K_6bcPwE9nF355_xJu3lhryuDsDHmBWqTOzgIcXkLuo_k6hZR1kD9NoqB-s9gfIx0seCiqTij44pX52faPgUI4dAXWXsuKUCghm9KBUSDJ6sUJSwg1YlRez9CGb04wLFnPT-aISjty6bfoldmYZ4GOshOnIXnCg'
    };
  });
  const [authStep, setAuthStep] = useState<AuthStep>(() => user.isLoggedIn ? 'AUTHENTICATED' : 'LOGIN');

  // App Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('DADAS');
  const [selectedDada, setSelectedDada] = useState<Dada | null>(null);
  const [subScreen, setSubScreen] = useState<'CARNET_ADDRESSES' | null>(null);

  // App Data & Lists
  const [dadas] = useState<Dada[]>(INITIAL_DADAS);
  const [traiteurs] = useState<Dada[]>(INITIAL_TRAITEURS);
  const [menuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('dada_kitchen_addresses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_ADDRESSES;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dada_kitchen_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_ORDERS;
  });

  // Cart & Modals
  useEffect(() => {
    seedAllFirestoreData();
  }, []);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingItem, setCustomizingItem] = useState<{ item: MenuItem; dada: Dada } | null>(null);
  const [showAddressSelectionModal, setShowAddressSelectionModal] = useState<boolean>(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState<boolean>(false);
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');

  // Sync Local Storage
  useEffect(() => {
    localStorage.setItem('dada_kitchen_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dada_kitchen_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('dada_kitchen_orders', JSON.stringify(orders));
  }, [orders]);

  // Auth Handlers
  const handleLoginSuccess = (partialUser: Partial<User>) => {
    setUser({
      ...user,
      ...partialUser,
      isLoggedIn: true
    });
    setAuthStep('AUTHENTICATED');
  };

  const handleLogout = () => {
    setUser({ ...user, isLoggedIn: false });
    setAuthStep('LOGIN');
  };

  // Cart Handlers
  const handleAddToCart = (
    item: MenuItem,
    dadaName: string,
    quantity: number,
    deliverySlot: string,
    specialInstructions: string
  ) => {
    const newItem: CartItem = {
      id: 'cart-' + Date.now(),
      menuItem: item,
      dadaName,
      deliverySlot,
      quantity,
      specialInstructions
    };
    setCart((prev) => [...prev, newItem]);
  };

  // Checkout Handler
  const handleConfirmCheckout = () => {
    if (cart.length === 0) return;

    const chosenAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    const totalCartPrice = cart.reduce((acc, c) => acc + c.menuItem.price * c.quantity, 0);

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      date: 'Aujourd\'hui',
      deliverySlot: cart[0]?.deliverySlot ? `Aujourd'hui à ${cart[0].deliverySlot}` : '12h - 13h',
      items: [...cart],
      totalPrice: totalCartPrice,
      status: 'CONFIRMED',
      dadaName: cart[0]?.dadaName || 'Dada Kitchen',
      dadaAvatar: selectedDada?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBmQdaXykA3KXbNc5LF7w56kFWjYGsMCyMArP-EnLaa0sezuh8L_D25IahG0fsDtBztQpZqMZBzBJtiJxl-bc7WWDICcbF09DqzogMPWoPpvzJdjVEF2zLCbm_A8Yxtjv31Q2T2OeyL86ur6nD1yV_FRHA96Pm5lBv2lFnTBHn_SnCawLs_VQtBJ3F2C1npFfSHsVd5kEK6jr0EOUdXXZrYVQpRCEpYUAehWQXfvCcXwG-JeeSiM2OlY0RrKIG1rv0jI7q5Vk0IE'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setShowAddressSelectionModal(false);
    setSelectedDada(null);
    setActiveTab('ORDERS');

    if (chosenAddr) {
      setUser((prev) => ({ ...prev, deliveryAddress: chosenAddr.fullAddress }));
    }
  };

  // Rating Submit Handler
  const handleSubmitRating = (orderId: string, rating: number, comment: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, rated: true, userRating: rating, userComment: comment }
          : o
      )
    );
  };

  // Reorder Handler
  const handleReorder = (order: Order) => {
    const reorderedItems: CartItem[] = order.items.map((item, idx) => ({
      ...item,
      id: 'cart-reorder-' + Date.now() + '-' + idx
    }));
    setCart(reorderedItems);
    setShowAddressSelectionModal(true);
  };

  // Address Handlers
  const handleSaveNewAddress = (newAddr: Address) => {
    setAddresses((prev) => [newAddr, ...prev]);
    setSelectedAddressId(newAddr.id);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  // Unauthenticated Flow
  if (!user.isLoggedIn || authStep !== 'AUTHENTICATED') {
    return (
      <MobileFrame>
        <AuthScreen
          authStep={authStep}
          setAuthStep={setAuthStep}
          onLoginSuccess={handleLoginSuccess}
        />
      </MobileFrame>
    );
  }

  // Active Orders Count
  const activeOrdersCount = orders.filter((o) => o.status === 'CONFIRMED').length;

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#001f29] font-['Be_Vietnam_Pro',sans-serif]">
      {/* Top Header */}
      {!selectedDada && !subScreen && (
        <Header
          user={user}
          title="Dada Kitchen"
          onOpenProfile={() => {
            setSubScreen(null);
            setActiveTab('PROFILE');
          }}
          onOpenAddressModal={() => setShowAddressSelectionModal(true)}
        />
      )}

      {/* Main Screen Views */}
      <main>
        {/* Sub-Screen: Carnet d'adresses */}
        {subScreen === 'CARNET_ADDRESSES' ? (
          <AddressBookScreen
            addresses={addresses}
            onBack={() => setSubScreen(null)}
            onOpenAddNewAddress={() => setShowNewAddressModal(true)}
            onDeleteAddress={handleDeleteAddress}
            onSetDefaultAddress={handleSetDefaultAddress}
          />
        ) : selectedDada ? (
          /* Sub-Screen: Dada/Traiteur Detail & Menu */
          <DadaDetailScreen
            dada={selectedDada}
            menuItems={menuItems}
            cart={cart}
            onBack={() => setSelectedDada(null)}
            onSelectItem={(item) => setCustomizingItem({ item, dada: selectedDada })}
            onViewBasket={() => setShowAddressSelectionModal(true)}
          />
        ) : (
          /* Primary Tabs */
          <>
            {activeTab === 'DADAS' && (
              <DadasTab
                dadas={dadas}
                onSelectDada={(dada) => setSelectedDada(dada)}
              />
            )}

            {activeTab === 'TRAITEURS' && (
              <TraiteursTab
                traiteurs={traiteurs}
                onSelectTraiteur={(traiteur) => setSelectedDada(traiteur)}
              />
            )}

            {activeTab === 'ORDERS' && (
              <OrdersTab
                orders={orders}
                onOpenRatingModal={(order) => setRatingOrder(order)}
                onReorder={handleReorder}
                onValidateOrder={() => {
                  alert("Votre commande est prise en charge par la Dada. Statut : En cours de préparation.");
                }}
              />
            )}

            {activeTab === 'PROFILE' && (
              <ProfileTab
                user={user}
                onOpenAddressBook={() => setSubScreen('CARNET_ADDRESSES')}
                onLogout={handleLogout}
              />
            )}
          </>
        )}
      </main>

      {/* Modals & Bottom Sheets */}

      {/* 1. Item Customization Bottom Sheet */}
      {customizingItem && (
        <ItemCustomizeModal
          item={customizingItem.item}
          dada={customizingItem.dada}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 2. Address Selection Modal */}
      {showAddressSelectionModal && (
        <AddressSelectionModal
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelectAddress={(addr) => setSelectedAddressId(addr.id)}
          onOpenAddNewAddress={() => setShowNewAddressModal(true)}
          onClose={() => setShowAddressSelectionModal(false)}
          onConfirm={handleConfirmCheckout}
        />
      )}

      {/* 3. New Address Modal */}
      {showNewAddressModal && (
        <NewAddressModal
          onClose={() => setShowNewAddressModal(false)}
          onSaveAddress={handleSaveNewAddress}
        />
      )}

      {/* 4. Rating Modal */}
      {ratingOrder && (
        <RatingModal
          order={ratingOrder}
          onClose={() => setRatingOrder(null)}
          onSubmitRating={handleSubmitRating}
        />
      )}

      {/* Bottom Navigation Shell */}
      {!selectedDada && !subScreen && (
        <BottomBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSubScreen(null);
            setSelectedDada(null);
            setActiveTab(tab);
          }}
          orderCount={activeOrdersCount}
        />
      )}
    </div>
  );
}
