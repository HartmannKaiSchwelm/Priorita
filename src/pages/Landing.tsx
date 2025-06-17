import { FaCircleCheck, FaCalendar, FaListUl, FaUserPlus, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Landing = () => {
    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Section */}
            <div className="container mx-auto px-6 pt-24 pb-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl font-normal text-black mb-8 tracking-tight">
                        Todos that don't get in your way
                    </h1>
                    
                    <p className="text-lg text-black mb-12 leading-relaxed max-w-xl mx-auto">
                        A clean web interface for managing your daily tasks. 
                        Organized by priority and deadlines.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                       <Link to="/signup" className="bg-white text-blue-500 px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2">
                            <FaUserPlus /> Sign up
                        </Link>
                        <Link 
                            to="/login" 
                            className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Live Demo Section - Authentic App Design */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black">
                            📋 Todos
                        </h2>
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Priority Section */}
                            <div className="w-full lg:flex-1">
                                <h3 className="text-lg font-semibold mb-2 text-black">By Priority (no deadline)</h3>
                                <ul className="space-y-2">
                                    <li className="border bg-sec text-light p-3 rounded">
                                        <p className="text-center border-b border-gray-600 font-bold mb-2 pb-1">Work</p>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <span className="break-words">Finish project documentation</span>
                                            <button className="bg-light text-dark px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
                                                <span className="flex items-center gap-2">
                                                    <FaRegTrashCan /> Delete
                                                </span>
                                            </button>
                                        </div>
                                        <p className="text-sm mt-2 text-gray-300">Priority: High</p>
                                    </li>
                                    
                                    <li className="border bg-sec text-light p-3 rounded">
                                        <p className="text-center border-b border-gray-600 font-bold mb-2 pb-1">Personal</p>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <span className="break-words">Buy groceries for weekend</span>
                                            <button className="bg-light text-dark px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
                                                <span className="flex items-center gap-2">
                                                    <FaRegTrashCan /> Delete
                                                </span>
                                            </button>
                                        </div>
                                        <p className="text-sm mt-2 text-gray-300">Priority: Medium</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Deadline Section */}
                            <div className="w-full lg:flex-1">
                                <h3 className="text-lg font-semibold mb-2 text-black">By Deadline</h3>
                                <ul className="space-y-2">
                                    <li className="border bg-sec text-light p-3 rounded">
                                        <p className="text-center border-b border-gray-600 font-bold mb-2 pb-1">Work</p>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <span className="break-words">Prepare presentation slides</span>
                                            <button className="bg-light text-dark px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
                                                <span className="flex items-center gap-2">
                                                    <FaRegTrashCan /> Delete
                                                </span>
                                            </button>
                                        </div>
                                        <p className="text-sm mt-2 text-gray-300">
                                            Deadline: {new Date(Date.now() + 86400000).toLocaleDateString()}
                                        </p>
                                    </li>
                                    
                                    <li className="border bg-sec text-light p-3 rounded">
                                        <p className="text-center border-b border-gray-600 font-bold mb-2 pb-1">Personal</p>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <span className="break-words">Schedule dentist appointment</span>
                                            <button className="bg-light text-dark px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
                                                <span className="flex items-center gap-2">
                                                    <FaRegTrashCan /> Delete
                                                </span>
                                            </button>
                                        </div>
                                        <p className="text-sm mt-2 text-gray-300">
                                            Deadline: {new Date(Date.now() + 172800000).toLocaleDateString()}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-medium text-black mb-12 text-center">
                        Built for organization
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FaCircleCheck className="text-2xl text-sec" />
                            </div>
                            <h3 className="font-medium text-black mb-2">Priority sorting</h3>
                            <p className="text-sm text-black leading-relaxed">
                                Tasks without deadlines sorted by High, Medium, Low priority
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FaCalendar className="text-2xl text-sec" />
                            </div>
                            <h3 className="font-medium text-black mb-2">Deadline tracking</h3>
                            <p className="text-sm text-black leading-relaxed">
                                Time-sensitive tasks organized by due date
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FaListUl className="text-2xl text-sec" />
                            </div>
                            <h3 className="font-medium text-black mb-2">Category system</h3>
                            <p className="text-sm text-black leading-relaxed">
                                Organize tasks by Work, Personal, or custom categories
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple CTA */}
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-2xl font-medium text-black mb-6">
                        Start organizing today
                    </h2>
                    <p className="text-black mb-8">
                        Create your account and add your first task in under a minute.
                    </p>
                    <button className="bg-white text-blue-500 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto">
                        <FaUserPlus /> Create account
                    </button>
                </div>
            </div>

            {/* Minimal Footer */}
            <div className="border-t border-white/20 py-8">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-black">MyTodoApp</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;