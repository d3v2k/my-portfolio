// Lighthouse audit script
// This script can be run to validate performance optimizations

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const URL = 'http://localhost:4173'; // Vite preview URL
const OUTPUT_DIR = path.join(__dirname, 'lighthouse-reports');
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate timestamp for report name
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputPath = path.join(OUTPUT_DIR, `report-${timestamp}`);

// Build the lighthouse command
const lighthouseCmd = `npx lighthouse ${URL} --output html --output json --output-path ${outputPath} --only-categories=${CATEGORIES.join(',')} --view`;

console.log('Running Lighthouse audit...');
console.log(`URL: ${URL}`);
console.log(`Output: ${outputPath}`);

// Execute lighthouse
exec(lighthouseCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running Lighthouse: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Lighthouse stderr: ${stderr}`);
  }
  
  console.log(`Lighthouse audit completed successfully.`);
  console.log(`Report saved to: ${outputPath}.report.html`);
  
  // Parse the JSON report to extract scores
  try {
    const jsonReport = require(`${outputPath}.report.json`);
    const { categories } = jsonReport;
    
    console.log('\nPerformance Scores:');
    console.log('==================');
    
    Object.entries(categories).forEach(([key, category]) => {
      const score = Math.round(category.score * 100);
      const color = score >= 90 ? '\x1b[32m' : score >= 50 ? '\x1b[33m' : '\x1b[31m';
      console.log(`${color}${category.title}: ${score}/100\x1b[0m`);
    });
    
    // Check if performance score meets threshold
    const performanceScore = Math.round(categories.performance.score * 100);
    if (performanceScore < 90) {
      console.log('\n\x1b[33mWarning: Performance score is below 90. Consider further optimizations.\x1b[0m');
    } else {
      console.log('\n\x1b[32mSuccess: Performance score meets or exceeds target of 90.\x1b[0m');
    }
  } catch (err) {
    console.error(`Error parsing Lighthouse JSON report: ${err.message}`);
  }
});