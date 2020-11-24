/* global chrome document */
/* eslint no-undef: "error" */

chrome.runtime.sendMessage('getState', (state) => {
  if (state) sortItems()
})

/* Helpers */
const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
}

const flatten = (array) => array.reduce((acc, arr) => [...acc, ...arr], [])

const getItemId = (item) =>
  (item
    .querySelector('.ui-search-item__group__element.ui-search-link')
    .getAttribute('href')
    .replace(/-/g, '')
    .match(/MLA\d*/g) || [''])[0]

function sortItems() {
  // Declare ids and class selectors
  const listSelector = '.ui-search-layout.ui-search-layout--stack'
  const itemSelector = '.ui-search-layout__item'
  const groupPriceSelector = '.ui-search-item__group--price'

  // Get all elements IDs
  const rowItems = [...document.querySelectorAll(itemSelector)]
  const ids = rowItems.map((rowItem) => getItemId(rowItem)).filter((id) => !id || id !== 'MLA')

  // Create chunks every 20 items, since ML API can only receive until 20 ids
  const idChunks = chunk(ids, 20)

  // Trigger parallels fetchs
  const responses = Promise.all(
    idChunks.map((idChunk) =>
      fetch(`https://api.mercadolibre.com/items?ids=${idChunk.join(',')}&attributes=id,sold_quantity`)
        .then((res) => res.json())
        .then((data) => {
          return data.map((item) => ({
            id: item.body.hasOwnProperty('id') ? item.body.id : 0,
            soldQuantity: item.body.hasOwnProperty('sold_quantity') ? item.body.sold_quantity : 0,
          }))
        }),
    ),
  )

  // Now that we have the data we have to insert it on the DOM
  responses.then((data) => {
    const flattenData = flatten(data)

    rowItems.forEach((rowItem) => {
      const id = getItemId(rowItem)
      const { soldQuantity } = flattenData.find(({ id: itemId }) => itemId === id) || { soldQuantity: 0 }
      const $soldQuantity = rowItem.querySelector(groupPriceSelector)

      $soldQuantity.innerHTML += `
        <span class="sold_quantity" style="margin-top: 4px; font-size: 14px; font-weight: 600; padding: 0 6px; color: rgb(66, 90, 112); background-color: rgb(228, 231, 235); text-transform: uppercase">
          ${soldQuantity > 0 ? '+' : ''}${soldQuantity} vendidos
        </span>
      `
    })

    // Sort all the quantity of sold products descendly
    const rowItemsUpdated = [...document.querySelectorAll(itemSelector)]
    const rowItemsSorted = rowItemsUpdated.sort((a, b) => {
      const valueA = a.querySelector('.sold_quantity').innerText.replace(/\D/g, '')
      const valueB = b.querySelector('.sold_quantity').innerText.replace(/\D/g, '')

      return valueA - valueB
    })

    // Clean all items inside the list
    const listView = document.querySelector(listSelector)
    listView.innerHTML = null

    // Insert all the items sorted descendly
    rowItemsSorted.forEach((row) => {
      listView.insertAdjacentElement('afterbegin', row)
    })
  })
}
