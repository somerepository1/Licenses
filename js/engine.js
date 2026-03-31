let selectedIds = [];
let lockedIds = [];

// Поиск фичи по всей базе (и в левой, и в правой колонке)
function getFeatureById(id) {
    for (const cat of Object.values(DB.featureCategories)) {
        let found = cat.left.features.find(f => f.id === id);
        if (found) return found;
        if (cat.right) {
            found = cat.right.features.find(f => f.id === id);
            if (found) return found;
        }
    }
    return null;
}

function init() {
    const container = document.getElementById('defender-cats');
    for (const [catName, cols] of Object.entries(DB.featureCategories)) {
        let html = `
        <div class="cat-block">
            <div class="cat-head">${catName}</div>
            <div class="feat-grid-wrapper">
                <div class="feat-col">
                    <div class="col-label">${cols.left.title}</div>
                    ${renderFeatures(cols.left.features)}
                </div>
                <div class="feat-col">
                    <div class="col-label">${cols.right.title}</div>
                    ${renderFeatures(cols.right.features)}
                </div>
            </div>
        </div>`;
        container.innerHTML += html;
    }
    document.getElementById('seats').addEventListener('input', calculate);
}

function renderFeatures(features) {
    return features.map(f => `
        <div class="feat" id="ui-${f.id}" onclick="handleToggle('${f.id}')">
            <div class="feat-checkbox"></div>
            <div style="flex:1">
                <strong>${f.name}</strong>
                <small>${f.desc}</small>
                <div class="included-badge">↳ Included by Plan 2</div>
                <a href="${f.learn}" target="_blank" class="learn-link" onclick="event.stopPropagation()">📘 Microsoft Learn</a>
            </div>
        </div>
    `).join('');
}

function handleToggle(id) {
    if (lockedIds.includes(id)) return; // Блокируем клик, если фича уже включена пакетом
    
    const idx = selectedIds.indexOf(id);
    if (idx > -1) selectedIds.splice(idx, 1);
    else selectedIds.push(id);
    
    syncDependencies();
    updateUI();
    calculate();
}

// Проверка: если выбран Plan 2, блокируем входящий в него Plan 1
function syncDependencies() {
    lockedIds = [];
    selectedIds.forEach(id => {
        const feat = getFeatureById(id);
        if (feat && feat.includes) {
            feat.includes.forEach(incId => {
                if (!lockedIds.includes(incId)) lockedIds.push(incId);
                const sIdx = selectedIds.indexOf(incId);
                if (sIdx > -1) selectedIds.splice(sIdx, 1); // Убираем из выбранных вручную
            });
        }
    });
}

function updateUI() {
    document.querySelectorAll('.feat').forEach(el => el.classList.remove('selected', 'locked'));
    
    selectedIds.forEach(id => {
        const el = document.getElementById(`ui-${id}`);
        if (el) el.classList.add('selected');
    });
    
    lockedIds.forEach(id => {
        const el = document.getElementById(`ui-${id}`);
        if (el) el.classList.add('locked');
    });
}

function calculate() {
    const seats = parseInt(document.getElementById('seats').value) || 0;
    const isLarge = seats > 300;
    
    document.getElementById('seat-status').innerHTML = isLarge 
        ? "<span style='color:#b42318; font-weight:bold;'>Over 300 users. Business plans disabled.</span>"
        : "Evaluating Business & Enterprise plans.";

    const resDiv = document.getElementById('results');
    
    if (selectedIds.length === 0 && lockedIds.length === 0) {
        resDiv.innerHTML = `<div class="empty-state">Select required capabilities on the left to generate licensing scenarios.</div>`;
        return;
    }

    // Собираем требования ВСЕХ фич (и выбранных, и заблокированных пакетом)
    const requiredCapabilities = [];
    [...selectedIds, ...lockedIds].forEach(id => {
        const feature = getFeatureById(id);
        if (feature && !requiredCapabilities.includes(feature.requires)) {
            requiredCapabilities.push(feature.requires);
        }
    });

    let validSolutions = [];

    DB.plans.forEach(plan => {
        if (isLarge && plan.tier === 'business') return;

        let missingCapabilities = [];
        let planAddons = [];
        let totalPerUserPrice = plan.price;

        requiredCapabilities.forEach(req => {
            if (!plan.capabilities.includes(req)) missingCapabilities.push(req);
        });

        let canBeFulfilled = true;
        missingCapabilities.forEach(missing => {
            const addon = DB.addons.find(a => a.provides === missing);
            if (addon) {
                planAddons.push(addon);
                totalPerUserPrice += addon.price;
            } else {
                canBeFulfilled = false;
            }
        });

        if (canBeFulfilled) {
            validSolutions.push({
                planName: plan.name,
                tier: plan.tier,
                basePrice: plan.price,
                totalPrice: totalPerUserPrice,
                addonsUsed: planAddons
            });
        }
    });

    validSolutions.sort((a, b) => a.totalPrice - b.totalPrice);

    if (validSolutions.length === 0) {
        resDiv.innerHTML = `<div class="empty-state" style="color:red; border-color:red;">No valid licensing combination found for these requirements.</div>`;
        return;
    }

    resDiv.innerHTML = validSolutions.map((sol, i) => {
        let addonHtml = sol.addonsUsed.length > 0 
            ? `<div style="margin-top:10px; font-size:12px; background:var(--bg); padding:10px; border-radius:6px;">
                <strong>Included Add-ons:</strong>
                <ul style="padding-left:16px; margin-top:4px;">${sol.addonsUsed.map(a => `<li>${a.name} (+$${a.price.toFixed(2)}/mo)</li>`).join('')}</ul>
               </div>` 
            : '';

        return `
            <div class="plan-card ${i === 0 ? 'best' : ''}">
                <div class="plan-badge">${i === 0 ? 'Most Cost-Effective' : 'Alternative'}</div>
                <span class="tag">${sol.tier.toUpperCase()}</span>
                <h3>${sol.planName}</h3>
                <div class="price-box">
                    <span class="total-price">$${(sol.totalPrice * seats).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    <span class="price-period">/month total</span>
                </div>
                <div class="unit-price">$${sol.totalPrice.toFixed(2)} per user/mo (Base: $${sol.basePrice.toFixed(2)})</div>
                ${addonHtml}
            </div>
        `;
    }).join('');
}

init();
