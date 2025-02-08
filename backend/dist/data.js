"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
exports.Products = [
    {
        category: "Processor",
        brand: "Intel",
        model: "Core i9-13900K",
        description: "High-end gaming and productivity processor.",
        price: 589,
        stock: 15,
        images: ["https://example.com/intel-i9.jpg"],
        specifications: {
            cores: 24,
            threads: 32,
            baseClock: "3.0 GHz",
            boostClock: "5.8 GHz",
        },
    },
    {
        category: "Processor",
        brand: "AMD",
        model: "Ryzen 9 7950X",
        description: "Flagship AMD processor with Zen 4 architecture.",
        price: 699,
        stock: 10,
        images: ["https://example.com/ryzen9-7950x.jpg"],
        specifications: {
            cores: 16,
            threads: 32,
            baseClock: "4.5 GHz",
            boostClock: "5.7 GHz",
        },
    },
    {
        category: "Motherboard",
        brand: "ASUS",
        model: "ROG Strix Z790-E",
        description: "Gaming motherboard with DDR5 support.",
        price: 399,
        stock: 20,
        images: ["https://example.com/asus-z790.jpg"],
        specifications: {
            socket: "LGA 1700",
            chipset: "Z790",
            memorySlots: 4,
            maxMemory: "128GB",
        },
    },
    {
        category: "Motherboard",
        brand: "MSI",
        model: "MEG X670E Godlike",
        description: "Premium AMD motherboard with extensive features.",
        price: 999,
        stock: 5,
        images: ["https://example.com/msi-x670e.jpg"],
        specifications: {
            socket: "AM5",
            chipset: "X670E",
            memorySlots: 4,
            maxMemory: "128GB",
        },
    },
    {
        category: "RAM",
        brand: "Corsair",
        model: "Vengeance RGB 32GB",
        description: "High-speed DDR5 RAM with RGB lighting.",
        price: 179,
        stock: 25,
        images: ["https://example.com/corsair-rgb.jpg"],
        specifications: {
            type: "DDR5",
            speed: "6000MHz",
            latency: "CL30",
        },
    },
    {
        category: "RAM",
        brand: "G.Skill",
        model: "Trident Z5 32GB",
        description: "High-performance DDR5 RAM for gaming.",
        price: 189,
        stock: 30,
        images: ["https://example.com/gskill-z5.jpg"],
        specifications: {
            type: "DDR5",
            speed: "6400MHz",
            latency: "CL32",
        },
    },
    {
        category: "Graphic Card",
        brand: "NVIDIA",
        model: "RTX 4090",
        description: "Flagship GPU for 4K gaming and AI workloads.",
        price: 1599,
        stock: 8,
        images: ["https://example.com/rtx4090.jpg"],
        specifications: {
            vram: "24GB GDDR6X",
            cudaCores: 16384,
            boostClock: "2.52 GHz",
        },
    },
    {
        category: "Graphic Card",
        brand: "AMD",
        model: "Radeon RX 7900 XTX",
        description: "High-end GPU for gaming and content creation.",
        price: 999,
        stock: 12,
        images: ["https://example.com/rx7900xtx.jpg"],
        specifications: {
            vram: "24GB GDDR6",
            streamProcessors: 6144,
            boostClock: "2.5 GHz",
        },
    },
    {
        category: "Accessories",
        brand: "Logitech",
        model: "MX Master 3S",
        description: "Advanced ergonomic wireless mouse.",
        price: 99,
        stock: 50,
        images: ["https://example.com/mx-master3s.jpg"],
        specifications: {
            dpi: 8000,
            connectivity: "Bluetooth & USB",
            batteryLife: "70 days",
        },
    },
    {
        category: "Accessories",
        brand: "SteelSeries",
        model: "Arctis Nova Pro Wireless",
        description: "Premium wireless gaming headset with ANC.",
        price: 349,
        stock: 15,
        images: ["https://example.com/arctis-nova.jpg"],
        specifications: {
            connectivity: "2.4GHz & Bluetooth",
            batteryLife: "40 hours",
            drivers: "High-fidelity 40mm",
        },
    },
];
