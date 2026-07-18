# Keyurscreation brand transformation script
$ErrorActionPreference = 'Stop'
$Root = 'c:\Users\Bipin\Desktop\snapture'

$BrandCSS = @'
<link rel="stylesheet" href="assets/css/keyurscreation.css" media="all" />
<link rel="icon" href="assets/images/brand/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="assets/images/brand/favicon.svg" />
'@

$PageMeta = @{
    'index.html' = @{
        title = 'Keyurscreation | Wedding Photographer in Bhiloda & Gujarat – Stories by Keyur'
        desc = 'Premium wedding photography & cinematography in Bhiloda, Gandhinagar & Ahmedabad. Candid moments, luxury wedding films & timeless stories by Keyur | TSPF.'
        keywords = 'Wedding Photographer Bhiloda, Wedding Photographer Gandhinagar, Pre-Wedding Photographer Gujarat, Wedding Cinematographer Gujarat, Candid Wedding Photography, Luxury Wedding Films'
    }
    'about.html' = @{
        title = 'About Us | Keyurscreation – Stories by Keyur | TSPF'
        desc = 'Meet Keyurscreation – a passionate wedding photography & cinematography studio in Bhiloda, Gujarat. Storytelling through emotions, candid moments & cinematic films.'
    }
    'portfolio.html' = @{
        title = 'Our Wedding Stories | Keyurscreation Portfolio – Gujarat'
        desc = 'Explore our wedding, pre-wedding, engagement & candid photography portfolio. Real love stories captured across Bhiloda, Ahmedabad & Gujarat.'
    }
    'booking.html' = @{
        title = 'Book Your Shoot | Keyurscreation – Wedding Photography Gujarat'
        desc = 'Book your wedding, pre-wedding or event photography session with Keyurscreation. Serving Bhiloda, Himatnagar, Gandhinagar, Ahmedabad & all Gujarat.'
    }
    'events.html' = @{
        title = 'Wedding Events Coverage | Haldi, Mehndi, Sangeet – Keyurscreation'
        desc = 'Professional coverage for Haldi, Mehndi, Sangeet & Reception ceremonies. Cinematic storytelling for every wedding celebration in Gujarat.'
    }
    'team.html' = @{
        title = 'Our Team | Keyurscreation – Stories by Keyur | TSPF'
        desc = 'Meet Keyur and our team of photographers, cinematographers & editors dedicated to capturing your most precious wedding moments.'
    }
    'pricing.html' = @{
        title = 'Wedding Photography Packages | Keyurscreation Gujarat'
        desc = 'Silver, Gold & Platinum wedding photography packages. Photography, cinematography, drone coverage, highlight films & albums.'
    }
    'testimonials.html' = @{
        title = 'Love From Our Couples | Keyurscreation Reviews'
        desc = 'Read what couples say about Keyurscreation wedding photography & cinematography. 5-star reviews from weddings across Gujarat.'
    }
    'faq.html' = @{
        title = 'FAQs | Keyurscreation Wedding Photography Gujarat'
        desc = 'Frequently asked questions about booking, travel, albums, delivery timelines, drone coverage & wedding photography packages.'
    }
    'blog.html' = @{
        title = 'Wedding Photography Blog | Keyurscreation Gujarat'
        desc = 'Tips on pre-wedding shoots, wedding locations in Gujarat, photography checklists & candid wedding photography insights.'
    }
    'contact.html' = @{
        title = 'Contact Us | Keyurscreation – Bhiloda, Gujarat'
        desc = 'Contact Keyurscreation for wedding photography & cinematography. Phone, WhatsApp, email & studio in Bhiloda, Gujarat.'
    }
}

$SchemaOrg = @'
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Keyurscreation – Stories by Keyur | TSPF",
  "description": "Premium wedding photography and cinematography studio in Bhiloda, Gujarat",
  "url": "https://keyurscreation.com",
  "telephone": "+91-98765-43210",
  "email": "hello@keyurscreation.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bhiloda",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  "areaServed": ["Bhiloda", "Himatnagar", "Gandhinagar", "Ahmedabad", "Gujarat"],
  "priceRange": "₹₹₹",
  "image": "assets/images/brand/logo.svg",
  "sameAs": [
    "https://instagram.com/keyurscreation",
    "https://facebook.com/keyurscreation",
    "https://youtube.com/keyurscreation"
  ]
}
</script>
'@

