/* global chrome document */
/* eslint no-undef: "error" */

chrome.runtime.sendMessage('getState', state => {
  if (state) sortItems()
})

/* Helpers */
const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
}

const flatten = array => array.reduce((acc, arr) => [...acc, ...arr], [])

const getItemId = item =>
  (item
    .querySelector('.list-view-item-title a')
    .getAttribute('href')
    .replace(/-/g, '')
    .match(/MLA\d*/g) || [''])[0]

function sortItems() {
  // Declare ids and class selectors
  const listSelector = '#searchResults'
  const itemSelector = '.results-item'
  const soldQuantitySelector = '.item__condition'

  // Get all elements IDs
  const rowItems = [...document.querySelectorAll(itemSelector)]
  const ids = rowItems.map(rowItem => getItemId(rowItem)).filter(id => !id || id !== 'MLA')
  console.log('TCL: sortItems -> ids', ids)

  // Create chunks every 20 items, since ML API can only receive until 20 ids
  const idChunks = chunk(ids, 20)

  // Trigger parallels fetchs
  const responses = Promise.all(
    idChunks.map(idChunk =>
      fetch(`https://api.mercadolibre.com/items?ids=${idChunk.join(',')}&attributes=id,sold_quantity`)
        .then(res => res.json())
        .then(data => {
          console.log('TCL: sortItems -> data', data)
          return data.map(item => ({
            id: item.body.hasOwnProperty('id') ? item.body.id : 0,
            soldQuantity: item.body.hasOwnProperty('sold_quantity') ? item.body.sold_quantity : 0,
          }))
        })
    )
  )

  // Now that we have the data we have to insert it on the DOM
  responses.then(data => {
    const flattenData = flatten(data)

    rowItems.forEach(rowItem => {
      const id = getItemId(rowItem)
      const item = flattenData.find(({ id: itemId }) => itemId === id) || { soldQuantity: 0 }

      const $soldQuantity = rowItem.querySelector(soldQuantitySelector)
      $soldQuantity.textContent = `+${item.soldQuantity} vendidos - ${$soldQuantity.textContent}`
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
  })
}
