// pages/PrivacyPolicy.tsx
import { useEffect } from 'react';

export default function PrivacyPolicy() {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
            
            <p className="text-light mb-6">Last updated: April 9, 2025</p>
            
            <p className="text-light mb-6">
                We value your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and store your personal 
                information in accordance with the General Data Protection Regulation (GDPR).
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">1. Data Controller</h2>
            <p className="text-light mb-2"><strong>Name:</strong> Kai Hartmann</p>
            <p className="text-light mb-6"><strong>Email:</strong> contact@kai-hartmann.com</p>
          
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">2. Hosting</h2>
            <p className="text-light mb-2">
                This website is hosted via <strong>Netlify</strong>, a service provided by Netlify Inc., 
                44 Montgomery Street, Suite 300, San Francisco, California 94104, USA.
            </p>
            <p className="text-light mb-2">
                Netlify may collect technical data such as IP address, browser type, 
                and usage logs as part of its service.
            </p>
            <p className="text-light mb-2">
                For more information, see Netlify's{' '}
                <a href="https://www.netlify.com/privacy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                </a>.
            </p>
            <p className="text-light mb-6">
                <strong>Legal basis:</strong> Art. 6 (1) (f) GDPR – legitimate interest in reliable and secure website hosting.
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">3. Google Fonts</h2>
            <p className="text-light mb-2">
                We use <strong>Google Fonts</strong> for consistent and visually appealing typography. 
                Fonts are loaded from Google's Content Delivery Network (CDN), which may process your IP address.
            </p>
            <p className="text-light mb-2">
                <strong>Service provider:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland
            </p>
            <p className="text-light mb-2">
                <strong>Privacy Policy:</strong>{' '}
                <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    https://policies.google.com/privacy
                </a>
            </p>
            <p className="text-light mb-6">
                <strong>Legal basis:</strong> Art. 6 (1) (f) GDPR – legitimate interest in proper website presentation.
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">4. User Registration (ToDo App)</h2>
            <p className="text-light mb-2">
                You can register to use our ToDo app via <strong>email-based authentication</strong> through <strong>Supabase</strong>. 
                We collect and store the following personal data:
            </p>
            <ul className="list-disc pl-8 mb-2 text-light">
                <li className="mb-1">Your email address</li>
                <li className="mb-1">Authentication metadata (e.g., timestamps, IP)</li>
                <li className="mb-1">A hashed version of your password (not readable in plain text)</li>
            </ul>
            <p className="text-light mb-2">
                <strong>Service provider:</strong> Supabase Inc., 970 Toa Payoh North, Singapore 318992
            </p>
            <p className="text-light mb-2">
                <strong>Privacy Policy:</strong>{' '}
                <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    https://supabase.com/privacy
                </a>
            </p>
            <p className="text-light mb-2">
                Please note that Supabase is located outside the EU/EEA.
                We ensure appropriate safeguards are in place in accordance with <strong>Art. 46 GDPR</strong>, 
                such as <strong>Standard Contractual Clauses (SCCs)</strong> to ensure your data is protected.
            </p>
            <p className="text-light mb-6">
                <strong>Legal basis:</strong> Art. 6 (1) (b) GDPR – necessary for the performance of a contract (user account creation).
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">5. Data Storage and Retention</h2>
            <p className="text-light mb-6">
                Your personal data will only be stored for as long as necessary for the purpose for which it was collected, 
                or as required by law. Account data will be deleted upon request or after account inactivity 
                for more than 24 months (subject to change).
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">6. No Analytics or Tracking</h2>
            <p className="text-light mb-6">
                We do <strong>not</strong> use analytics, tracking tools, or marketing cookies.
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">7. Your Rights under GDPR</h2>
            <p className="text-light mb-2">You have the right to:</p>
            <ul className="list-disc pl-8 mb-2 text-light">
                <li className="mb-1">Access your personal data</li>
                <li className="mb-1">Rectify inaccurate data</li>
                <li className="mb-1">Request deletion ("right to be forgotten")</li>
                <li className="mb-1">Restrict or object to processing</li>
                <li className="mb-1">Request data portability</li>
                <li className="mb-1">Withdraw consent at any time (if processing is based on consent)</li>
            </ul>
            <p className="text-light mb-6">
                To exercise your rights, please contact us at: <strong>contact@kai-hartmann.com</strong>
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">8. Changes to this Policy</h2>
            <p className="text-light mb-6">
                We may update this policy from time to time to comply with legal requirements or improve transparency. 
                Changes will be posted on this page with an updated date.
            </p>
            
            <hr className="border-gray-300 my-6" />
            
            <h2 className="text-2xl font-bold text-primary mb-4">9. Contact</h2>
            <p className="text-light mb-2">If you have any questions regarding this policy or how your data is handled, contact:</p>
            <p className="text-light mb-2">📧 contact@kai-hartmann.com</p>
            <p className="text-light mb-6">📞 +49 176-39069887</p>
        </div>
    );
}