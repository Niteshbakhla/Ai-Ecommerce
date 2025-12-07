import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";


type Props = {
            setSearch: (value: string) => void;
};




export default function SearchBar({ setSearch }: Props) {
            const [searchValue, setSearchValue] = useState("");
            const [isFocused, setIsFocused] = useState(false);



            const handleClear = () => {
                        setSearch("");
                        setSearchValue("");
            };

            return (
                        <div className="hidden md:flex flex-1 mx-8 justify-center">
                                    <div className="relative w-full max-w-2xl group">
                                                {/* Search Icon */}
                                                <Search
                                                            className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${isFocused ? "text-gray-700" : "text-gray-400"
                                                                        }`}
                                                />

                                             

                                                {/* Input */}
                                                <Input
                                                            value={searchValue}
                                                            onChange={(e) => {
                                                                        const value = e.target.value
                                                                        setSearch(value)
                                                                        setSearchValue(value)
                                                            }}
                                                            onFocus={() => setIsFocused(true)}
                                                            onBlur={() => setIsFocused(false)}
                                                            placeholder="Search for products, brands, and more..."
                                                            className={`w-full h-11 pl-12 pr-12 rounded-full border-2 bg-gray-50 
            transition-all duration-200 placeholder:text-gray-400
            ${isFocused
                                                                                    ? "border-gray-900 bg-white shadow-lg"
                                                                                    : "border-transparent hover:bg-gray-100"
                                                                        }`}
                                                />

                                                {/* Clear Button */}
                                                {searchValue && (
                                                            <button
                                                                        onClick={handleClear}
                                                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                                                            >
                                                                        <X className="h-4 w-4 text-gray-500" />
                                                            </button>
                                                )}

                                                {/* Search Results Dropdown (Optional) */}
                                                {isFocused && searchValue && (
                                                            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                                                                        <div className="p-4">
                                                                                    <p className="text-sm text-gray-500 mb-3">Recent Searches</p>
                                                                                    <div className="space-y-2">
                                                                                                {["Laptop", "Headphones", "Camera"].map((item) => (
                                                                                                            <button
                                                                                                                        key={item}
                                                                                                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                                                                                                            >
                                                                                                                        <Search className="h-4 w-4 text-gray-400" />
                                                                                                                        {item}
                                                                                                            </button>
                                                                                                ))}
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                )}
                                    </div>
                        </div>
            );
}