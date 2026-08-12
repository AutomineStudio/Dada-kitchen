import React, { useState } from 'react';
import { Order, CartItem } from '../types';

interface OrdersTabProps {
  orders: Order[];
  onOpenRatingModal: (order: Order) => void;
  onReorder: (order: Order) => void;
  onValidateOrder?: (orderId: string) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  onOpenRatingModal,
  onReorder,
  onValidateOrder
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeOrders = orders.filter((o) => o.status === 'CONFIRMED');
  const historyOrders = orders.filter((o) => o.status === 'DELIVERED' || o.status === 'CANCELLED');

  return (
    <div className="pb-24 pt-4 px-4 md:px-8 max-w-4xl mx-auto zellige-pattern">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl md:text-3xl text-[#e76f51] mb-1">
          Mes Commandes
        </h2>
        <p className="font-['Be_Vietnam_Pro'] text-sm text-[#57423d]">
          Suivez vos repas préparés avec amour par nos Dadas.
        </p>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-[#dec0b9] mb-8">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 text-center font-['Be_Vietnam_Pro'] text-sm font-semibold transition-all ${
            activeTab === 'active'
              ? 'border-b-3 border-[#e76f51] text-[#e76f51]'
              : 'text-[#57423d] hover:text-[#001f29]'
          }`}
        >
          En cours ({activeOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-center font-['Be_Vietnam_Pro'] text-sm font-semibold transition-all ${
            activeTab === 'history'
              ? 'border-b-3 border-[#e76f51] text-[#e76f51]'
              : 'text-[#57423d] hover:text-[#001f29]'
          }`}
        >
          Historique ({historyOrders.length})
        </button>
      </div>

      {/* Active Orders Content */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#dec0b9]/40 hover:shadow-md transition-all p-5 md:p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-[#33a395] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Confirmé
                  </span>
                  <span className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#e76f51]">
                    {order.deliverySlot}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((cartItem) => (
                    <div key={cartItem.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#001f29]">
                          {cartItem.menuItem.name} x{cartItem.quantity}
                        </h3>
                        {cartItem.specialInstructions && (
                          <p className="text-xs text-[#57423d] italic">
                            "{cartItem.specialInstructions}"
                          </p>
                        )}
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#e76f51]">
                        {cartItem.menuItem.price * cartItem.quantity} DH
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-4 pt-2 border-t border-[#dec0b9]/20">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#ffab69]">
                    <img
                      src={order.dadaAvatar}
                      alt={order.dadaName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-['Be_Vietnam_Pro'] text-sm font-medium text-[#57423d]">
                    {order.dadaName}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[#dec0b9]/30">
                  <div className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#e76f51]">
                    Total: {order.totalPrice} DH
                  </div>
                  <button
                    onClick={() => onValidateOrder && onValidateOrder(order.id)}
                    className="px-6 py-3 rounded-xl bg-[#e76f51] text-white font-['Plus_Jakarta_Sans'] font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-xs"
                  >
                    Valider / Suivre
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#dec0b9] p-8">
              <span className="material-symbols-outlined text-4xl text-[#8a716c] mb-2">
                receipt_long
              </span>
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#001f29]">
                Aucune commande en cours
              </p>
              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#57423d] mt-1">
                Explorez le menu de nos Dadas et passez votre première commande.
              </p>
            </div>
          )}
        </div>
      )}

      {/* History Orders Content */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {historyOrders.length > 0 ? (
            historyOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#dec0b9]/40 p-5 md:p-6 opacity-95"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1.5 text-[#006a60]">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Livré</span>
                  </div>
                  <span className="font-['Be_Vietnam_Pro'] text-xs text-[#8a716c]">
                    {order.date}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((cartItem) => (
                    <div key={cartItem.id} className="flex justify-between items-center">
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#001f29]">
                        {cartItem.menuItem.name}
                      </h3>
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#001f29]">
                        {cartItem.menuItem.price * cartItem.quantity} DH
                      </span>
                    </div>
                  ))}
                  <p className="font-['Be_Vietnam_Pro'] text-xs text-[#57423d]">
                    Préparé par {order.dadaName}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#dec0b9]/30">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#e76f51]">
                    {order.totalPrice} DH
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onReorder(order)}
                      className="px-4 py-2 rounded-xl bg-[#ffab69] text-[#783d01] font-['Be_Vietnam_Pro'] font-semibold text-xs hover:opacity-90 active:scale-95 transition-all"
                    >
                      Commander à nouveau
                    </button>
                    <button
                      onClick={() => onOpenRatingModal(order)}
                      className="px-4 py-2 rounded-xl bg-[#e76f51] text-white font-['Be_Vietnam_Pro'] font-semibold text-xs hover:opacity-90 active:scale-95 transition-all"
                    >
                      {order.rated ? 'Avis donné ⭐' : 'Noter'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#dec0b9] p-8">
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#001f29]">
                Aucun historique de commande
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
