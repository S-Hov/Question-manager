export class QuestionManager {
    static instance = null

    selectors = {
        wrapper: '[data-js-question-wrapper]',
        modal: '[data-js-question-modal]',
        confirmBtn: '[data-js-question-confirm]',
        cancelBtn: '[data-js-question-cancel]',
        message: '[data-js-question-message]',
        timer: '[data-js-question-timer]',
        showClass: 'show',
        hideClass: 'hide',
        fadeOutClass: 'fade-out'
    }

    constructor() {
        if (QuestionManager.instance) {
            return QuestionManager.instance
        }

        QuestionManager.instance = this
    }

    ask({
        message = 'Are you sure?',
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        showButtons = true,
        timer = null,
        onTimeout = null
    } = {}) {
        return new Promise((resolve) => {
            const wrapper = this.createWrapper(message, confirmText, cancelText, showButtons, timer)
            document.body.appendChild(wrapper)

            const modal = wrapper.querySelector(this.selectors.modal)
            const confirmBtn = wrapper.querySelector(this.selectors.confirmBtn)
            const cancelBtn = wrapper.querySelector(this.selectors.cancelBtn)
            const timerElement = wrapper.querySelector(this.selectors.timer)

            let timerInterval = null
            let timeLeft = timer
            let isClosed = false

            const close = (result) => {
                if (isClosed) {
                    return
                }

                isClosed = true

                if (timerInterval) {
                    clearInterval(timerInterval)
                }
                
                modal.classList.remove(this.selectors.showClass)
                modal.classList.add(this.selectors.hideClass)
                wrapper.classList.add(this.selectors.fadeOutClass)

                const removeWrapper = () => {
                    wrapper.remove()
                }

                modal.addEventListener('transitionend', removeWrapper, { once: true })
                setTimeout(removeWrapper, 300)

                resolve(result)
            }

            wrapper.questionManagerClose = close

            if (timer && timer > 0 && timerElement) {
                timerElement.textContent = timeLeft
                
                const updateTimer = () => {
                    timeLeft--
                    timerElement.textContent = timeLeft
                    
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval)
                        if (typeof onTimeout === 'function') {
                            onTimeout()
                        }
                        close(false)
                    }
                }
                
                timerInterval = setInterval(updateTimer, 1000)
            }

            if (showButtons) {
                confirmBtn.addEventListener('click', () => close(true))
                cancelBtn.addEventListener('click', () => close(false))
            }

            wrapper.addEventListener('click', (e) => {
                if (!modal.contains(e.target)) {
                    close(false)
                }
            })

            requestAnimationFrame(() => {
                modal.classList.add(this.selectors.showClass)
            })
        })
    }

    createWrapper(message, confirmText, cancelText, showButtons, timer) {
        const wrapper = document.createElement('div')
        wrapper.setAttribute('data-js-question-wrapper', '')
        wrapper.className = 'question-wrapper'

        const overlay = document.createElement('div')
        overlay.className = 'question-overlay'

        const modal = document.createElement('div')
        modal.className = 'question-modal'
        modal.setAttribute('data-js-question-modal', '')

        const content = document.createElement('div')
        content.className = 'question-content'

        const messageElement = document.createElement('div')
        messageElement.className = 'question-message'
        messageElement.setAttribute('data-js-question-message', '')

        const icon = document.createElement('i')
        icon.className = 'fa-regular fa-circle-question'
        icon.setAttribute('aria-hidden', 'true')

        const messageText = document.createElement('span')
        messageText.className = 'question-message-text'
        messageText.textContent = message

        messageElement.append(icon, messageText)

        if (timer && timer > 0) {
            const timerElement = document.createElement('div')
            timerElement.className = 'question-timer'
            timerElement.setAttribute('data-js-question-timer', '')
            messageElement.append(timerElement)
        }

        content.append(messageElement)

        if (showButtons) {
            const actions = document.createElement('div')
            actions.className = 'question-actions'

            const confirmButton = document.createElement('button')
            confirmButton.className = 'btn-confirm bg-gradient-anim-shine'
            confirmButton.setAttribute('data-js-question-confirm', '')
            confirmButton.type = 'button'
            confirmButton.textContent = confirmText

            const cancelButton = document.createElement('button')
            cancelButton.className = 'btn-cancel'
            cancelButton.setAttribute('data-js-question-cancel', '')
            cancelButton.type = 'button'
            cancelButton.textContent = cancelText

            actions.append(confirmButton, cancelButton)
            content.append(actions)
        }

        modal.append(content)
        wrapper.append(overlay, modal)

        return wrapper
    }

    closeAll() {
        const wrappers = document.querySelectorAll(this.selectors.wrapper)
        wrappers.forEach(wrapper => {
            if (typeof wrapper.questionManagerClose === 'function') {
                wrapper.questionManagerClose(false)
                return
            }

            const modal = wrapper.querySelector(this.selectors.modal)
            if (modal) {
                modal.classList.remove(this.selectors.showClass)
                modal.classList.add(this.selectors.hideClass)
                wrapper.classList.add(this.selectors.fadeOutClass)

                const removeWrapper = () => {
                    wrapper.remove()
                }

                modal.addEventListener('transitionend', removeWrapper, { once: true })
                setTimeout(removeWrapper, 300)
            }
        })
    }
}
// const questionManager = new QuestionManager()

// const confirmed = await questionManager.ask({
//     message: 'Delete this project?',
//     confirmText: 'Delete',
//     cancelText: 'Cancel'
// })

// if (confirmed) {
//     console.log('Deleted')
// } else {
//     console.log('Cancelled')
// }
