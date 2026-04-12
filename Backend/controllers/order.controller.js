import Order from "../models/order.modal.js";
import Shop from "../models/shop.modal.js";
import User from "../models/user.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { cartItems, deliveryAddress, paymentMethod, totalAmount } = req.body;
        if (cartItems.length === 0 || !cartItems) {
            return res.stats(400).json({
                success: false,
                message: 'cart items not found'
            })
        }
        if (!deliveryAddress || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({
                success: false,
                message: 'send the compelete delivery address'
            })
        }
        const groupItemsByShop = {}
        cartItems.forEach(item => {
            const shopId = item.shop
            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = [];
            }
            groupItemsByShop[shopId].push(item)
        });
        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate('owner')
            if (!shop) {
                return res.status(400).json({
                    success: false,
                    message: 'shop not found'
                })
            }
            const items = groupItemsByShop[shopId];
            const subtotal = items.reduce((sum, i) => sum += Number(i.price) * Number(i.quantity), 0)
            return {
                shop: shop._id,
                owner: shop.owner._id,
                subtotal,
                shopOrderItems: items.map((i) => ({
                    item: i.id,
                    price: i.price,
                    quantity: i.quantity,
                    name: i.name,
                }))
            }
        }))


        const newOrder = await Order.create({
            user: req.user,
            paymentMehthod: 'cod',
            totalAmount,
            deliveryAddress,
            shopOrders
        })

        return res.status(201).json({
            success: true,
            message: 'shop oder created successfully',
            newOrder,
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            messga: error.message
        })
    }
}


export const getMyOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        let orders;

        if (user.role === 'user') {
            orders = await Order.find({ user: req.user })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "name")
                .populate("shopOrders.shopOrderItems.item", "name price image");
        } else {
            orders = await Order.find({ "shopOrders.owner": req.user })
                .sort({ createdAt: -1 })
                .populate("user")
                .populate("shopOrders.shopOrderItems.item", "name price image");
        }

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found'
            });
        }

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}