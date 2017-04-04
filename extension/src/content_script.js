function findMostSelled() {
  // Check if active view mode is List or Gallery mode
  let soldQuantitySelector;
  let stringToReplace;
  let itemHeight;

  const viewMode = document.querySelector('.ico');

  const viewModeActive = viewMode.className.includes('list selected') ? 'list' : 'gallery';

  if (viewModeActive === 'gallery') {
    soldQuantitySelector = '.sold-quantity';
    stringToReplace = ' vendidos ';
    itemHeight = 110;
  } else if (viewModeActive === 'list') {
    soldQuantitySelector = '.extra-info-sold';
    stringToReplace = ' vendidos';
    itemHeight = 60;
  }

  // Find the most selled one on the list and save it to mostSelled
  const infoSolds = [...document.querySelectorAll(soldQuantitySelector)];

  const unitsSold = infoSolds
    .map(infoSold => infoSold.innerText.replace(stringToReplace, ''))
    .map(soldQuantity => !isNaN(soldQuantity) ? parseInt(soldQuantity) : 0);

  const mostSelled = unitsSold.reduce((a, b) => Math.max(a, b));

  // Find and Style the entire row where the mostSelled value lives
  const rowItems = [...document.querySelectorAll('.rowItem')];

  const rowItemElement = rowItems.find(row => {
    const info = row.querySelector(soldQuantitySelector);
    return info ? info.innerText.includes(mostSelled) : false;
  });

  rowItemElement.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
  rowItemElement.style.backgroundColor = '#F9ED69';
  rowItemElement.style.borderColor = '#F08A5D';
  rowItemElement.style.borderWidth = '4px';
  rowItemElement.style.margin = '4px';

  // Find the HTML element where the most selled value lives
  const mostSelledElement = infoSolds.find(product => product.innerText.includes(mostSelled));

  // Scroll to where that mostSelledElement element is
  const mostSelledElementRect = rowItemElement.getBoundingClientRect();
  const offset = mostSelledElementRect.top + window.scrollY - itemHeight;
  window.scrollTo(0, offset);
}

document.addEventListener('DOMNodeInserted', findMostSelled);
document.addEventListener('DOMContentLoaded', findMostSelled);
