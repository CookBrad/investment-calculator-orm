const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '');
const modelDefenitions = {};

fs.readdirSync(modelsDir).forEach(file => {
    if (file.endsWith('.js') && file !== 'index.js') {
        const modelName = file.replace('.js', '');
        modelDefenitions[modelName] = require(path.join(modelsDir, file));
    }
});

module.exports = modelDefenitions;