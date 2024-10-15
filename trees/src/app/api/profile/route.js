import { authMiddleware } from '../../../middlewares/auth';
import connectDB from '../../../lib/mongodb';
import Users from '../../../models/users';
import Events from '../../../models/events';
import Orders from '../../../models/orders';
import Products from '../../../models/products';

const handler = async (req) => {
    if (req.method === 'GET') {
        await connectDB();
        try {
            const user = await Users.findById(req.userId).select('-password').lean();
            if (!user) {
                return new Response(JSON.stringify({ message: 'User not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            // Fetch event details for registeredEvents
            const eventIds = user.registeredEvents.map(id => id.toString());
            const events = await Events.find({ _id: { $in: eventIds } })
                .select('name description date location category')
                .lean();

            // Replace registeredEvents with full event details
            user.registeredEvents = events;

            // Fetch orders for the user
            const orders = await Orders.find({ user: req.userId })
                .populate('products.product', 'title imageUrl price')
                .lean();

            // Add orders to the user object
            user.orders = orders;

            return new Response(JSON.stringify(user), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return new Response(JSON.stringify({ message: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else if (req.method === 'PUT') {
        await connectDB();
        try {
            const { name, email } = await req.json();
            const user = await Users.findById(req.userId);
            if (!user) {
                return new Response(JSON.stringify({ message: 'User not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            if (name) user.name = name;
            if (email) user.email = email;
            await user.save();
            return new Response(JSON.stringify(user), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error updating user profile:', error);
            return new Response(JSON.stringify({ message: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

export const GET = authMiddleware(handler);
export const PUT = authMiddleware(handler);