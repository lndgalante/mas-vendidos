function findMostSelled() {
  // Find the most selled one on the list and save it to mostSelled

  const products = [...document.querySelectorAll('.extra-info-sold')];

  const solds = products
    .map(product => product.innerText.replace(' vendidos', ''))
    .map(price => parseInt(price));

  const mostSelled = solds.reduce((a, b) => Math.max(a, b));

  // Find and Style the entire row where the most selled value lives

  const rows = [...document.querySelectorAll('.rowItem')];

  const row = rows.find(row => row.innerText.includes(mostSelled));

  row.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
  row.style.backgroundColor = '#F9ED69';
  row.style.borderColor = '#F08A5D';
  row.style.borderWidth = '4px';
  row.style.margin = '4px';

  // Find the html element where the most selled value lives

  const item = products.find(product => product.innerText.includes(mostSelled));

  item.style.borderRadius = '4px 0px 0px 4px';
  item.style.textTransform = 'uppercase';
  item.style.backgroundColor = '#212121';
  item.style.padding = '2px 0px 2px 4px';
  item.style.marginLeft = '-4px';
  item.style.lineHeight = '1.2';
  item.style.fontWeight = '700';
  item.style.fontSize = '18px';
  item.style.color = '#FFF';

  // Scroll to where that item (row) is

  const productHeight = document.querySelector('.rowItem').offsetHeight;
  const itemRect = item.getBoundingClientRect();
  const offset = itemRect.top + window.scrollY - productHeight;

  window.scrollTo(0, offset);
}

document.addEventListener('DOMNodeInserted', findMostSelled);
document.addEventListener('DOMContentLoaded', findMostSelled);