function Update-PageHead {
    param([string]$Content, [string]$FileName)

    $meta = $PageMeta[$FileName]
    if (-not $meta) { return $Content }

    $Content = $Content -replace '<title>[^<]+</title>', "<title>$($meta.title)</title>"
    $Content = $Content -replace '<html lang="en-US"', '<html lang="en"'

    # Remove old favicon links
    $Content = $Content -replace '<link rel="icon"[^>]+>\r?\n', ''
    $Content = $Content -replace '<link rel="apple-touch-icon"[^>]+>\r?\n', ''
    $Content = $Content -replace '<meta name="msapplication-TileImage"[^>]+>\r?\n', ''

    # Update color variables
    $Content = $Content -replace '--tx-color-primary: #244f0b;', '--tx-color-primary: #0D0D0D;'
    $Content = $Content -replace '--tx-color-secondary: #A2DE64;', '--tx-color-secondary: #C9A962;'
    $Content = $Content -replace '--tx-color-accent: #00853A;', '--tx-color-accent: #8B6914;'
    $Content = $Content -replace '--tx-color-highlight: #eddd5e;', '--tx-color-highlight: #E8D5A3;'

    # Replace Google fonts
    $Content = $Content -replace "href='https://fonts\.googleapis\.com/css2\?family=Space\+Grotesk[^']+'", "href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap'"

    # Inject brand CSS before </head> if not present
    if ($Content -notmatch 'keyurscreation\.css') {
        $Content = $Content -replace '</head>', "$BrandCSS`n$SchemaOrg`n<meta name=`"description`" content=`"$($meta.desc)`" />`n<meta name=`"keywords`" content=`"$($meta.keywords)`" />`n<meta property=`"og:title`" content=`"$($meta.title)`" />`n<meta property=`"og:description`" content=`"$($meta.desc)`" />`n<meta property=`"og:type`" content=`"website`" />`n<meta property=`"og:site_name`" content=`"Keyurscreation`" />`n</head>"
    }

    return $Content
}

function Apply-GlobalBrand {
    param([string]$Content)

    # Brand name replacements
    $Content = $Content -replace 'Snapture Photography', 'Keyurscreation'
    $Content = $Content -replace 'Snapture', 'Keyurscreation'
    $Content = $Content -replace 'SNAPTURE', 'KEYURSCREATION'
    $Content = $Content -replace 'snapture', 'keyurscreation'
    $Content = $Content -replace 'theme-snapture', 'theme-keyurscreation'
    $Content = $Content -replace 'wp-theme-snapture', 'wp-theme-keyurscreation'

    # Logo paths
    $Content = $Content -replace 'assets/images/uploads/2026/05/favicon-2\.svg', 'assets/images/brand/logo.svg'
    $Content = $Content -replace 'assets/images/uploads/2026/05/favicon-1\.webp', 'assets/images/brand/logo-dark.svg'
    $Content = $Content -replace 'assets/images/uploads/2026/05/logo-3-black\.svg', 'assets/images/brand/logo-dark.svg'
    $Content = $Content -replace 'assets/images/uploads/2026/05/logo-3\.svg', 'assets/images/brand/logo.svg'
    $Content = $Content -replace 'assets/images/uploads/2026/05/f2-logo\.svg', 'assets/images/brand/logo.svg'
    $Content = $Content -replace 'assets/images/uploads/2026/05/logo-1\.svg', 'assets/images/brand/logo-dark.svg'

    # Fix external URLs to local
    $Content = $Content -replace 'https://themexriver\.com/wp/snapture/', ''
    $Content = $Content -replace 'http://themexriver\.com/wp/snapture/', ''

    # Nav: Portfolio -> Our Stories
    $Content = $Content -replace '>Portfolio</a>', '>Our Stories</a>'

    # Footer copyright
    $Content = $Content -replace '©<span class="wa_current_year"></span>, <a href="#" aria-label="name">Keyurscreation</a> All Rights Reserved\.', '©<span class="wa_current_year"></span> Keyurscreation – Stories by Keyur | TSPF. All Rights Reserved.'
    $Content = $Content -replace 'License\s*</a>', 'Privacy Policy</a>'
    $Content = $Content -replace 'Style Guide\s*</a>', 'Terms of Service</a>'
    $Content = $Content -replace 'Changelogs\s*</a>', 'Sitemap</a>'

    # Social links
    $Content = $Content -replace 'fab fa-x-twitter', 'fab fa-youtube'
    $Content = $Content -replace 'fab fa-linkedin-in', 'fab fa-facebook-f'
    $Content = $Content -replace 'fab fa-tiktok', 'fab fa-whatsapp'

    # Fix PHP warning in alt attributes
    $Content = $Content -replace 'alt="<br />\s*<b>Warning</b>:[^"]*"', 'alt="Service icon"'

    # Remove woocommerce/script cruft
    $Content = $Content -replace '<script id="wc-add-to-cart-js-extra">.*?</script>\r?\n', ''
    $Content = $Content -replace '<script id="woocommerce-js-extra">.*?</script>\r?\n', ''
    $Content = $Content -replace '<meta name="generator" content="Elementor[^"]+" />\r?\n', ''

    # Preloader text
    $Content = $Content -replace 'KEYURSCREATION\s*</p>', 'STORIES BY KEYUR</p>'

    # aria-label updates
    $Content = $Content -replace 'aria-label="Keyurscreation"', 'aria-label="Keyurscreation – Stories by Keyur"'

    return $Content
}

# Process all HTML files
Get-ChildItem $Root -Filter '*.html' -File | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = Update-PageHead $content $_.Name
    $content = Apply-GlobalBrand $content
    [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Rebranded $($_.Name)"
}

Write-Host 'Global rebrand complete.'
