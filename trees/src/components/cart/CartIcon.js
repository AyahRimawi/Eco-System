// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { useCart } from '../../context/CartContext';
// import { ShoppingCart } from 'lucide-react';

// const CartIcon = () => {
//   const { cart } = useCart();
//   const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <Link href="/cart" className="relative inline-block">
//       <ShoppingCart className="w-6 h-6" />
//       {itemCount > 0 && (
//         <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//           {itemCount}
//         </span>
//       )}
//     </Link>
//   );
// };

// export default CartIcon;
'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const CartIcon = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;