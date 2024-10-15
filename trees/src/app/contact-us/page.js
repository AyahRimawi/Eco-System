'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        topic: 'general'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Name is required";
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
        }
        if (!formData.message.trim()) tempErrors.message = "Message is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setIsSubmitted(true);
                    setFormData({ name: '', email: '', message: '', topic: 'general' });
                } else {
                    const errorData = await response.json();
                    setErrors({ submit: errorData.message || 'An error occurred. Please try again.' });
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setErrors({ submit: 'An error occurred. Please try again.' });
            }
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-screen bg-white p-4"
            >
                <h2 className="text-4xl font-bold text-emerald-600 mb-4">Thank You!</h2>
                <p className="text-xl text-gray-700 text-center max-w-md">
                    Your message has been received. We'll get back to you soon!
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition duration-300 text-lg font-semibold shadow-lg"
                >
                    Send Another Message
                </motion.button>
            </motion.div>
        );
    }

    return (
        <>
            <Navbar/>
        <div className="min-h-screen mt-4 bg-white p-4 flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
            >
                <h2 className="text-4xl font-bold text-emerald-600 mb-8 text-center">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
                            placeholder="your@email.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                        <select
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                        >
                            <option value="general">General Inquiry</option>
                            <option value="support">Support</option>
                            <option value="feedback">Feedback</option>
                            <option value="partnership">Partnership</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
                            placeholder="Your message here..."
                        ></motion.textarea>
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>
                    {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300 text-lg font-semibold shadow-md"
                    >
                        Send Message
                    </motion.button>
                </form>
            </motion.div>
            </div>
            <Footer/>
            </>
    );
};

export default ContactUs;