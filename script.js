function setRandomUnsplashBackground() {
    if (window.innerWidth >= 768) {
        const randomSeed = Date.now() + Math.floor(Math.random() * 1000000);
        const imageUrl = `https://picsum.photos/1600/900?random=${randomSeed}`;
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
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const encryptionSelect = document.getElementById('encryption');
    const encryptionSelectComponent = document.getElementById('encryption-select');
    const hiddenCheckbox = document.getElementById('hidden');
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

    function updateQR(shouldSlide = false) {
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
                generatedImg.alt = "WiFi QR Code for " + ssidInput.value.trim();
            }
            if (shouldSlide) slideToQR();
        } else {
            if (!ssidInput.value.trim()) {
                qrContainer.innerHTML = '';
                qrPlaceholder.classList.remove('hidden');
                downloadPngBtn.disabled = true;
                downloadVectorBtn.disabled = true;
                qrCodeObj = null;
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

    [ssidInput, passwordInput, encryptionSelect, hiddenCheckbox].forEach(input => {
        input?.addEventListener('input', () => updateQR(false));
        input?.addEventListener('change', () => updateQR(false));
    });

    if (generateBtn) {
        generateBtn.addEventListener('click', () => updateQR(true));
        
        generateBtn.addEventListener('mouseenter', function(e) {
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
        
        generateBtn.addEventListener('mouseleave', function() {
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
        
        // Initialize AdSense ad if not already loaded
        if (!adContent.querySelector('.adsbygoogle')) {
            adContent.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7635271375039898" data-ad-slot="4136885580" data-ad-format="auto" data-full-width-responsive="true"></ins>';
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('AdSense error:', e);
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

