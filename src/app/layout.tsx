// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/layout/themeProvider'
import { Toaster } from '@/components/ui/sonner'
import { AppBreadcrumb } from '@/components/layout/breadCrumb'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'HotelStar Management System',
    description: 'Hotel management and booking system',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex h-screen bg-gray-50">
                        {/* Sidebar */}
                        <Sidebar />

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Header */}
                            <Header />

                            {/* Breadcrumb with bottom shadow */}
                            <div className="bg-white shadow-sm px-6 py-2">
                                <AppBreadcrumb />
                            </div>



                            {/* Page Content */}
                            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                                {children}
                            </main>
                        </div>
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}