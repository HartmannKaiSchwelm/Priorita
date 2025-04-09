// components/Footer.tsx
import { FaTwitter, FaGithub,  FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-transparent text-light p-4 mt-7">
            <div className="container mx-auto flex justify-evenly items-center">
                <p>Footer</p>
                
                {/* Legal Links */}
                <div className="flex space-x-4">
                    <a href="/privacy-policy" className="hover:text-primary">
                        Privacy Policy
                    </a>
                    <a href="/legal-notice" className="hover:text-primary">
                        Legal Notice
                    </a>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4">
                    <a href="https://github.com/HartmannKaiSchwelm/Priorita" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="hover:text-primary text-xl" />
                    </a>
                    <a href="https://x.com/KaiHartmannDev" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="hover:text-primary text-xl" />
                    </a>
                    <a href="https://www.linkedin.com/in/kai-hartmann-379862212/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className="hover:text-primary text-xl" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
