import { FaCheckCircle, FaCalendarAlt, FaListUl, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Landing = () => {
    const features = [
        {
            icon: <FaCheckCircle className="text-4xl text-blue-500" />,
            title: "Easy Management",
            description: "Organize your tasks quickly and efficiently with our intuitive user interface."
        },
        {
            icon: <FaCalendarAlt className="text-4xl text-blue-500" />,
            title: "Deadline Management",
            description: "Set deadlines for your tasks and keep track of important dates."
        },
        {
            icon: <FaListUl className="text-4xl text-blue-500" />,
            title: "Categorization",
            description: "Sort your todos into categories for better overview and organization."
        },
        {
            icon: <FaUserPlus className="text-4xl text-blue-500" />,
            title: "Personal Account",
            description: "Secure your data and access your tasks from anywhere."
        }
    ];

    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-32 pb-16">
                <div className="text-center">
                    <h1 className="text-5xl font-semibold text-gray-800 mb-6">
                        Welcome to <span className="text-blue-500 font-bold">MyTodoApp</span>
                    </h1>
                    <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                        The modern todo app for your daily task management. 
                        Organize your tasks easily and efficiently.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link 
                            to="/login" 
                            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <FaUserPlus /> Login now
                        </Link>
                        <Link 
                            to="/signup" 
                            className="bg-white text-blue-500 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 border-2 border-blue-500"
                        >
                            <FaUserPlus /> Sign up
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Why MyTodoApp?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex flex-col items-center text-center">
                                {feature.icon}
                                <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-500 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to organize your tasks?
                    </h2>
                    <p className="text-xl mb-8">
                        Create your free account now and start with MyTodoApp!
                    </p>
                    <Link 
                        to="/signup" 
                        className="bg-white text-blue-500 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                    >
                        <FaUserPlus /> Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;
