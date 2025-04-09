// pages/LegalNotice.tsx
import { useEffect } from 'react';

export default function LegalNotice() {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-primary mb-6">Legal Notice</h1>
            
            <p className="text-light mb-6">Last updated: April 9, 2025</p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">1. Information according to § 5 TMG</h2>
            <p className="text-light mb-2">Kai Hartmann</p>
            <p className="text-light mb-2">Kolpingstr. 4</p>
            <p className="text-light mb-2">58332, Schwelm</p>
            <p className="text-light mb-2">Germany</p>
            <p className="text-light mb-6">contact@kai-hartmann.com</p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">2. Contact Information</h2>
           
            <p className="text-light mb-2">Email: contact@kai-hartmann.com</p>
            <p className="text-light mb-6">Website: www.kai-hartmann.com</p>
            
           
            
            <h2 className="text-2xl font-bold text-primary mb-4">3. Responsible for content according to § 55 para. 2 RStV</h2>
            <p className="text-light mb-2">Kai Hartmann</p>
            <p className="text-light mb-2">Kolpingstr. 4</p>
            <p className="text-light mb-2">58332 Schwelm</p>
            <p className="text-light mb-6">Germany</p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">4. Liability for Content</h2>
            <p className="text-light mb-6">
                As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 para. 1 TMG. 
                According to §§ 8 to 10 TMG, however, we as a service provider are not obligated to monitor transmitted or stored third-party information 
                or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law 
                remain unaffected. However, liability in this regard is only possible from the point in time at which a concrete legal violation becomes known. 
                If we become aware of any such legal violations, we will remove the relevant content immediately.
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">5. Liability for Links</h2>
            <p className="text-light mb-6">
                Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any 
                liability for these external contents. The respective provider or operator of the linked pages is always responsible for the content 
                of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not 
                recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete 
                evidence of a violation of law. If we become aware of any legal violations, we will remove such links immediately.
            </p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">6. Copyright</h2>
            <p className="text-light mb-6">
                The content and works created by the site operators on these pages are subject to copyright law. The duplication, processing, distribution, 
                and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and 
                copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, 
                the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of 
                a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.
            </p>
        </div>
    );
}