let selectedFeatures = [];
let lockedFeatures = []; // New array to track items locked by higher tiers

// Helper function to find feature details in our database
function getFeatureData(id) {
    for (const cat in DB.defenderSuite) {
        const found = DB.defenderSuite[cat].find(item => item.id === id);
        if (found) return found;
    }
    return null;
}

function init() {
    const container = document.getElementById('defender-cats');
    for (const [cat, items] of Object.entries(DB.defenderSuite)) {
        let html = `<div class="cat-block"><div class="cat-head">${cat}</div>`;
        items.forEach(item => {
            html += `
                <div class="feat" onclick="toggleFeature('${item.id}')" id="feat-${item.id}">
                    <div>
                        <strong>${item.id}</strong><br>
                        <small>${item.desc}</small>
                        <div class="feat-included" style="display: none; font-size: 11px; color: var(--green-success); margin-top: 6px; font-weight: 600;">
                            ↳ Included via higher-tier selection
                        </div>
                    </div>
                </div>`;
        });
        html += `</div>`;
        container.innerHTML += html;
    }
    document.getElementById('seats').addEventListener('input', calculate);
}

function toggleFeature(id) {
    // If the feature is locked by a higher plan, prevent clicking
    if (lockedFeatures.includes(id)) return;

    const index = selectedFeatures.indexOf(id);
    if (index > -1) {
        selectedFeatures.splice(index, 1); // Deselect if already selected
    } else {
        selectedFeatures.push(id); // Select if not selected
    }
    
    recalculateLocks();
    updateUI();
    calculate();
}

function recalculateLocks() {
    lockedFeatures = [];
    
    // Check all currently selected features to see if they include others
    selectedFeatures.forEach(id => {
        const featData = getFeatureData(id);
        if (featData && featData.includes) {
            featData.includes.forEach(includedId => {
                if (!lockedFeatures.includes(includedId)) {
                    lockedFeatures.push(includedId);
                }
                
                // If the included feature was previously selected manually, remove it from the manual list
                const manualIdx = selectedFeatures.indexOf(includedId);
                if (manualIdx > -1) {
                    selectedFeatures.splice(manualIdx, 1);
                }
            });
        }
    });
}

function updateUI() {
    // Reset all UI states first
    document.querySelectorAll('.feat').forEach(el => {
        el.classList.remove('selected', 'locked');
        el.querySelector('.feat-included').style.display = 'none';
    });

    // Highlight explicitly selected features
    selectedFeatures.forEach(id => {
        const el = document.getElementById(`feat-${id}`);
        if (el) el.classList.add('selected');
    });

    // Highlight and lock implicitly included features
    lockedFeatures.forEach(id => {
        const el = document.getElementById(`feat-${id}`);
        if (el) {
            el.classList.add('selected'); // Keep the blue highlight
            el.classList.add('locked');   // Add the disabled opacity styling
            el.querySelector('.feat-included').style.display = 'block'; // Show the "Included" label
        }
    });
}

function calculate() {
    const seats = parseInt(document.getElementById('seats').value) || 0;
    const isLarge = seats > 300;
    document.getElementById('seats-warn').style.display = isLarge ? 'block' : 'none';

    // The required features for calculation are the manual selections (higher tiers cover the lower ones)
    const results = DB.plans.filter(plan => {
        if (isLarge && plan.tier === 'business') return false;
        // Check if the plan contains all explicitly selected high-tier features
        return selectedFeatures.every(feat => plan.features.includes(feat));
    });

    const resDiv = document.getElementById('results');
    if (selectedFeatures.length === 0 && lockedFeatures.length === 0) {
        resDiv.innerHTML = `<div class="empty-state">Select features on the left to see recommended plans.</div>`;
        return;
    }

    if (results.length === 0) {
        resDiv.innerHTML = `<div class="seats-alert" style="display:block;">No single plan covers all selected features. Consider E5 or specialized Add-ons.</div>`;
        return;
    }

    resDiv.innerHTML = results.map((p, i) => `
        <div class="plan-card ${i === 0 ? 'best' : ''}">
            <div class="plan-badge">${i === 0 ? 'Best Match' : 'Alternative'}</div>
            <span class="tag">${p.tier.toUpperCase()}</span>
            <h3>${p.name}</h3>
            <div class="price-box">
                <span class="total-price">$${(p.price * seats).toLocaleString()}</span>
                <span class="price-period">/month total</span>
            </div>
            <div class="unit-price">$${p.price.toFixed(2)} per user/mo</div>
        </div>
    `).join('');
}

init();
