function setRandomUnsplashBackground() {
    if (window.innerWidth >= 768) {
        // Curated list of reliable high-quality Unsplash images (Abstract/Dark/Technology vibe)
        const wallpapers = [
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop', // Dark Tech
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop', // Circuit
            'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Abstract Blue
            'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2670&auto=format&fit=crop', // Geometric
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Liquid Gradient
            'https://images.unsplash.com/photo-1620121692029-d088224ddc84?q=80&w=2532&auto=format&fit=crop', // Dark Shapes
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop', // Matrix Code
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop', // Coding Screen
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop', // Workplace Dark
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop', // Retro Tech
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2670&auto=format&fit=crop', // Global Network
            'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2670&auto=format&fit=crop', // Cyberpunk City
            'https://images.unsplash.com/photo-1536566482682-f5bf5496797d?q=80&w=2670&auto=format&fit=crop', // Black Abstract
            'https://images.unsplash.com/photo-1504384308090-c54be3855091?q=80&w=2670&auto=format&fit=crop', // Hologram
            'https://images.unsplash.com/photo-1514798604712-4fb053d8ae21?q=80&w=2670&auto=format&fit=crop', // Blue Particles
            'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2670&auto=format&fit=crop', // Dark Gradient
            'https://images.unsplash.com/photo-1464618663641-bbdd760ae19b?q=80&w=2670&auto=format&fit=crop', // Dark Landscape
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2670&auto=format&fit=crop'  // Laptop Tech
        ];
        const imageUrl = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => document.body.style.backgroundImage = `url('${imageUrl}')`;
        img.onerror = () => {
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            ];
            document.body.style.backgroundImage = gradients[Math.floor(Math.random() * gradients.length)];
        };
        img.src = imageUrl;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setRandomUnsplashBackground();
    // Inputs for various generators
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const encryptionSelect = document.getElementById('encryption');
    const hiddenCheckbox = document.getElementById('hidden');

    const whatsappPhoneInput = document.getElementById('whatsapp-phone');
    const whatsappMessageInput = document.getElementById('whatsapp-message');

    const websiteUrlInput = document.getElementById('website-url');

    const paymentTypeSelect = document.getElementById('payment-type'); // UPI, Link, etc. (future expansion), treating as URL for now or specific UPI
    const paymentValueInput = document.getElementById('payment-value'); // UPI ID or Link

    const phoneInput = document.getElementById('phone-number');

    const mapsInput = document.getElementById('maps-link');

    // vCard Inputs
    const vcardFnInput = document.getElementById('vcard-fn'); // Full Name
    const vcardOrgInput = document.getElementById('vcard-org');
    const vcardTitleInput = document.getElementById('vcard-title');
    const vcardTelInput = document.getElementById('vcard-tel');
    const vcardEmailInput = document.getElementById('vcard-email');
    const vcardUrlInput = document.getElementById('vcard-url');

    const encryptionSelectComponent = document.getElementById('encryption-select');
    const helpLink = document.getElementById('help-link');
    const helpModal = document.getElementById('help-modal');
    const helpModalClose = document.getElementById('help-modal-close');
    const qrContainer = document.getElementById('qrcode');
    const qrPlaceholder = document.getElementById('qr-placeholder');
    const downloadPngBtn = document.getElementById('download-png');
    const downloadVectorBtn = document.getElementById('download-vector');
    const closeQrBtn = document.getElementById('close-qr');
    const adContainer = document.getElementById('ad-container');
    const adContent = document.getElementById('ad-content');
    const adCountdown = document.getElementById('ad-countdown');
    const generateBtn = document.getElementById('generate-qr');
    const formView = document.getElementById('form-view');
    const qrView = document.getElementById('qr-view');

    if (qrContainer) qrContainer.style.display = 'flex';

    let qrCodeObj = null;
    let adTimer = null;
    let countdownInterval = null;

    function escapeWiFiString(str) {
        return str.replace(/([\\:;,"])/g, '\\$1');
    }

    function generateQRString() {
        // Detect Page Type based on available inputs

        // 1. WiFi
        if (ssidInput) {
            const ssid = ssidInput.value.trim();
            if (!ssid) return null;
            const password = passwordInput.value;
            const type = encryptionSelect.value;
            const hidden = hiddenCheckbox.checked;
            let schema = `WIFI:T:${type};S:${escapeWiFiString(ssid)};`;
            if (type !== 'nopass' && password) {
                schema += `P:${escapeWiFiString(password)};`;
            }
            schema += `H:${hidden};;`;
            return schema;
        }

        // 2. WhatsApp
        if (whatsappPhoneInput) {
            const phone = whatsappPhoneInput.value.trim();
            if (!phone) return null;
            let message = whatsappMessageInput ? whatsappMessageInput.value.trim() : '';
            // WhatsApp URL format: https://wa.me/NUMBER?text=URLENCODED
            // Remove non-numeric from phone
            const cleanPhone = phone.replace(/[^\d]/g, '');
            let url = `https://wa.me/${cleanPhone}`;
            if (message) {
                url += `?text=${encodeURIComponent(message)}`;
            }
            return url;
        }

        // 3. Website
        if (websiteUrlInput) {
            let url = websiteUrlInput.value.trim();
            if (!url) return null;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            return url;
        }

        // 4. Payment (Simple URL/UPI mode for now)
        if (paymentValueInput) {
            const val = paymentValueInput.value.trim();
            if (!val) return null;
            // Detect if it's UPI or Link
            if (val.includes('@')) {
                // Assume UPI: upi://pay?pa=ADDRESS&pn=NAME(Optional)
                return `upi://pay?pa=${val}`;
            } else {
                if (!val.startsWith('http://') && !val.startsWith('https://')) {
                    return 'https://' + val;
                }
                return val;
            }
        }

        // 5. Phone Number
        if (phoneInput) {
            const val = phoneInput.value.trim();
            if (!val) return null;
            return `tel:${val}`;
        }

        // 6. Google Map
        if (mapsInput) {
            const val = mapsInput.value.trim();
            if (!val) return null;
            return val; // Use the exact link provided
        }

        // 7. Business Card (vCard)
        if (vcardFnInput) {
            const fn = vcardFnInput.value.trim();
            if (!fn) return null; // Name is required
            const org = vcardOrgInput.value.trim();
            const title = vcardTitleInput.value.trim();
            const tel = vcardTelInput.value.trim();
            const email = vcardEmailInput.value.trim();
            const url = vcardUrlInput.value.trim();

            let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${fn};;;\nFN:${fn}\n`;
            if (org) vcard += `ORG:${org}\n`;
            if (title) vcard += `TITLE:${title}\n`;
            if (tel) vcard += `TEL;TYPE=WORK,VOICE:${tel}\n`;
            if (email) vcard += `EMAIL:${email}\n`;
            if (url) vcard += `URL:${url}\n`;
            vcard += `END:VCARD`;
            return vcard;
        }

        return null;
    }

    function updateQR(shouldSlide = false) {
        // Validation check for empty basic requirement
        // We use the same 'ssidInput' check etc inside generateQRString to determine validity
        // But for UI feedback (slide vs no slide), we need to know if content exists.

        const qrContent = generateQRString();

        if (qrContent) {
            qrPlaceholder.classList.add('hidden');
            downloadPngBtn.disabled = false;
            downloadVectorBtn.disabled = false;
            qrContainer.innerHTML = '';
            qrCodeObj = new QRCode(qrContainer, {
                text: qrContent,
                width: 400,
                height: 400,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            const generatedImg = qrContainer.querySelector('img');
            if (generatedImg) {
                // Generic alt update
                generatedImg.alt = "Generated QR Code";
            }
            if (shouldSlide) slideToQR();
        } else {
            // Only clear if we explicitly tried to generate (clicked button) or inputs are empty
            // For simplicity, if content is null, we clear.
            if (true) { // Logic simplified: if generator returns null, input is invalid/empty
                qrContainer.innerHTML = '';
                qrPlaceholder.classList.remove('hidden');
                downloadPngBtn.disabled = true;
                downloadVectorBtn.disabled = true;
                qrCodeObj = null;
                // If we attempted to generate (clicked button) but failed validation, we might want to alert or stay on form
                // But current behavior is just show placeholder.
                slideToForm();
            }
        }
    }

    function slideToQR() {
        if (formView && qrView) {
            formView.classList.add('slide-out');
            setTimeout(() => qrView.classList.add('slide-in'), 250);
        }
    }

    function slideToForm() {
        if (formView && qrView) {
            qrView.classList.remove('slide-in');
            setTimeout(() => formView.classList.remove('slide-out'), 250);
        }
    }

    // Attach listeners to ALL potential inputs
    const allInputs = [
        ssidInput, passwordInput, encryptionSelect, hiddenCheckbox,
        whatsappPhoneInput, whatsappMessageInput,
        websiteUrlInput,
        paymentValueInput, paymentTypeSelect,
        phoneInput,
        mapsInput,
        vcardFnInput, vcardOrgInput, vcardTitleInput, vcardTelInput, vcardEmailInput, vcardUrlInput
    ];

    allInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => updateQR(false));
            input.addEventListener('change', () => updateQR(false));
        }
    });

    if (generateBtn) {
        generateBtn.addEventListener('click', () => updateQR(true));

        generateBtn.addEventListener('mouseenter', function (e) {
            const button = this;
            if (button.disabled) return;

            // Remove any existing ripples
            const existingRipples = button.querySelectorAll('.btn-ripple');
            existingRipples.forEach(ripple => ripple.remove());

            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate the maximum distance from mouse point to button corners
            const buttonWidth = rect.width;
            const buttonHeight = rect.height;
            const maxDistance = Math.max(
                Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
                Math.sqrt(Math.pow(buttonWidth - x, 2) + Math.pow(y, 2)),
                Math.sqrt(Math.pow(x, 2) + Math.pow(buttonHeight - y, 2)),
                Math.sqrt(Math.pow(buttonWidth - x, 2) + Math.pow(buttonHeight - y, 2))
            );

            // Create ripple element at mouse position
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.opacity = '0.9';
            // Bright gradient from #00BFFF (bright center) to #3B82F6 (darker edges)
            ripple.style.background = 'radial-gradient(circle, #00BFFF 0%, #1E90FF 50%, #3B82F6 100%)';
            ripple.style.mixBlendMode = 'screen'; // Makes colors brighter when overlaying
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '0';
            ripple.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            ripple.style.position = 'absolute';

            button.appendChild(ripple);
            ripple.offsetHeight;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const size = maxDistance * 2;
                    ripple.style.width = size + 'px';
                    ripple.style.height = size + 'px';
                });
            });
        });

        generateBtn.addEventListener('mouseleave', function () {
            this.querySelectorAll('.btn-ripple').forEach(ripple => {
                ripple.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                ripple.style.opacity = '0';
                setTimeout(() => ripple.parentNode?.removeChild(ripple), 500);
            });
        });
    }

    closeQrBtn?.addEventListener('click', slideToForm);

    downloadPngBtn?.addEventListener('click', () => {
        if (!qrCodeObj) return;
        const img = qrContainer.querySelector('img');
        const canvas = qrContainer.querySelector('canvas');
        const url = img?.src || canvas?.toDataURL("image/png");
        if (url) {
            const link = document.createElement('a');
            link.download = `wifi-qr-${Date.now()}.png`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    downloadVectorBtn?.addEventListener('click', () => {
        if (!qrCodeObj) return;
        if (adTimer) clearTimeout(adTimer);
        if (countdownInterval) clearInterval(countdownInterval);
        qrContainer.style.display = 'none';
        adContainer.style.display = 'flex';

        // (Re)initialize AdSense ad each time we show the ad gate.
        // This avoids the case where an <ins.adsbygoogle> exists but was never pushed/initialized.
        if (adContent) {
            adContent.innerHTML = '';

            const ins = document.createElement('ins');
            ins.className = 'adsbygoogle';
            ins.style.display = 'block';
            ins.setAttribute('data-ad-client', 'ca-pub-7635271375039898');
            ins.setAttribute('data-ad-slot', '4136885580');
            ins.setAttribute('data-ad-format', 'rectangle');
            ins.setAttribute('data-full-width-responsive', 'false');
            adContent.appendChild(ins);

            // Queue/render the ad (may no-op if AdSense not approved, adblocked, etc.)
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                // Don't break the download flow if ads fail
                console.warn('AdSense init failed:', e);
            }
        }

        let countdown = 10;
        if (adCountdown) adCountdown.textContent = countdown;
        countdownInterval = setInterval(() => {
            countdown--;
            if (adCountdown) adCountdown.textContent = countdown;
            if (countdown <= 0) clearInterval(countdownInterval);
        }, 1000);
        adTimer = setTimeout(() => {
            if (countdownInterval) clearInterval(countdownInterval);
            adContainer.style.display = 'none';
            qrContainer.style.display = 'flex';
            if (adCountdown) adCountdown.textContent = '10';
            downloadSVG();
        }, 10000);
    });

    function downloadSVG() {
        if (!qrCodeObj) return;
        const img = qrContainer.querySelector('img');
        const canvas = qrContainer.querySelector('canvas');
        const imageData = img?.src || canvas?.toDataURL("image/png");
        if (imageData) {
            const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" viewBox="0 0 400 400"><image width="400" height="400" xlink:href="${imageData}"/></svg>`;
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `wifi-qr-${Date.now()}.svg`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    if (encryptionSelectComponent) {
        const selectTrigger = encryptionSelectComponent.querySelector('.material-select-trigger');
        const selectValue = encryptionSelectComponent.querySelector('.material-select-value');
        const selectOptions = encryptionSelectComponent.querySelectorAll('.material-select-option');
        const hiddenInput = encryptionSelect;
        const optionTexts = { 'WPA': 'WPA/WPA2', 'WEP': 'WEP', 'nopass': 'Open (no password)' };

        function updateSelectValue(value) {
            hiddenInput.value = value;
            selectValue.textContent = optionTexts[value] || value;
            selectOptions.forEach(opt => {
                opt.classList.toggle('selected', opt.getAttribute('data-value') === value);
            });
        }

        updateSelectValue(hiddenInput.value || 'WPA');
        encryptionSelectComponent.classList.add('has-value');

        selectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = encryptionSelectComponent.classList.contains('open');
            if (isOpen) {
                encryptionSelectComponent.classList.remove('open');
            } else {
                document.querySelectorAll('.material-select.open').forEach(select => {
                    if (select !== encryptionSelectComponent) select.classList.remove('open');
                });
                encryptionSelectComponent.classList.add('open');
            }
        });

        selectOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                updateSelectValue(value);
                encryptionSelectComponent.classList.remove('open');
                hiddenInput.value = value;
                hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });

        document.addEventListener('click', (e) => {
            if (!encryptionSelectComponent.contains(e.target)) {
                encryptionSelectComponent.classList.remove('open');
            }
        });

        hiddenInput.addEventListener('change', () => updateQR(false));
    }

    setTimeout(() => updateQR(false), 100);

    function openHelpModal() {
        helpModal?.classList.add('active');
    }

    function closeHelpModal() {
        helpModal?.classList.remove('active');
    }

    helpLink?.addEventListener('click', (e) => {
        e.preventDefault();
        openHelpModal();
    });

    helpModalClose?.addEventListener('click', closeHelpModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && helpModal?.classList.contains('active')) {
            closeHelpModal();
        }
    });
});

