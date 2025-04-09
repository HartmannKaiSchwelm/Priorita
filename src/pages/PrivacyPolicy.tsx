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
            
            <h2 className="text-2xl font-bold text-primary mb-4">1. Data Controller</h2>
            <p className="text-light mb-2">Name: Kai Hartmann</p>
            <p className="text-light mb-2">Email: contact@kai-hartmann.com</p>
          
            
            <h2 className="text-2xl font-bold text-primary mb-4">2. Hosting</h2>
            <p className="text-light mb-2">
                This website is hosted via Netlify, a service provided by Netlify Inc., 
                44 Montgomery Street, Suite 300, San Francisco, California 94104, USA.
            </p>
            <p className="text-light mb-2">
                Netlify may collect technical data such as IP address, browser type, 
                and usage logs as part of its service.
            </p>
            <p className="text-light mb-6">
                For more information, see Netlify's Privacy Policy: 
                <a href="https://www.netlify.com/privacy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    https://www.netlify.com/privacy/
                </a>
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">3. Google Fonts</h2>
            <p className="text-light mb-2">
                We use Google Fonts to provide consistent and visually appealing typography.
            </p>
            <p className="text-light mb-2">
                Fonts are loaded via Google's CDN, which may involve processing your IP address.
            </p>
            <p className="text-light mb-2">
                Service provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.
            </p>
            <p className="text-light mb-2">
                Privacy Policy: 
                <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    https://policies.google.com/privacy
                </a>
            </p>
            <p className="text-light mb-6">
                Legal basis: Art. 6 (1) (f) GDPR – legitimate interest in the proper presentation of our site.
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">4. Registration (ToDo App)</h2>
            <p className="text-light mb-2">
                Our ToDo app offers a registration feature using email-based authentication via Supabase.
            </p>
            <p className="text-light mb-2">
                We collect and store your email address and authentication metadata in our Supabase database.
            </p>
            <p className="text-light mb-2">
                Service provider: Supabase Inc., 970 Toa Payoh North, Singapore 318992.
            </p>
            <p className="text-light mb-2">
                Privacy Policy: 
                <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    https://supabase.com/privacy
                </a>
            </p>
            <p className="text-light mb-2">
                Your data is stored securely and is not shared with third parties unless required by law.
            </p>
            <p className="text-light mb-6">
                Legal basis: Art. 6 (1) (b) GDPR – required for user account creation.
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">5. Your Rights under GDPR</h2>
            <p className="text-light mb-2">You have the right to:</p>
            <ul className="list-disc pl-8 mb-6 text-light">
                <li className="mb-1">Access your personal data</li>
                <li className="mb-1">Correct inaccurate data</li>
                <li className="mb-1">Delete your data ("right to be forgotten")</li>
                <li className="mb-1">Restrict or object to processing</li>
                <li className="mb-1">Request data portability</li>
                <li className="mb-1">Withdraw consent at any time</li>
            </ul>
            <p className="text-light mb-6">
                To exercise these rights, contact us at: contact@kai-hartmann.com
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">6. Changes to this Policy</h2>
            <p className="text-light mb-2">
                We may update this policy as needed to comply with legal requirements or improve transparency.
            </p>
            <p className="text-light mb-6">
                Changes will be posted on this page with an updated revision date.
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">7. Contact</h2>
            <p className="text-light mb-2">If you have any questions regarding this privacy policy, contact:</p>
            <p className="text-light mb-6">📧 contact@kai-hartmann.com</p>
        </div>
    );
}