/** US English translation of the product catalog. Keys are the ids used in src/datos/catalogo*.js. */
export default {
  carreras: {
    sistemas: { nombre: 'Systems Engineering', corto: 'Systems' },
    multimedia: { nombre: 'Multimedia Engineering', corto: 'Multimedia' },
  },
  categorias: {
    web: 'Web development',
    movil: 'Mobile development',
    escritorio: 'Desktop and automation',
    datos: 'Databases and analytics',
    infra: 'Infrastructure, networks, and support',
    consultoria: 'Quality, security, and consulting',
    grafico: 'Graphic design and brand identity',
    editorial: 'Editorial design',
    uxui: 'UX/UI and web',
    animacion: 'Animation and motion graphics',
    tresd: 'Characters, 3D, and rendering',
    audiovisual: 'Video and photography',
    audio: 'Audio',
    interactivos: 'Interactive and immersive',
  },
  productos: {
    // web
    'sis-landing': {
      nombre: 'Landing page',
      descripcion: 'One-page site to showcase a product, service, or event and capture leads.',
      unidad: { singular: 'section', plural: 'sections' },
      entregables: ['Published responsive page', 'Contact form or WhatsApp link', 'Basic speed and SEO optimization'],
      costos: ['Domain name (1 year)', 'Hosting (1 year)'],
    },
    'sis-sitio-corporativo': {
      nombre: 'Corporate or institutional website',
      descripcion: 'Multi-page site for a company or organization: about us, services, contact, and more.',
      unidad: { singular: 'page', plural: 'pages' },
      entregables: ['Responsive site with a menu and inner pages', 'Contact form and map', 'Short guide to update the content'],
      costos: ['Domain name (1 year)', 'Hosting (1 year)'],
    },
    'sis-ecommerce': {
      nombre: 'Online store (e-commerce)',
      descripcion: 'Store with a catalog, cart, online payments, and a dashboard to manage orders.',
      unidad: { singular: 'module', plural: 'modules' },
      entregables: ['Catalog with categories and search', 'Cart and online checkout', 'Orders and inventory dashboard'],
      costos: ['Domain name (1 year)', 'High-performance hosting (1 year)'],
    },
    'sis-app-web': {
      nombre: 'Custom web application',
      descripcion: 'Web system with users and roles: inventory, appointments, bookings, academic management, and the like.',
      unidad: { singular: 'module', plural: 'modules' },
      entregables: ['App with login and roles', 'Modules with validations and reports', 'Deployment and user manual'],
      costos: ['Cloud server (1 year)'],
    },
    'sis-wordpress': {
      nombre: 'Website with a CMS (WordPress)',
      descripcion: 'Self-managed site so the client can publish news, posts, or products.',
      unidad: { singular: 'page', plural: 'pages' },
      entregables: ['WordPress site with a configured theme', 'Security, SEO, and form plugins', 'Training to publish content'],
      costos: ['Domain name (1 year)', 'Hosting (1 year)', 'Premium theme'],
    },
    'sis-api': {
      nombre: 'REST API / backend',
      descripcion: 'Services that connect an app or website to the database and to other systems.',
      unidad: { singular: 'endpoint', plural: 'endpoints' },
      entregables: ['Endpoints documented with OpenAPI', 'Authentication and validations', 'Basic tests and deployment'],
    },
    'sis-pasarela': {
      nombre: 'Payment gateway integration',
      descripcion: 'Connect an existing website or app to PayU, Mercado Pago, or a similar gateway.',
      unidad: { singular: 'integration', plural: 'integrations' },
      entregables: ['Online payments in test and live mode', 'Automatic payment confirmation (webhooks)', 'Guide to reconcile payments'],
    },
    'sis-pwa': {
      nombre: 'Progressive web app (PWA)',
      descripcion: 'Website that installs on a phone, works offline, and sends notifications.',
      unidad: { singular: 'screen', plural: 'screens' },
      entregables: ['App installable from the browser', 'Offline mode and notifications', 'Published over HTTPS'],
    },

    // movil
    'sis-android': {
      nombre: 'Native Android app',
      descripcion: 'Native Android application written in Kotlin or Java.',
      unidad: { singular: 'screen', plural: 'screens' },
      entregables: ['Signed APK or AAB', 'Documented source code', 'Connection to an API or database'],
    },
    'sis-ios': {
      nombre: 'Native iOS app',
      descripcion: 'Native iPhone application written in Swift.',
      unidad: { singular: 'screen', plural: 'screens' },
      entregables: ['App ready for TestFlight', 'Documented source code', 'Connection to an API or database'],
      costos: ['Apple Developer Program (1 year)'],
    },
    'sis-multiplataforma': {
      nombre: 'Cross-platform app (Flutter or React Native)',
      descripcion: 'A single codebase for Android and iOS.',
      unidad: { singular: 'screen', plural: 'screens' },
      entregables: ['App for Android and iOS', 'Source code with Expo or Flutter', 'Connection to an API or Firebase'],
    },
    'sis-publicacion-tiendas': {
      nombre: 'Publishing on Google Play or the App Store',
      descripcion: 'Prepare the listing, screenshots, and policies, and upload the app to the store.',
      unidad: { singular: 'store', plural: 'stores' },
      entregables: ['Store listing with screenshots and descriptions', 'Published privacy policy', 'App submitted for review'],
      costos: ['Google Play developer account (one-time fee)'],
    },

    // escritorio
    'sis-escritorio': {
      nombre: 'Local desktop application',
      descripcion: 'Software installed on a computer, built with Java, C#, or Python.',
      unidad: { singular: 'module', plural: 'modules' },
      entregables: ['Installer or executable (.exe or .jar)', 'Local database (SQLite or MySQL)', 'User manual'],
    },
    'sis-inventario': {
      nombre: 'Local inventory or invoicing system',
      descripcion: 'Track products, incoming and outgoing stock, sales, and reports for a business.',
      unidad: { singular: 'module', plural: 'modules' },
      entregables: ['Products, sales, and inventory modules', 'Reports in PDF or Excel', 'Database backups'],
      nota: 'Electronic invoicing with the tax authority may require an authorized technology provider.',
    },
    'sis-automatizacion': {
      nombre: 'Process automation',
      descripcion: 'Scripts or macros that handle repetitive tasks on their own: reports, emails, and files.',
      unidad: { singular: 'process', plural: 'processes' },
      entregables: ['Working scripts or macros', 'Usage instructions', 'Error log'],
    },
    'sis-chatbot': {
      nombre: 'AI chatbot',
      descripcion: 'Assistant for the web or WhatsApp that answers frequently asked questions and collects information.',
      unidad: { singular: 'conversation flow', plural: 'conversation flows' },
      entregables: ['Chatbot connected to the channel', 'Configured knowledge base', 'Conversation report'],
      costos: ['AI API credits (first month)'],
    },

    // datos
    'sis-base-datos': {
      nombre: 'Database design and implementation',
      descripcion: 'Entity-relationship model, normalization, and a ready-to-use SQL script.',
      unidad: { singular: 'table', plural: 'tables' },
      entregables: ['Entity-relationship model and data dictionary', 'SQL script with tables, keys, and constraints', 'Test data and main queries'],
    },
    'sis-migracion': {
      nombre: 'Data migration',
      descripcion: 'Move information from Excel or an old system to a new database.',
      unidad: { singular: 'table', plural: 'tables' },
      entregables: ['Migration scripts', 'Validation of the migrated data', 'Data quality report'],
    },
    'sis-tablero-bi': {
      nombre: 'KPI dashboard (Power BI or Looker Studio)',
      descripcion: 'Dashboard to track business figures with filters and charts.',
      unidad: { singular: 'metric', plural: 'metrics' },
      entregables: ['Interactive dashboard with filters', 'Connection to the data source', 'Guide to reading the metrics'],
      costos: ['Power BI Pro license (1 month)'],
    },
    'sis-analisis-datos': {
      nombre: 'Data analysis with report',
      descripcion: 'Clean, analyze, and explain data to answer specific questions from the client.',
      unidad: { singular: 'analysis question', plural: 'analysis questions' },
      entregables: ['Clean data', 'Report with charts and conclusions', 'Reproducible analysis notebook'],
    },
    'sis-scraping': {
      nombre: 'Web scraping and data cleaning (ETL)',
      descripcion: 'Automatically extract, clean, and load data from websites or files.',
      unidad: { singular: 'source', plural: 'sources' },
      entregables: ['Scheduled extractor', 'Clean data in CSV or a database', 'Process documentation'],
      nota: 'Check the terms of use of each site before extracting data.',
    },

    // infra
    'sis-despliegue': {
      nombre: 'Cloud deployment',
      descripcion: 'Set up the server, domain, and SSL certificate, and publish an application.',
      unidad: { singular: 'service', plural: 'services' },
      entregables: ['App published over HTTPS', 'Domain and DNS configured', 'Deployment and backup guide'],
      costos: ['VPS (1 month)', 'Domain name (1 year)'],
    },
    'sis-red': {
      nombre: 'Network installation and setup',
      descripcion: 'Structured cabling or Wi-Fi for an office or small business.',
      unidad: { singular: 'network drop', plural: 'network drops' },
      entregables: ['Network drops installed and tested', 'Router or Wi-Fi set up securely', 'Network diagram and labeling'],
      costos: ['Materials: cable, connectors, and raceways'],
    },
    'sis-mantenimiento-pc': {
      nombre: 'Preventive and corrective computer maintenance',
      descripcion: 'Cleaning, hardware checks, formatting, drivers, and optimization.',
      unidad: { singular: 'computer', plural: 'computers' },
      entregables: ['Clean, optimized computers', 'Status report for each computer', 'Improvement recommendations'],
      costos: ['Supplies: thermal paste and cleaners'],
    },
    'sis-soporte': {
      nombre: 'Technical support (monthly retainer)',
      descripcion: 'Block of hours each month to solve software, hardware, and user issues.',
      unidad: { singular: 'support hour', plural: 'support hours' },
      entregables: ['Remote or on-site support', 'Log of handled cases', 'Monthly report'],
    },
    'sis-backups': {
      nombre: 'Backup plan',
      descripcion: 'Automatic backup of files and databases, with restore tests.',
      unidad: { singular: 'computer or server', plural: 'computers or servers' },
      entregables: ['Scheduled automatic backups', 'Restore test', 'Documented backup policy'],
      costos: ['Cloud storage (1 year)'],
    },

    // consultoria
    'sis-qa': {
      nombre: 'Software testing (QA)',
      descripcion: 'Design and run test cases, and report the bugs found.',
      unidad: { singular: 'test case', plural: 'test cases' },
      entregables: ['Test plan and test case matrix', 'Bug report with evidence', 'Final quality report'],
    },
    'sis-seguridad': {
      nombre: 'Basic IT security assessment',
      descripcion: 'Review the settings, passwords, backups, and risks of a business, with an improvement plan.',
      unidad: { singular: 'system assessed', plural: 'systems assessed' },
      entregables: ['Inventory of assets and risks', 'Report of prioritized findings', 'Improvement plan'],
      nota: 'Only on systems owned by the client, with written authorization.',
    },
    'sis-requerimientos': {
      nombre: 'Requirements gathering and documentation',
      descripcion: 'Interviews, user stories, use cases, and UML diagrams.',
      unidad: { singular: 'use case', plural: 'use cases' },
      entregables: ['Requirements document', 'Use cases and UML diagrams', 'Navigation map or prototype'],
    },
    'sis-mantenimiento-software': {
      nombre: 'Software maintenance and enhancements',
      descripcion: 'Fix bugs and add small improvements to an existing system.',
      unidad: { singular: 'issue or improvement', plural: 'issues or improvements' },
      entregables: ['Deployed fixes', 'Changelog', 'Basic regression tests'],
    },
    'sis-capacitacion': {
      nombre: 'Technical training or tutoring',
      descripcion: 'Lessons in programming, office software, or tools for individuals or teams.',
      unidad: { singular: 'class hour', plural: 'class hours' },
      entregables: ['Sessions taught', 'Support materials', 'Exercises or assessment'],
    },
    'sis-iot': {
      nombre: 'IoT prototype (Arduino or ESP32)',
      descripcion: 'Device that measures, controls, or sends data to the internet.',
      unidad: { singular: 'sensor or actuator', plural: 'sensors or actuators' },
      entregables: ['Assembled and tested prototype', 'Microcontroller code', 'Web dashboard or app to view the data'],
      costos: ['Electronic components'],
    },

    // grafico
    'mul-logo': {
      nombre: 'Logo',
      descripcion: 'Logo design with initial proposals, refinements, and final files.',
      unidad: { singular: 'initial proposal', plural: 'initial proposals' },
      entregables: ['Logo in full-color, reversed, and one-color versions', 'Vector files (AI, SVG, PDF) and PNG', 'Mini usage guide'],
    },
    'mul-identidad': {
      nombre: 'Visual identity or brand guidelines',
      descripcion: 'Complete visual system: logo, colors, typefaces, and brand applications.',
      unidad: { singular: 'brand application', plural: 'brand applications' },
      entregables: ['Brand guidelines in PDF', 'Palette, typefaces, and patterns', 'Applications: stationery, social media, and signage'],
    },
    'mul-redes': {
      nombre: 'Social media graphics',
      descripcion: 'Posts, stories, and carousels for Instagram, Facebook, or TikTok.',
      unidad: { singular: 'graphic', plural: 'graphics' },
      entregables: ['Graphics sized for each platform', 'Editable templates', 'Suggested short captions'],
      costos: ['Stock photos or assets'],
    },
    'mul-afiche': {
      nombre: 'Poster, flyer, or leaflet',
      descripcion: 'Printed or digital design for an event or promotion.',
      unidad: { singular: 'piece', plural: 'pieces' },
      entregables: ['Print-ready file (PDF with bleed)', 'Social media version', 'Editable source file'],
    },
    'mul-papeleria': {
      nombre: 'Corporate stationery',
      descripcion: 'Business cards, letterheads, envelopes, and email signature.',
      unidad: { singular: 'item', plural: 'items' },
      entregables: ['Print-ready files', 'Email signature', 'Editable templates'],
      costos: ['Printing 500 business cards'],
    },
    'mul-ilustracion': {
      nombre: 'Digital illustration',
      descripcion: 'Original illustration for the web, books, packaging, or social media.',
      unidad: { singular: 'illustration', plural: 'illustrations' },
      entregables: ['High-resolution illustration', 'Approved sketch and final version', 'Layered source file'],
    },
    'mul-infografia': {
      nombre: 'Infographic',
      descripcion: 'Complex information turned into a clear, appealing graphic.',
      unidad: { singular: 'infographic', plural: 'infographics' },
      entregables: ['Infographic for print and digital', 'Custom icons and illustrations', 'Editable file'],
    },
    'mul-packaging': {
      nombre: 'Packaging and labels',
      descripcion: 'Package or label design ready for production.',
      unidad: { singular: 'product variant', plural: 'product variants' },
      entregables: ['Final artwork on the dieline', '3D packaging mockup', 'Print files'],
      costos: ['Print proof'],
    },

    // editorial
    'mul-diagramacion': {
      nombre: 'Book or magazine layout',
      descripcion: 'Lay out the text and images of a publication with professional styles.',
      unidad: { singular: 'page', plural: 'pages' },
      entregables: ['Print PDF and digital PDF', 'Paragraph styles and grid', 'Packaged InDesign file'],
    },
    'mul-portada': {
      nombre: 'Book cover',
      descripcion: 'Front cover, back cover, and spine for a printed book or e-book.',
      unidad: { singular: 'cover', plural: 'covers' },
      entregables: ['Full cover with calculated spine', 'E-book and social media version', 'Editable file'],
      costos: ['Stock image'],
    },
    'mul-catalogo': {
      nombre: 'Catalog, brochure, or portfolio',
      descripcion: 'Commercial publication to showcase products or services.',
      unidad: { singular: 'page', plural: 'pages' },
      entregables: ['Interactive PDF catalog', 'Print version', 'Template to keep it up to date'],
    },
    'mul-ebook': {
      nombre: 'E-book or interactive PDF',
      descripcion: 'Digital book with a clickable table of contents, links, video, or audio.',
      unidad: { singular: 'page', plural: 'pages' },
      entregables: ['E-book in EPUB or interactive PDF', 'Working table of contents and links', 'Testing on several e-readers'],
    },

    // uxui
    'mul-uxui': {
      nombre: 'UX/UI design with prototype',
      descripcion: 'Quick research, wireframes, and a clickable prototype of an app or website.',
      unidad: { singular: 'screen', plural: 'screens' },
      entregables: ['Wireframes and user flow', 'Clickable prototype in Figma', 'Style guide and components'],
    },
    'mul-maquetacion': {
      nombre: 'Front-end coding',
      descripcion: 'Turn a Figma design into responsive HTML, CSS, and JavaScript.',
      unidad: { singular: 'view', plural: 'views' },
      entregables: ['Responsive views', 'Reusable components', 'Code in a Git repository'],
    },
    'mul-sitio-multimedia': {
      nombre: 'Multimedia website or animated landing page',
      descripcion: 'Website with animations, video, interactive scrolling, or light 3D.',
      unidad: { singular: 'section', plural: 'sections' },
      entregables: ['Published, optimized website', 'Animations and interactions', 'Compressed media assets'],
      costos: ['Domain name (1 year)', 'Hosting (1 year)'],
    },
    'mul-usabilidad': {
      nombre: 'Usability testing',
      descripcion: 'Test a product with real users and suggest improvements.',
      unidad: { singular: 'participant', plural: 'participants' },
      entregables: ['Test script', 'Recordings and findings', 'Report with prioritized improvements'],
      costos: ['Participant incentives'],
    },

    // animacion
    'mul-animacion-2d': {
      nombre: '2D vector or cut-out animation',
      descripcion: 'Animation with vector characters and backgrounds assembled from separate pieces.',
      unidad: { singular: 'second', plural: 'seconds' },
      entregables: ['MP4 video at the agreed resolution', 'Approved animatic', 'Project files'],
      costos: ['Licensed music'],
    },
    'mul-animacion-fxf': {
      nombre: '2D frame-by-frame animation',
      descripcion: 'Traditional animation drawn frame by frame.',
      unidad: { singular: 'second', plural: 'seconds' },
      entregables: ['MP4 video', 'Animatic and line tests', 'PNG sequences'],
    },
    'mul-motion': {
      nombre: 'Motion graphics or explainer video',
      descripcion: 'Video with animated text, icons, and graphics to explain an idea.',
      unidad: { singular: 'second', plural: 'seconds' },
      entregables: ['Final video with music and sound effects', 'Script and storyboard', 'Social media versions'],
      costos: ['Professional voice-over', 'Licensed music'],
    },
    'mul-logo-animado': {
      nombre: 'Animated logo or intro',
      descripcion: 'Short logo animation for videos, social media, or presentations.',
      unidad: { singular: 'second', plural: 'seconds' },
      entregables: ['MP4 video and a version with transparency', 'Brand sound, if agreed', 'Project file'],
    },
    'mul-animacion-3d': {
      nombre: '3D animation',
      descripcion: 'Animation of characters, products, or scenes in 3D, not including modeling.',
      unidad: { singular: 'second', plural: 'seconds' },
      entregables: ['Final video render', '3D animatic', 'Project files'],
      costos: ['Render farm'],
    },
    'mul-storyboard': {
      nombre: 'Storyboard or animatic',
      descripcion: 'Panels that plan the story and shots of a video or animation.',
      unidad: { singular: 'panel', plural: 'panels' },
      entregables: ['Storyboard in PDF', 'Animatic with timing and scratch audio', 'Camera notes'],
    },
    'mul-stickers': {
      nombre: 'Stickers and animated GIFs',
      descripcion: 'Sticker pack for WhatsApp or GIFs for social media.',
      unidad: { singular: 'sticker or GIF', plural: 'stickers or GIFs' },
      entregables: ['Stickers in WebP or GIF', 'Pack ready for WhatsApp', 'Editable files'],
    },

    // tresd
    'mul-model-sheet': {
      nombre: 'Character model sheet',
      descripcion: 'Model sheet with front, side, and back views, poses, and expressions.',
      unidad: { singular: 'view or pose', plural: 'views or poses' },
      entregables: ['Character turnaround', 'Expression and pose sheet', 'Color palette and proportions'],
    },
    'mul-concept-art': {
      nombre: 'Concept art',
      descripcion: 'Visual exploration of characters, environments, or objects.',
      unidad: { singular: 'concept', plural: 'concepts' },
      entregables: ['Exploration sketches', 'Final color concepts', 'Design notes'],
    },
    'mul-personaje': {
      nombre: 'Character or brand mascot design',
      descripcion: 'Create an original character with its own personality, poses, and uses.',
      unidad: { singular: 'character', plural: 'characters' },
      entregables: ['Final character in color', 'Pose and expression variations', 'Character usage guide'],
    },
    'mul-modelado-personaje': {
      nombre: '3D character modeling',
      descripcion: '3D character ready for rendering, animation, or video games.',
      unidad: { singular: 'character', plural: 'characters' },
      entregables: ['3D model with clean topology', 'UVs and basic textures', 'FBX, OBJ, or BLEND files'],
    },
    'mul-modelado-props': {
      nombre: '3D modeling of objects, props, or products',
      descripcion: '3D objects, props, or products for rendering, games, or printing.',
      unidad: { singular: 'object', plural: 'objects' },
      entregables: ['Optimized 3D models', 'Basic materials', 'Files in the agreed format'],
    },
    'mul-rigging': {
      nombre: 'Character rigging',
      descripcion: 'Skeleton and controls so a 3D character can be animated.',
      unidad: { singular: 'character', plural: 'characters' },
      entregables: ['Rig with controls and weights', 'Facial controls, depending on the level', 'Deformation tests'],
    },
    'mul-texturizado': {
      nombre: 'Texturing and PBR materials',
      descripcion: 'Realistic or stylized textures for 3D models.',
      unidad: { singular: 'asset', plural: 'assets' },
      entregables: ['PBR maps: color, roughness, and normals', 'Configured materials', 'Previews'],
    },
    'mul-render-arquitectonico': {
      nombre: 'Architectural rendering',
      descripcion: 'Photorealistic images of interior or exterior spaces.',
      unidad: { singular: 'image', plural: 'images' },
      entregables: ['High-resolution renders', '3D model of the space', 'Post-production adjustments'],
    },
    'mul-recorrido-virtual': {
      nombre: '3D or 360° virtual tour',
      descripcion: 'Interactive or video walkthrough of a space in 3D or 360° photography.',
      unidad: { singular: 'space', plural: 'spaces' },
      entregables: ['Navigable or video tour', 'Information hotspots', 'Web or VR headset version'],
    },
    'mul-impresion-3d': {
      nombre: 'Modeling for 3D printing',
      descripcion: 'Print-ready models: parts, figures, or prototypes.',
      unidad: { singular: 'piece', plural: 'pieces' },
      entregables: ['Checked STL or 3MF files', 'Suggested print settings', 'Printed piece, if agreed'],
      costos: ['Filament and printing'],
    },

    // audiovisual
    'mul-produccion-video': {
      nombre: 'Commercial or corporate video production',
      descripcion: 'Pre-production, shooting, and editing of a video for a brand or organization.',
      unidad: { singular: 'minute of final video', plural: 'minutes of final video' },
      entregables: ['Script and shooting plan', 'Final video, edited and color graded', 'Social media versions'],
      costos: ['Equipment rental (1 day)', 'Transportation and logistics'],
    },
    'mul-edicion-video': {
      nombre: 'Video editing',
      descripcion: 'Assembly, cuts, titles, music, and export of footage already shot.',
      unidad: { singular: 'minute of final video', plural: 'minutes of final video' },
      entregables: ['Edited video', 'Subtitles, if needed', 'Exports for each platform'],
    },
    'mul-vfx': {
      nombre: 'Post-production, VFX, and compositing',
      descripcion: 'Visual effects, shot cleanup, chroma keying, and compositing.',
      unidad: { singular: 'shot', plural: 'shots' },
      entregables: ['Composited shots', 'Renders with alpha channel, if needed', 'Project files'],
    },
    'mul-color': {
      nombre: 'Color correction',
      descripcion: 'Color balance, correction, and look for video.',
      unidad: { singular: 'minute', plural: 'minutes' },
      entregables: ['Color-corrected video', 'LUT for the look', 'Final export'],
    },
    'mul-reels': {
      nombre: 'Social media videos (Reels and TikTok)',
      descripcion: 'Short vertical videos with dynamic editing, text, and trends.',
      unidad: { singular: 'video', plural: 'videos' },
      entregables: ['Vertical 9:16 videos', 'Subtitles and on-screen text', 'Cover images'],
    },
    'mul-fotografia-producto': {
      nombre: 'Product photography with retouching',
      descripcion: 'Product photo shoot with backdrop, lighting, and professional retouching.',
      unidad: { singular: 'final photo', plural: 'final photos' },
      entregables: ['High-resolution retouched photos', 'Versions for web and social media', 'White or styled background'],
      costos: ['Props and backdrops'],
    },
    'mul-cobertura-evento': {
      nombre: 'Event coverage (photo or video)',
      descripcion: 'Photo or video coverage of an event, delivered edited.',
      unidad: { singular: 'hour of coverage', plural: 'hours of coverage' },
      entregables: ['Edited photos or highlight video', 'Online gallery', 'Raw files, if agreed'],
      costos: ['Transportation'],
    },

    // audio
    'mul-audio': {
      nombre: 'Audio or podcast editing and mixing',
      descripcion: 'Cleanup, editing, mixing, and mastering of voice or music.',
      unidad: { singular: 'minute', plural: 'minutes' },
      entregables: ['Final mastered audio', 'Intro and outro', 'MP3 and WAV files'],
    },
    'mul-jingle': {
      nombre: 'Jingle, original music, or sound design',
      descripcion: 'Original music or sounds for brands, videos, or video games.',
      unidad: { singular: 'second', plural: 'seconds' },
      entregables: ['Final mastered track', 'Short versions', 'Separate tracks (stems), if agreed'],
      costos: ['Voice-over artist or singer'],
    },

    // interactivos
    'mul-videojuego-2d': {
      nombre: '2D video game',
      descripcion: '2D game for PC, web, or mobile with mechanics, levels, and menus.',
      unidad: { singular: 'level', plural: 'levels' },
      entregables: ['Executable or web build', 'Source code and assets', 'Game design document (GDD)'],
      costos: ['Third-party assets or music'],
    },
    'mul-videojuego-3d': {
      nombre: '3D video game',
      descripcion: '3D game with environments, characters, and playable mechanics.',
      unidad: { singular: 'level', plural: 'levels' },
      entregables: ['Playable build', 'Source code and assets', 'Game design document (GDD)'],
      costos: ['Third-party assets or music'],
    },
    'mul-ar': {
      nombre: 'Augmented reality filter or experience',
      descripcion: 'Social media filters or augmented reality experiences on the web or on mobile.',
      unidad: { singular: 'effect', plural: 'effects' },
      entregables: ['Published filter or augmented reality app', 'Testing on devices', 'Project files'],
    },
    'mul-vr': {
      nombre: 'Virtual reality experience',
      descripcion: 'Immersive scenes for VR headsets or the browser.',
      unidad: { singular: 'scene', plural: 'scenes' },
      entregables: ['VR headset or WebXR version', 'Interactions and spatial audio', 'Installation guide'],
    },
    'mul-ova': {
      nombre: 'Digital learning object (e-learning)',
      descripcion: 'Interactive educational material with activities, assessment, and multimedia.',
      unidad: { singular: 'screen or activity', plural: 'screens or activities' },
      entregables: ['Learning object in HTML5 or SCORM', 'Activities and assessment', 'Teacher guide'],
    },
    'mul-mapping': {
      nombre: 'Interactive installation or projection mapping',
      descripcion: 'Projection onto surfaces, or an installation that reacts to the audience.',
      unidad: { singular: 'minute of content', plural: 'minutes of content' },
      entregables: ['Content fitted to the surface', 'Interaction programming', 'On-site setup and testing'],
      costos: ['Projector rental (1 day)'],
    },
  },
};
