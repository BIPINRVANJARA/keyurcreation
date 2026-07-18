# Fix broken asset paths from over-aggressive snapture replacement
$Root = 'c:\Users\Bipin\Desktop\snapture'

Get-ChildItem $Root -Filter '*.html' -File | ForEach-Object {
    $c = Get-Content $_.FullName -Raw -Encoding UTF8

    # Restore CSS/JS file paths (keep lowercase snapture in filenames)
    $c = $c -replace 'Keyurscreation-core', 'snapture-core'
    $c = $c -replace 'Keyurscreation-companion', 'snapture-companion'
    $c = $c -replace 'Keyurscreation-extra', 'snapture-extra'
    $c = $c -replace 'Keyurscreation-custom', 'snapture-custom'
    $c = $c -replace 'Keyurscreation-style', 'snapture-style'
    $c = $c -replace 'flaticon-Keyurscreation', 'flaticon-snapture'
    $c = $c -replace 'Keyurscreation-fonts', 'snapture-fonts'
    $c = $c -replace 'Keyurscreation-primary-color', 'snapture-primary-color'
    $c = $c -replace 'id="Keyurscreation-', 'id="snapture-'
    $c = $c -replace 'snapture-custom-js', 'snapture-custom.js'
    $c = $c -replace 'assets/js/Keyurscreation-', 'assets/js/snapture-'

    # Fix broken URLs
    $c = $c -replace 'https://themexriver\.com/wp/Keyurscreation/', ''
    $c = $c -replace '/wp/Keyurscreation/', ''
    $c = $c -replace 'wp/Keyurscreation/', ''

    # Remove leftover woocommerce script blocks
    $c = $c -replace '<script id="wc-add-to-cart-js-extra">.*?</script>\s*', ''
    $c = $c -replace '<script id="woocommerce-js-extra">.*?</script>\s*', ''

    [System.IO.File]::WriteAllText($_.FullName, $c, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Fixed $($_.Name)"
}

Write-Host 'Asset path fix complete.'
