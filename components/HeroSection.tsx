export default function HeroSection() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                    The most realistic voice AI platform
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                    AI voice models and products powering millions of developers, creators, and enterprises. From
                    low-latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                        SIGN UP
                    </button>
                    <button className="border border-gray-300 text-black px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
                        CONTACT SALES
                    </button>
                </div>
            </div>
        </section>
    )
}