// components/Footer.tsx
import { FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-transparent text-light p-4 mt-7">
            <div className="container mx-auto flex justify-evenly items-center">
                <p>Footer</p>

                {/* Social Icons */}
                <div className="flex space-x-4">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="hover:text-primary text-xl" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="hover:text-primary text-xl" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
