var btnUpdate = document.getElementById('btnUpdate')
btnUpdate.addEventListener('click', updateState)

chrome.runtime.sendMessage('getState', enabled => (btnUpdate.innerHTML = enabled ? 'Desactivar' : 'Activar'))

function updateState() {
  chrome.runtime.sendMessage(btnUpdate.innerHTML)
  btnUpdate.innerHTML = btnUpdate.innerHTML === 'Activar' ? 'Desactivar' : 'Activar'
  window.close()
}
