let selectedFeatureIds = [];

function getFeatureById(id) {
    for (const cat in DB.featureCategories) {
        const found = DB.featureCategories[cat].find(f => f.id === id);
        if (found) return found;
    }
    return null;
}

function init() {
    const container = document.getElementById('defender-cats');
    for (const [cat, features] of Object.entries(DB.featureCategories)) {
        let html = `<div class="cat-block"><div class="cat-head">${cat}</div>`;
        features.forEach(feat => {
            html += `
                <div class="feat" id="ui-${feat.id}" onclick="toggleFeature('${feat.id}')">
                    <div class="feat-checkbox"></div>
                    <div style="flex: 1;">
                        <strong>${feat.name}</strong><br>
                        <small>${feat.desc}</small>
                        <div style="margin-top: 6px;">
                            <a href="${feat.learn}" target="_blank" class="learn-link" onclick="handleLinkClick(event)">📘 MS Learn</a>
                        </div>
                    </div>
                </div>`;
        });
        html += `</div>`;
        container.innerHTML += html;
    }
    document.getElementById('seats').addEventListener('input', calculate);
    calculate(); // Run once on load to set initial text states
}

function handleLinkClick(event) { event.stopPropagation(); }

function toggleFeature(id) {
    const index = selectedFeatureIds.indexOf(id);
    if (index > -1) selectedFeatureIds.splice(index, 1);
    else selectedFeatureIds.push(id);
    
    updateUI();
    calculate();
}

function updateUI() {
    document.querySelectorAll('.feat').forEach(el => el.classList.remove('selected'));
    selectedFeatureIds.forEach(id => {
        const el = document.getElementById(`ui-${id}`);
        if (el) el.classList.add('selected');
    });
}

function calculate() {
    const seats = parseInt(document.getElementById('seats').value) || 0;
    const isLarge = seats > 300;
    
    // Update the UI text based on seat count
    const statusText = document.getElementById('seat-status');
    if (isLarge) {
        statusText.innerHTML = "<span style='color:var(--text-main); font-weight:bold;'>Over 300 users. Business plans strictly disabled.</span>";
    } else {
        statusText.innerHTML = "Evaluating Business + Add-ons, and Enterprise plans.";
    }

    const resDiv = document.getElementById('results');
    
    if (selectedFeatureIds.length === 0) {
        resDiv.innerHTML = `<div class="empty-state">Select required capabilities on the left to generate licensing scenarios.</div>`;
        return;
    }

    // 1. Gather Required Capabilities based on selected features
    const requiredCapabilities = [];
    selectedFeatureIds.forEach(id => {
        const feature = getFeatureById(id);
        if (feature && !requiredCapabilities.includes(feature.requires)) {
            requiredCapabilities.push(feature.requires);
        }
    });

    let validSolutions = [];

    // 2. Evaluate all plans
    DB.plans.forEach(plan => {
        // Enforce the 300 seat cap strictly
        if (isLarge && plan.tier === 'business') return;

        let missingCapabilities = [];
        let planAddons = [];
        let totalPerUserPrice = plan.price;

        // Check what capabilities the base plan lacks
        requiredCapabilities.forEach(req => {
            if (!plan.capabilities.includes(req)) {
                missingCapabilities.push(req);
            }
        });

        let canBeFulfilled = true;

        // If missing native capabilities, try to find Add-ons to fill the gaps
        missingCapabilities.forEach(missing => {
            const addon = DB.addons.find(a => a.provides === missing);
            if (addon) {
                planAddons.push(addon);
                totalPerUserPrice += addon.price;
            } else {
                canBeFulfilled = false; // Cannot fulfill this requirement even with add-ons
            }
        });

        if (canBeFulfilled) {
            validSolutions.push({
                planName: plan.name,
                tier: plan.tier,
                basePrice: plan.price,
                totalPerUserPrice: totalPerUserPrice,
                addonsUsed: planAddons,
                compliance: plan.compliance
            });
        }
    });

    // 3. Sort solutions by cheapest total cost
    validSolutions.sort((a, b) => a.totalPerUserPrice - b.totalPerUserPrice);

    if (validSolutions.length === 0) {
        resDiv.innerHTML = `<div class="seats-alert" style="display:block;">No combination of base plans and add-ons can fulfill all requirements.</div>`;
        return;
    }

    // 4. Render the solutions
    resDiv.innerHTML = validSolutions.map((solution, i) => {
        let addonHtml = '';
        if (solution.addonsUsed.length > 0) {
            addonHtml = `<div style="margin-top: 12px; font-size: 12px; background: var(--bg); padding: 10px; border-radius: 6px;">
                <strong>Included Add-ons:</strong>
                <ul style="padding-left: 20px; color: var(--text-muted); margin-top: 4px;">
                    ${solution.addonsUsed.map(a => `<li>${a.name} (+$${a.price.toFixed(2)}/mo)</li>`).join('')}
                </ul>
            </div>`;
        }

        return `
            <div class="plan-card ${i === 0 ? 'best' : ''}">
                <div class="plan-badge">${i === 0 ? 'Most Cost-Effective' : 'Alternative Scenario'}</div>
                <span class="tag">${solution.tier.toUpperCase()}</span>
                <h3>${solution.planName}</h3>
                
                <div class="price-box">
                    <span class="total-price">$${(solution.totalPerUserPrice * seats).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span class="price-period">/month total</span>
                </div>
                <div class="unit-price">$${solution.totalPerUserPrice.toFixed(2)} per user/mo (Base: $${solution.basePrice.toFixed(2)})</div>
                
                ${addonHtml}

                <div style="margin-top: 14px; padding-top: 14px; border-top: 1px dashed var(--border); font-size: 11px; color: var(--text-muted);">
                    🛡️ <strong>Compliance:</strong> ${solution.compliance}
                </div>
            </div>
        `;
    }).join('');
}

init();
