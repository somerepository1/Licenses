let selectedFeatures = [];

function init() {
    const container = document.getElementById('defender-cats');
    for (const [cat, items] of Object.entries(DB.defenderSuite)) {
        let html = `<div class="cat-block"><div class="cat-head">${cat}</div>`;
        items.forEach(item => {
            html += `
                <div class="feat" onclick="toggleFeature('${item.id}')" id="feat-${item.id}">
                    <div class="feat-checkbox"></div>
                    <div><strong>${item.id}</strong><br><small>${item.desc}</small></div>
                </div>`;
        });
        html += `</div>`;
        container.innerHTML += html;
    }
    document.getElementById('seats').addEventListener('input', calculate);
}

function toggleFeature(id) {
    const index = selectedFeatures.indexOf(id);
    if (index > -1) {
        selectedFeatures.splice(index, 1);
    } else {
        selectedFeatures.push(id);
    }
    updateUI();
    calculate();
}

function updateUI() {
    document.querySelectorAll('.feat').forEach(el => el.classList.remove('selected'));
    selectedFeatures.forEach(id => {
        const el = document.getElementById(`feat-${id}`);
        if (el) el.classList.add('selected');
    });
}

function calculate() {
    const seats = parseInt(document.getElementById('seats').value) || 0;
    const isLarge = seats > 300;
    document.getElementById('seats-warn').style.display = isLarge ? 'block' : 'none';

    // Logic: Find plans that include ALL selected features
    const results = DB.plans.filter(plan => {
        if (isLarge && plan.tier === 'business') return false;
        return selectedFeatures.every(feat => plan.features.includes(feat));
    });

    const resDiv = document.getElementById('results');
    if (selectedFeatures.length === 0) {
        resDiv.innerHTML = `<div class="empty-state">Select features on the left to see recommended plans.</div>`;
        return;
    }

    if (results.length === 0) {
        resDiv.innerHTML = `<div class="error-state">No single plan covers all selected features. Consider E5 or specialized Add-ons.</div>`;
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
            <div class="unit-price">$${p.price} per user/mo</div>
        </div>
    `).join('');
}

init();
