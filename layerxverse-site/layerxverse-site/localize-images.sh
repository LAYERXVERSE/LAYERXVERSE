#!/usr/bin/env bash
# Run this once, from inside the layerxverse-site folder, on a computer with internet access:
#   bash localize-images.sh
#
# It downloads all 18 generated product photos into images/, then rewrites
# index.html and js/script.js to point at the local files instead of the
# Higgsfield CDN links. After running this, the whole site works fully
# offline / from your own hosting with no dependency on Higgsfield's CDN.

set -e
cd "$(dirname "$0")"
mkdir -p images

declare -A FILES=(
  ["images/hero-keychain.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_2c5d227d-366c-4c4c-a4f5-7779b36de545.png"
  ["images/tapstation-nfc-stand.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_5c2e2987-dada-4b13-ad92-e11243b67d03.png"
  ["images/keychains-five-shapes-flatlay.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_d4f7f890-8021-4d09-820b-085fea07bf06.png"
  ["images/3d-printer-macro.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_02986334-b3aa-45d9-a717-1ca096588271.png"
  ["images/keychains-scattered-flatlay.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_6a37c160-ad82-4dc6-b61e-c84d29626934.png"
  ["images/business-sign-wall.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_c436d9a0-8f71-4355-9c90-9f8a80375d89.png"
  ["images/qr-scan-plaque.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_04a944c9-21e7-462b-9f4b-aaacad300aaa.png"
  ["images/keychain-wolf.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_bd908b15-5936-4f7b-82e5-f6449129ec76.png"
  ["images/keychain-skull.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212646_fab36db3-7368-4f91-9143-8461d69e7024.png"
  ["images/keychain-motorcycle.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212741_66f006b3-ad88-414e-99b1-a55617865ffb.png"
  ["images/keychain-mountain.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212741_481105fa-6249-4515-a2ae-5e1add80ee56.png"
  ["images/workshop-hands-printer.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212741_9de62d15-f5b5-4ab9-9379-a64a857968c6.png"
  ["images/storefront-night-sign.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212832_755279cc-90e3-4942-9b69-2b0a4a2fd1c2.png"
  ["images/designer-desk-flatlay.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212832_d50c344a-ab8b-4860-b6b1-48ca2eb39219.png"
  ["images/personalized-keychain-lifestyle.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212832_72753197-d561-4f20-a1b2-4b68fb783b54.png"
  ["images/office-desk-display.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212921_25475bae-5de7-4d2e-bd23-2c8bdba1683e.png"
  ["images/cafe-counter-stand.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212921_0bf10d20-d157-42eb-b543-d748fc35fcc5.png"
  ["images/logo-plate-metal.png"]="https://d8j0ntlcm91z4.cloudfront.net/user_3IsuODIRjab0LAr51lOKVfC54c7/hf_20260905_212921_7080b5ba-2d07-4392-a5c2-6c772cc86f50.png"
)

echo "Downloading 18 images..."
for local in "${!FILES[@]}"; do
  url="${FILES[$local]}"
  echo "  -> $local"
  curl -sSL "$url" -o "$local"
done

echo "Rewriting index.html and js/script.js to use local image paths..."
for local in "${!FILES[@]}"; do
  url="${FILES[$local]}"
  # escape / for sed
  esc_url=$(printf '%s\n' "$url" | sed 's/[&/\]/\\&/g')
  esc_local=$(printf '%s\n' "$local" | sed 's/[&/\]/\\&/g')
  sed -i.bak "s|$esc_url|$esc_local|g" index.html js/script.js
done
rm -f index.html.bak js/script.js.bak

echo "Done. All 18 images are now in images/, and the site references them locally."
