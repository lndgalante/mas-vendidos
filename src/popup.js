var btnUpdate = document.getElementById('btnUpdate')
btnUpdate.addEventListener('click', updateState)
chrome.runtime.sendMessage('getState', function(enabled) {
  enabled ? (btnUpdate.innerHTML = 'Desactivar') : (btnUpdate.innerHTML = 'Activar')
})
function updateState() {
  chrome.runtime.sendMessage(btnUpdate.innerHTML)
  if (btnUpdate.innerHTML == 'Activar') {
    btnUpdate.innerHTML = 'Desactivar'
  } else {
    btnUpdate.innerHTML = 'Activar'
  }
  window.close()
}
