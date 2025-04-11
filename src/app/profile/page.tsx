import UpdateButton from "@/components/UpdateButton";
import { updateUser } from "@/lib/actions";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import Link from "next/link";
import './profile.css';

const ProfilePage = async () => {
    const wixClient = await wixClientServer();
    const user = await wixClient.members.getCurrentMember({
        fieldsets: [members.Set.FULL],
    });
    console.log(user);

    if (!user.member?.contactId) {
        return (
            <div className="unauthorized-container">
                <div className="unauthorized-card">
                    <h1 className="unauthorized-title">Access Denied</h1>
                    <p className="unauthorized-message">You need to be logged in to view this page</p>
                    <Link
                        href="/login"
                        className="unauthorized-button"
                    >
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    const orderRes = await wixClient.orders.searchOrders({
        search: { filter: { "buyerInfo.contactId": { $eq: user.member.contactId } } },
    });

    return (
        <div className="profile-container px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <div className="profile-header">
                <h1 className="profile-title">Your Account</h1>
            </div>

            <div className="profile-grid">
                {/* Profile Section */}
                <div className="profile-card">
                    <div className="flex justify-between items-center flex-row-reverse card-header profile-header-gradient">
                        <div className="">
                            <h2 className="card-title">Profile Information</h2>
                            <p className="card-subtitle">Update your personal details</p>
                        </div>

                        <h2 className="text-white text-2xl">
                            Welcome back, <br />
                            <span className="opacity-90 text-[25px]">{user.member?.contact?.firstName || 'User'}!</span>
                        </h2>
                    </div>
                    <form action={updateUser} className="card-form">
                        <input type="text" hidden name="id" value={user.member.contactId} />

                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder={user.member?.profile?.nickname || "Your Username"}
                                className="form-input"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder={user?.member.contact?.firstName || "Your First Name"}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder={user.member?.contact?.lastName || "Your Last Name"}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder={user.member?.loginEmail || "Your Email"}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder={
                                    (user.member?.contact?.phones &&
                                        user.member?.contact?.phones[0]) ||
                                    "Your Phone"
                                }
                                className="form-input"
                            />
                        </div>

                        <div className="flex justify-center items-center w-full">
                            <UpdateButton />
                        </div>
                    </form>
                </div>

                {/* Orders Section */}
                <div className="orders-card">
                    <div className="card-header orders-header-gradient">
                        <h2 className="card-title">Order History</h2>
                        <p className="card-subtitle">Track your purchases and returns</p>
                    </div>

                    <div className="orders-content">
                        {orderRes.orders.length === 0 ? (
                            <div className="empty-orders">
                                <div className="empty-orders-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="empty-orders-title">No orders yet</h3>
                                <p className="empty-orders-message">Start shopping to see your orders here</p>
                                <Link
                                    href="/products"
                                    className="empty-orders-button"
                                >
                                    Explore Products
                                </Link>
                            </div>
                        ) : (
                            <div className="orders-list">
                                <div className="orders-list-header">
                                    <span>Order ID</span>
                                    <span>Amount</span>
                                    <span>Date</span>
                                    <span>Status</span>
                                </div>
                                {orderRes.orders.map((order) => (
                                    <Link
                                        href={`/orders/${order._id}`}
                                        key={order._id}
                                        className="order-item"
                                    >
                                        <span className="order-id">{order._id?.substring(0, 8)}...</span>
                                        <span className="order-amount">
                                            ${order.priceSummary?.subtotal?.amount}
                                        </span>
                                        {order._createdDate && (
                                            <span className="order-date">
                                                {new Date(order._createdDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        )}
                                        <span className="order-status">
                                            <span className={`status-badge ${order.status === 'FULFILLED' ? 'fulfilled' :
                                                order.status === 'PENDING' ? 'pending' :
                                                    'default'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;