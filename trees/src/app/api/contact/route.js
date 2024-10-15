import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Contact from '../../../models/contact';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, topic, message } = body;

        const newContact = new Contact({
            name,
            email,
            topic,
            message,
        });

        await newContact.save();

        return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return NextResponse.json({ message: 'An error occurred while submitting the form' }, { status: 500 });
    }
}