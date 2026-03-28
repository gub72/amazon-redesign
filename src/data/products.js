// an array (products) of arrays (product rows)
const productsData = [
  [
    {
      id: "537338",
      name: "Apple iPhone 13, 128GB, Blue - Unlocked (Renewed)",
      price: "814.99",
      image: "/assets/products/iphone.png",
      rating: 4.5,
      brand: "Apple",
      category: "Smartphones",
      description:
        "The iPhone 13 features a 6.1-inch Super Retina XDR display with ceramic shield front cover, 12MP dual-camera system with Night mode and Dolby Vision, the powerful A15 Bionic chip, and up to 19 hours of video playback. This renewed unit has been professionally inspected, tested, and certified to look and work like new.",
      features: [
        "6.1-inch Super Retina XDR display",
        "A15 Bionic chip for blazing performance",
        "Dual 12MP camera system with Night mode",
        "Up to 19 hours video playback",
        "5G capable — superfast connections",
        "Ceramic Shield — tougher than any smartphone glass",
        "Splash, water, and dust resistant (IP68)",
      ],
    },
    {
      id: "537339",
      name: "Samsung Galaxy S21 5G, 128GB, Phantom Gray",
      price: "599.99",
      image: "/assets/products/samsung.png",
      rating: 4.5,
      brand: "Samsung",
      category: "Smartphones",
      description:
        "The Galaxy S21 5G features a 6.2-inch Dynamic AMOLED 2X display, triple-camera system with 64MP telephoto, the Exynos 2100 processor, and 4000mAh battery. Experience next-generation 5G connectivity and all-day performance in a sleek Phantom Gray finish.",
      features: [
        "6.2-inch Dynamic AMOLED 2X 120Hz display",
        "Triple rear camera: 12MP + 12MP + 64MP",
        "Exynos 2100 / Snapdragon 888 processor",
        "4000mAh battery with 25W fast charging",
        "5G ready for ultra-fast speeds",
        "IP68 water and dust resistance",
        "Android 11, upgradeable to Android 14",
      ],
    },
    {
      id: "537340",
      name: "Echo (4th generation) With Alexa",
      price: "1299.99",
      image: "/assets/products/echo.png",
      rating: 5,
      brand: "Amazon",
      category: "Smart Home",
      description:
        "Meet the all-new Echo — our best-sounding Echo ever. The premium sound is powered by a 3-inch woofer and two tweeters that deliver rich, detailed audio. Built-in Zigbee hub lets you set up compatible smart home devices without a separate hub. Ask Alexa to play music, control smart home devices, set timers, get answers, and more.",
      features: [
        "Premium sound with 3-inch woofer + dual tweeters",
        "Built-in Zigbee smart home hub",
        "Spherical design with LED light ring",
        "Always-responsive Alexa voice assistant",
        "Stream from Spotify, Amazon Music, Apple Music & more",
        "Set alarms, reminders, and routines hands-free",
        "Privacy controls with physical microphone off button",
      ],
    },
  ],
  [
    {
      id: "537341",
      name: "2021 Apple iPad Pro (Wi-Fi, 128GB) - Silver",
      price: "599.99",
      image: "/assets/products/ipad.png",
      rating: 5,
      brand: "Apple",
      category: "Tablets",
      description:
        "The iPad Pro is powered by the Apple M1 chip for extreme performance, features a stunning Liquid Retina XDR display with ProMotion 120Hz, Thunderbolt connectivity, and an ultra-wide front camera with Centre Stage. It's the most advanced iPad ever made.",
      features: [
        "Apple M1 chip — the same chip in Mac",
        "12.9-inch Liquid Retina XDR display (2732×2048)",
        "ProMotion technology up to 120Hz",
        "Thunderbolt / USB 4 port",
        "Centre Stage — camera keeps you in frame",
        "Up to 10 hours of battery life",
        "5G capable model available",
      ],
    },
    {
      id: "537342",
      name: "Apple Watch Series 3 - Silver Aluminum Case",
      price: "139.99",
      image: "/assets/products/apple-watch.png",
      rating: 4.5,
      brand: "Apple",
      category: "Wearables",
      description:
        "Apple Watch Series 3 lets you make calls, send texts, and stream music right from your wrist — with or without your iPhone nearby. It's water resistant to 50 meters, has built-in GPS for accurate workout stats, and features an altimeter to track how many floors you climb.",
      features: [
        "Built-in GPS and altimeter",
        "Water resistant to 50 meters (swimproof)",
        "Heart rate monitoring",
        "Make calls and send messages from your wrist",
        "Stream music to Bluetooth headphones",
        "Supports watchOS with fitness and health tracking",
        "18-hour battery life",
      ],
    },
  ],
  [
    {
      id: "537343",
      name: "SAMSUNG Odyssey 32-Inch WQHD (2560x1440) Gaming Monitor",
      price: "199.99",
      image: "/assets/products/samsung-tv.png",
      rating: 3.5,
      brand: "Samsung",
      category: "Monitors",
      description:
        "The Samsung Odyssey 32-inch curved gaming monitor delivers breathtaking WQHD resolution and a 165Hz refresh rate for smooth, responsive gameplay. Its 1ms response time and FreeSync Premium Pro technology eliminate screen tearing and stuttering to keep you immersed in the action.",
      features: [
        "32-inch WQHD (2560×1440) curved VA panel",
        "165Hz refresh rate for ultra-smooth gaming",
        "1ms response time (MPRT)",
        "AMD FreeSync Premium Pro — tear-free gaming",
        "HDR10 support with 250nit peak brightness",
        "1000R curvature for immersive experience",
        "HDMI 2.0 + DisplayPort 1.4 inputs",
      ],
    },
  ],
];

export default productsData;