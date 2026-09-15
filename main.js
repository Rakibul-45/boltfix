document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (event) {
    var target = document.querySelector(link.getAttribute('href'))
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
  })
})

var modal = document.querySelector('.modal')
function closeModal() {
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
}
document.querySelector('.demo-button').addEventListener('click', function () {
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
})
document.querySelector('.modal-close').addEventListener('click', closeModal)
document.querySelector('.modal-dismiss').addEventListener('click', closeModal)
modal.addEventListener('click', function (event) {
  if (event.target === modal) closeModal()
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal()
})

var faqDetails = document.querySelectorAll('.faq-list details')
faqDetails.forEach(function (detail) {
  detail.addEventListener('toggle', function () {
    var summary = detail.querySelector('summary span')
    if (summary) summary.textContent = detail.open ? '−' : '+'
  })
})

var revealTargets = document.querySelectorAll('.feature-card, .interface-card, .system-card, .step-card, .compare-card, .dashboard-window, .price-card, .fit-card, .faq-list details')
revealTargets.forEach(function (el) { el.classList.add('reveal') })

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)
revealTargets.forEach(function (el) { observer.observe(el) })
