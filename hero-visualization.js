// Hero background visualization using Vanta Globe
// Exposes window.initHeroVisualization()
(function () {
    let vantaEffect = null;
    let initialized = false;

    function init() {
        if (initialized) return;
        initialized = true;

        const container = document.getElementById('hero-bg');
        if (!container) return;

        // Ensure THREE and VANTA are loaded
        if (!window.THREE || !window.VANTA || !window.VANTA.GLOBE) {
            // Retry shortly in case scripts haven't loaded yet
            setTimeout(init, 50);
            return;
        }

        // Controlled palette: subtle blues, no random color jumps
        vantaEffect = window.VANTA.GLOBE({
            el: container,
            mouseControls: true,
            touchControls: true,
            gyroControls: true,
            minHeight: 500.00,
            minWidth: 500.00,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x000000,
            backgroundAlpha: 0.0,
            color: 0x3b82f6, // ocean/lines color (blue-500)
            color2: 0x93c5fd, // secondary lines color (blue-300)
            size: 0.6
        });

        // Keep canvas full-bleed within container
        function onResize() {
            if (vantaEffect && vantaEffect.resize) vantaEffect.resize();
        }
        window.addEventListener('resize', onResize);
    }

    // Public API
    window.initHeroVisualization = init;

    // Cleanup if needed (not called automatically)
    window.destroyHeroVisualization = function() {
        if (vantaEffect && vantaEffect.destroy) {
            vantaEffect.destroy();
            vantaEffect = null;
        }
    };
})();


