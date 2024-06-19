const customCursor = document.getElementById('custom-cursor');
const clover = document.getElementById('clover');
let lastX;
let cursorEnabled = true;

function updateCursorVisibility() {
    if (window.innerWidth <= 768) {
        cursorEnabled = false;
        customCursor.style.display = 'none';
        document.body.style.cursor = 'auto'; // Show the default cursor
    } else {
        cursorEnabled = true;
        customCursor.style.display = 'block';
        document.body.style.cursor = 'none'; // Hide the default cursor
    }
}

document.addEventListener('mousemove', function(e) {
    if (cursorEnabled) {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;

        // Rotate cursor
        if (lastX !== undefined) {
            if (e.clientX < lastX) {
                clover.style.transform = 'rotate(-15deg)';
            } else if (e.clientX > lastX) {
                clover.style.transform = 'rotate(15deg)';
            }
        }
        lastX = e.clientX;

        // Add trail effect
        const trail = document.createElement('div');
        trail.classList.add('clover-trail');
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        document.body.appendChild(trail);
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
});

document.addEventListener('mouseleave', function() {
    if (cursorEnabled) {
        customCursor.classList.add('trail');
    }
});

document.addEventListener('mouseenter', function() {
    if (cursorEnabled) {
        customCursor.classList.remove('trail');
    }
});

document.getElementById('modeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('cursorToggle').addEventListener('click', function() {
    cursorEnabled = !cursorEnabled;
    if (cursorEnabled) {
        customCursor.style.display = 'block';
        document.body.style.cursor = 'none'; // Hide the default cursor
    } else {
        customCursor.style.display = 'none';
        document.body.style.cursor = 'auto'; // Show the default cursor
    }
});

// Handle window resize to update cursor visibility
window.addEventListener('resize', updateCursorVisibility);

// Initial check for cursor visibility based on window size
updateCursorVisibility();

// Disable custom cursor for touch devices
document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
        });
    }
});
