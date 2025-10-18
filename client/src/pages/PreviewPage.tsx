import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { createPageUrl } from '@/utils';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '../utils/cn';

export default function PreviewPage() {
    const [url, setUrl] = useState<string | null>(null);
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop'); // 'desktop', 'tablet', 'mobile'
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const urlToPreview = params.get('url');

            if (urlToPreview) {
                if (urlToPreview.startsWith('http://') || urlToPreview.startsWith('https://')) {
                    setUrl(urlToPreview);
                } else {
                    setError('Invalid URL format. Please provide a full URL starting with http:// or https://');
                }
            }
        } catch (e) {
            console.error("Error parsing URL", e);
            setError("Could not parse the provided URL.");
        }
    }, []);

    const deviceWidths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px',
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Preview Error</h1>
                <p className="text-lg text-gray-300 mb-6">{error}</p>
                <Link to={'Home'}>
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
        );
    }

    if (!url) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Website Previewer</h1>
                <p className="text-lg text-gray-300 mb-2">To preview a website, add a URL to the address bar.</p>
                <p className="text-gray-400">
                    Example: <code className="bg-slate-700 p-1 rounded-sm text-cyan-300">/Preview?url=https://example.com</code>
                </p>
                 <div className="mt-6">
                    <Link to={'Home'}>
                        <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white">Back to Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-800">
            {/* Header Controls */}
            <header className="flex-shrink-0 bg-slate-900 text-white p-3 flex items-center justify-between shadow-lg z-10">
                <div className="flex items-center gap-4">
                     <Link to={'Home'}>
                        <Button variant="ghost" size="icon" className="hover:bg-slate-700">
                            <X className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-sm text-gray-400">Previewing:</span>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline truncate max-w-xs">
                            {url}
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={device === 'desktop' ? 'secondary' : 'ghost'}
                        size="icon"
                        onClick={() => setDevice('desktop')}
                        className={cn("hover:bg-slate-700", device === 'desktop' && 'bg-slate-700')}
                    >
                        <Monitor className="w-5 h-5" />
                    </Button>
                    <Button
                        variant={device === 'tablet' ? 'secondary' : 'ghost'}
                        size="icon"
                        onClick={() => setDevice('tablet')}
                        className={cn("hover:bg-slate-700", device === 'tablet' && 'bg-slate-700')}
                    >
                        <Tablet className="w-5 h-5" />
                    </Button>
                    <Button
                        variant={device === 'mobile' ? 'secondary' : 'ghost'}
                        size="icon"
                        onClick={() => setDevice('mobile')}
                        className={cn("hover:bg-slate-700", device === 'mobile' && 'bg-slate-700')}
                    >
                        <Smartphone className="w-5 h-5" />
                    </Button>
                </div>
                
                <div className="w-24"></div>

            </header>

            {/* Iframe Container */}
            <main className="flex-grow flex justify-center items-center p-4 overflow-auto">
                <div 
                    className="bg-white shadow-2xl rounded-lg transition-all duration-500 ease-in-out h-full"
                    style={{ width: deviceWidths[device] }}
                >
                    <iframe
                        src={url}
                        title="Website Preview"
                        className="w-full h-full border-0 rounded-lg"
                        sandbox="allow-scripts allow-same-origin"
                    ></iframe>
                </div>
            </main>
        </div>
    );
}