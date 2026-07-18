$Root = 'c:\Users\Bipin\Desktop\snapture'

# Fix events page
$evPath = Join-Path $Root 'events.html'
$ev = [IO.File]::ReadAllText($evPath, [Text.Encoding]::UTF8)

$eventCards = @(
    @{ old = 'Corporate Events'; title = 'Haldi Ceremony'; disc = 'Vibrant turmeric rituals, laughter, and candid family moments captured with warmth and cultural authenticity.' },
    @{ old = 'Concerts &amp; Live Shows'; title = 'Mehndi Ceremony'; disc = 'Intricate henna details, joyful celebrations, and colorful traditions preserved in stunning candid frames.' },
    @{ old = 'Private Parties'; title = 'Sangeet Night'; disc = 'High-energy dance performances, music, and celebration captured with cinematic flair and dynamic lighting.' },
    @{ old = 'Weddings &amp; Engagement'; title = 'Engagement Ceremony'; disc = 'Ring exchange, blessings, and romantic couple portraits that mark the beginning of your forever.' },
    @{ old = 'Award Ceremonies'; title = 'Wedding Reception'; disc = 'Grand entrances, speeches, and celebration moments from your reception captured with elegance.' },
    @{ old = 'Birthday Party'; title = 'Baraat &amp; Varmala'; disc = 'The groom''s procession, varmala exchange, and grand arrival moments filmed with cinematic drama.' },
    @{ old = 'Conference Event'; title = 'Mandap &amp; Pheras'; disc = 'Sacred wedding rituals, pheras, and emotional family moments documented with reverence and artistry.' },
    @{ old = 'Product Launch Events'; title = 'Vidai Ceremony'; disc = 'Bittersweet farewell moments, family emotions, and the final chapter of your wedding story.' },
    @{ old = 'Cultural Festival'; title = 'Ring Ceremony'; disc = 'Traditional ring exchange ceremonies with intimate couple portraits and family celebration coverage.' }
)

foreach ($card in $eventCards) {
    $ev = $ev -replace "aria-label=`"$($card.old)`" href=`"events.html`">[^<]+</a>",
        "aria-label=`"$($card.title)`" href=`"booking.html`">$($card.title)</a>"
}

$discs = @(
    'Conferences, seminars, product launches, and business gatherings captured with professionalism and brand-focused storytelling.',
    'Music events, live performances, festivals, and entertainment shows full of energy and vibrant moments.',
    'Intimate gatherings, special milestones, and private celebrations preserved with authentic moments and candid emotions.',
    'Honoring achievements and accolades, our photography captures the celebrations and proudest moments of award recipients.',
    'Memorable birthday parties filled with laughter, joy, and colorful celebrations beautifully preserved for years to come.',
    'Conferences, seminars, product launches, and business gatherings captured with professionalism and brand-focused storytelling ...'
)

$i = 0
foreach ($card in $eventCards) {
    if ($i -lt $discs.Count) {
        $oldDisc = [regex]::Escape($discs[$i])
        $ev = [regex]::Replace($ev, $oldDisc, $card.disc, 1)
    }
    $i++
}

$ev = $ev -replace 'Buy Ticket', 'Book Coverage'
$ev = $ev -replace 'aria-label="Buy Ticket"', 'aria-label="Book Coverage"'
[IO.File]::WriteAllText($evPath, $ev, [Text.UTF8Encoding]::new($false))
Write-Host 'Fixed events.html'

# Fix testimonials page
$tmPath = Join-Path $Root 'testimonials.html'
$tm = [IO.File]::ReadAllText($tmPath, [Text.Encoding]::UTF8)

$tm = $tm -replace '!"card-author">', '!"</p>`n    <div class="card-author">'
$tm = $tm -replace 'src="blog.html"', 'src="assets/images/uploads/2026/04/author-1.webp"'
$tm = $tm -replace 'alt="author-1.webp">alt', 'alt="Wedding couple">'
$tm = $tm -replace '5\.0/5\s*<i', '★★★★★ <i'
$tm = $tm -replace 'Marketing Director, Lens &amp; Light Studio', 'Wedding Client, Gujarat'

$names = @(
    @{ old = 'Sarah Chen'; new = 'Priya &amp; Rahul Shah'; bio = 'Ahmedabad Wedding' },
    @{ old = 'Sarah Chen'; new = 'Ananya &amp; Karan Mehta'; bio = 'Gandhinagar Wedding' },
    @{ old = 'Sarah Chen'; new = 'Divya &amp; Harsh Patel'; bio = 'Himatnagar Wedding' },
    @{ old = 'Sarah Chen'; new = 'Neha &amp; Rohit Desai'; bio = 'Bhiloda Wedding' },
    @{ old = 'Sarah Chen'; new = 'Kavya &amp; Arjun Rao'; bio = 'Engagement, Gandhinagar' },
    @{ old = 'Sarah Chen'; new = 'Isha &amp; Jay Shah'; bio = 'Sangeet &amp; Mehndi' },
    @{ old = 'Sarah Chen'; new = 'Ritu &amp; Manish Mehta'; bio = 'Reception, Ahmedabad' },
    @{ old = 'Sarah Chen'; new = 'Sneha &amp; Vikram Patel'; bio = 'Destination Wedding' },
    @{ old = 'Sarah Chen'; new = 'Pooja &amp; Amit Desai'; bio = 'Traditional Gujarati Wedding' },
    @{ old = 'Sarah Chen'; new = 'Tanvi &amp; Dev Shah'; bio = 'Pre-Wedding, Bhiloda' }
)

foreach ($n in $names) {
    $tm = [regex]::Replace($tm, '<h4 class="st-h-2 name">Sarah Chen</h4>', "<h4 class=`"st-h-2 name`">$($n.new)</h4>", 1)
    $tm = [regex]::Replace($tm, 'Marketing Director, Lens &amp; Light Studio', $n.bio, 1)
    $tm = [regex]::Replace($tm, 'Wedding Client, Gujarat', $n.bio, 1)
}

$tm = $tm -replace 'Our rebrand launch relied on Keyurscreation.s photography.they listened, shot with intent, and delivered images our whole team could use across web and print.',
    'Keyurscreation made our engagement ceremony in Gandhinagar feel like a fairy tale. Every frame captured the joy of our families beautifully.'

[IO.File]::WriteAllText($tmPath, $tm, [Text.UTF8Encoding]::new($false))
Write-Host 'Fixed testimonials.html'
