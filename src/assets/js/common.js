function showMsg () {
  const html = document.documentElement.clientWidth
  document.documentElement.style.fontSize = html / 10 + 'px'
}
window.onload = showMsg ()
window.onresize = showMsg