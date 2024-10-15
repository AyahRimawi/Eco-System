'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Leaf, CreditCard, ShoppingBag, Bell, Truck, MapPin } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/taps";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState("shipping");
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const handlePaymentInputChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleShippingInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === 'credit_card') {
      await processCardPayment();
    }
  };

  const processCardPayment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to checkout');
      return;
    }
    try {
      const formattedCart = cart.map(item => ({
        product: item.id,
        quantity: item.quantity
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: formattedCart,
          paymentInfo: { ...paymentInfo, method: 'credit_card' },
          shippingAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Checkout failed');
      }
      
      const data = await response.json();
      console.log('Order placed successfully:', data);
      localStorage.setItem('lastOrderId', data.orderId); 
      clearCart();
      router.push('/orderConfirmation');
    
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error.message}`);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const isShippingValid = () => {
    return Object.values(shippingAddress).every(value => value.trim() !== '');
  };

  return (
    <>
      <Navbar />
      <PayPalScriptProvider
        options={{
          "client-id":
            "ASIiVfZXTYzsxT9mZ18IhENq08lU5oKUDYp_RGyOB1TYbxDPCL-Yl4l0zniwz1ENGxDy7s4NdsbqIzVp",
        }}
      >
        <div className="container mx-auto p-6 bg-white mt-4">
          <h1 className="text-4xl font-bold mb-8 text-green-800 flex items-center justify-center">
            <Leaf className="mr-2 text-green-600" />
            Eco-Friendly Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-green-700 flex items-center">
                <ShoppingBag className="mr-2" />
                Order Summary
              </h2>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-lg"
                >
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={item.imageUrl || "/placeholder-image.jpg"}
                    alt={item.title}
                  />
                  <div className="flex-grow ml-4">
                    <h3 className="font-semibold text-green-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-green-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="text-xl font-bold mt-4 text-right text-green-800">
                Total: ${total.toFixed(2)}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="shipping"
                    className="flex items-center justify-center p-2 border-b-2 transition-colors duration-200"
                  >
                    <Truck className="mr-2" />
                    Shipping
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="flex items-center justify-center p-2 border-b-2 transition-colors duration-200"
                  >
                    <CreditCard className="mr-2" />
                    Payment
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="shipping">
                  <h3 className="text-lg font-semibold mb-4 text-green-700 flex items-center">
                    <MapPin className="mr-2" />
                    {/* Shipping Information */}
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setActiveTab("payment");
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={shippingAddress.street}
                          onChange={handleShippingInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleShippingInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleShippingInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={handleShippingInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center"
                      disabled={!isShippingValid()}
                    >
                      <CreditCard className="mr-2" />
                      Proceed to Payment
                    </button>
                  </form>
                </TabsContent>
                <TabsContent value="payment">
                  <h3 className="text-lg font-semibold mb-4 text-green-700 flex items-center">
                    <CreditCard className="mr-2" />
                    Choose Payment Method
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-green-600"
                            name="paymentMethod"
                            value="credit_card"
                            checked={paymentMethod === "credit_card"}
                            onChange={() => setPaymentMethod("credit_card")}
                          />
                          <span className="ml-2">Credit Card</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-green-600"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                          />
                          <span className="ml-2">PayPal</span>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "credit_card" && (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label
                              htmlFor="expiryDate"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={paymentInfo.expiryDate}
                              onChange={handlePaymentInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={paymentInfo.cvv}
                              onChange={handlePaymentInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center"
                        >
                          <CreditCard className="mr-2" />
                          Pay with Credit Card
                        </button>
                      </>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="mt-4">
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            if (!isShippingValid()) {
                              alert(
                                "Please fill in all shipping information before proceeding."
                              );
                              return Promise.reject(
                                "Shipping information incomplete"
                              );
                            }
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: total.toFixed(2),
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            const token = localStorage.getItem("token");
                            if (!token) {
                              alert("You must be logged in to checkout");
                              return;
                            }
                            try {
                              const formattedCart = cart.map((item) => ({
                                product: item.id,
                                quantity: item.quantity,
                              }));
                              const response = await fetch("/api/checkout", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                  cart: formattedCart,
                                  paymentInfo: {
                                    method: "paypal",
                                    paypalOrderId: details.id,
                                  },
                                  shippingAddress,
                                }),
                              });
                              if (!response.ok) {
                                throw new Error("Failed to process order");
                              }
                              clearCart();
                              localStorage.setItem("lastOrderId", data.orderID);
                              router.push("/orderConfirmation");
                            } catch (error) {
                              console.error(
                                "Error processing PayPal order:",
                                error
                              );
                              alert("Failed to process PayPal payment");
                            }
                          }}
                        />
                      </div>
                    )}
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </PayPalScriptProvider>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default CheckoutPage;