import { ReactNode } from 'react';
import Header from './Header';
import SidebarNav from './SidebarNav';

interface InvestorLayoutProps {
    children: ReactNode;
}

export default function InvestorLayout({ children }: InvestorLayoutProps) {
    return (
        <div className="min-h-screen bg-background-dark flex flex-col">
            <Header variant="investor" showSearch searchPlaceholder="Search portfolio..." />
            <div className="flex-1 flex max-w-[1600px] mx-auto w-full">
                <SidebarNav />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
