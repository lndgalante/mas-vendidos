/* global chrome document */
/* eslint no-undef: "error" */

chrome.runtime.sendMessage('getState', state => {
  if (state) {
    sortItems()
  }
})

function sortItems() {
  // Declare ids and class selectors
  const listSelector = '#searchResults'
  const itemSelector = '.results-item'
  const soldQuantitySelector = '.item__condition'

  // Add a li element "0 vendidos" to those products that didn't sell nothing yet
  const rowItems = [...document.querySelectorAll(soldQuantitySelector)]
  rowItems.forEach(row => {
    const text = row.innerText
    if (!text.includes('vendido')) {
      row.innerText = `0 vendidos - ${text}`
    }
  })

  // Sort all the quantity of sold products descendly
  const rowItemsUpdated = [...document.querySelectorAll(itemSelector)]
  const rowItemsSorted = rowItemsUpdated.sort((a, b) => {
    const valueA = a.querySelector(soldQuantitySelector).innerText.replace(/\D/g, '')

    const valueB = b.querySelector(soldQuantitySelector).innerText.replace(/\D/g, '')

    return valueA - valueB
  })

  // Clean all items inside the list
  const listView = document.querySelector(listSelector)
  listView.innerHTML = null

  // Insert all the items sorted descendly
  rowItemsSorted.forEach(row => {
    listView.insertAdjacentElement('afterbegin', row)
  })
}
