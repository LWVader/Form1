let testData = {
    "SPL70": 45, "SPL100": 8, "SPL140": 0, "SPL170": 12,
    "SPL250": 5, "SPL350": 30, "SPL350HD": 2
};

const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const modelSelect = document.getElementById('product-name');
const qtyInput = document.getElementById('quantity');
const statusInput = document.getElementById('status');
const updateBtn = document.getElementById('updateBtn');
const addNewBtn = document.getElementById('addNewBtn');
const timestampDiv = document.getElementById('timestamp');

// 1. Search Logic
function performSearch() {
    const filter = searchBar.value.toLowerCase();
    let found = false;

    for (let option of modelSelect.options) {
        const match = option.text.toLowerCase().includes(filter);
        option.style.display = match ? "" : "none";
        if (match && !found && filter !== "") {
            modelSelect.value = option.value; // Auto-select first match
            loadSelectedData();
            found = true;
        }
    }
}

searchBtn.addEventListener('click', performSearch);
searchBar.addEventListener('keypress', (e) => { if(e.key === 'Enter') performSearch(); });

// 2. Load Data Helper
function loadSelectedData() {
    const selected = modelSelect.value;
    if (testData[selected] !== undefined) {
        qtyInput.value = testData[selected];
        updateUI();
    }
}

modelSelect.addEventListener('change', loadSelectedData);

// 3. Add New Item Logic
addNewBtn.addEventListener('click', () => {
    const newName = searchBar.value.trim();
    if (newName === "" || testData[newName]) {
        alert("Enter a unique name in the search bar to add a new model.");
        return;
    }

    // Add to JavaScript object
    testData[newName] = 0;

    // Add to HTML Dropdown
    const newOpt = document.createElement('option');
    newOpt.value = newName;
    newOpt.text = `${newName} `;
    modelSelect.add(newOpt);
    
    modelSelect.value = newName;
    loadSelectedData();
    alert(`Added ${newName} to inventory list.`);
});

// 4. Status UI logic
function updateUI() {
    const qty = parseInt(qtyInput.value) || 0;
    statusInput.className = '';
    if (qty === 0) { statusInput.value = "❌ Out of Stock"; statusInput.classList.add('status-out'); }
    else if (qty <= 10) { statusInput.value = "⚠️ Low Stock"; statusInput.classList.add('status-low'); }
    else { statusInput.value = "✅ In Stock"; statusInput.classList.add('status-in'); }
}

qtyInput.addEventListener('input', updateUI);

// 5. Save Changes
updateBtn.addEventListener('click', () => {
    const model = modelSelect.value;
    if (!model) return;
    testData[model] = parseInt(qtyInput.value) || 0;
    timestampDiv.innerText = `Last updated: ${new Date().toLocaleTimeString()} (${model})`;
    alert("Saved successfully.");
});

updateUI();