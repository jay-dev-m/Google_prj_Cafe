import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    removeFromCart,
    cartTotal,
    placeOrder,
    userProfile,
  } = useCafe();

  const [deliveryType, setDeliveryType] = useState<'table' | 'counter'>('table');
  const [specialNote, setSpecialNote] = useState('');

  if (!isCheckoutOpen) return null;

  const handleConfirmOrder = () => {
    const noteText = `${deliveryType === 'table' ? `Table delivery: ${userProfile.currentTable}` : 'Pick up at Barista Counter'}${
      specialNote ? ` • Note: ${specialNote}` : ''
    }`;
    placeOrder(noteText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] p-6 sm:p-8 space-y-6">
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#140804] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-[#f0ede9]">
          <div className="w-10 h-10 rounded-full bg-[#ffdbd0] text-[#3a0a00] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">local_cafe</span>
          </div>
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#140804]">
              Confirm Artisanal Order
            </h2>
            <p className="text-xs text-[#817470]">Single-Origin Lab • Mission St. Roastery</p>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#97472e] block">
            Selected Offerings ({cart.length})
          </span>

          <div className="divide-y divide-[#f0ede9] border border-[#e5e2dd] rounded-xl overflow-hidden bg-[#f6f3ee]/40">
            {cart.map((item) => (
              <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex-1">
                  <p className="font-bold text-[#140804]">
                    {item.quantity}x {item.menuItem.name}
                  </p>
                  <p className="text-[#817470] text-[11px] mt-0.5">
                    {item.milk && item.milk !== 'None' ? `${item.milk} Milk` : ''}
                    {item.sweetness ? ` • ${item.sweetness} Sweetness` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#140804]">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#ba1a1a] hover:opacity-75 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-1 text-sm pt-1">
            <span className="text-[#4f4541] font-semibold">Subtotal</span>
            <span className="text-lg font-bold text-[#140804]">${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Destination */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#97472e] block">
            Dispatch Location
          </span>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeliveryType('table')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                deliveryType === 'table'
                  ? 'border-[#97472e] bg-[#ffdbd0]/30 text-[#140804]'
                  : 'border-[#e5e2dd] bg-[#f6f3ee] text-[#4f4541]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#97472e] block mb-1">
                table_restaurant
              </span>
              <span className="text-xs font-bold block">{userProfile.currentTable}</span>
              <span className="text-[10px] text-[#817470] block mt-0.5">Direct to seat</span>
            </button>

            <button
              onClick={() => setDeliveryType('counter')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                deliveryType === 'counter'
                  ? 'border-[#97472e] bg-[#ffdbd0]/30 text-[#140804]'
                  : 'border-[#e5e2dd] bg-[#f6f3ee] text-[#4f4541]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#97472e] block mb-1">
                countertops
              </span>
              <span className="text-xs font-bold block">Pick-Up Counter</span>
              <span className="text-[10px] text-[#817470] block mt-0.5">Bar 01 Espresso Bar</span>
            </button>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#140804]">Barista Sensory Notes (Optional)</label>
          <input
            type="text"
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            placeholder="e.g. Pre-warmed ceramic mug preferred, extra silky micro-foam"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e5e2dd] bg-[#f6f3ee] text-xs text-[#140804] focus:outline-none focus:ring-1 focus:ring-[#97472e]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#f0ede9]">
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="px-4 py-2 rounded-full bg-[#f6f3ee] text-[#140804] text-xs font-bold hover:bg-[#ebe8e3] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmOrder}
            className="px-6 py-2.5 rounded-full bg-[#2d1e18] text-white text-xs font-bold hover:bg-[#140804] transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffdbd0]">check_circle</span>
            <span>Send to Bar (${cartTotal.toFixed(2)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
