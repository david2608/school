import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, MessageCircle, Send, X } from 'lucide-react'

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hi Davit, I’m interested in Pedanyan Design School and would like to learn more about the AI Design course.'

const telegramValue = (import.meta.env.VITE_CONTACT_TELEGRAM_USERNAME || '').trim().replace(/^@/, '')
const whatsappValue = (import.meta.env.VITE_CONTACT_WHATSAPP_NUMBER || '').trim()
const telegramUsername = /^[a-zA-Z0-9_]{5,32}$/.test(telegramValue) ? telegramValue : ''
const whatsappNumber = /^\d{7,15}$/.test(whatsappValue) ? whatsappValue : ''

if (import.meta.env.DEV && !telegramUsername && !whatsappNumber) {
  console.warn('Pedanyan contact widget is hidden. Configure VITE_CONTACT_TELEGRAM_USERNAME and/or VITE_CONTACT_WHATSAPP_NUMBER.')
}

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)
  const channels = [
    telegramUsername && { key: 'telegram', label: 'Telegram', href: `https://t.me/${encodeURIComponent(telegramUsername)}`, Icon: Send },
    whatsappNumber && { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`, Icon: MessageCircle },
  ].filter(Boolean)

  useEffect(() => {
    if (!isOpen) return undefined
    const focusPanel = window.requestAnimationFrame(() => panelRef.current?.querySelector('a, button')?.focus())
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusPanel)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!channels.length) return null
  const closePanel = () => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return <div className={`contact-widget${isOpen ? ' is-open' : ''}`} ref={rootRef}>
    {isOpen && <section className="contact-panel" id="pedanyan-contact-panel" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="pedanyan-contact-title">
      <header className="contact-panel-head">
        <div className="contact-identity" aria-hidden="true">P</div>
        <div><span className="contact-kicker">PEDANYAN / SCHOOL</span><strong id="pedanyan-contact-title">Have a question?</strong></div>
        <button className="contact-close" type="button" onClick={closePanel} aria-label="Close contact panel"><X size={18} strokeWidth={1.7}/></button>
      </header>
      <div className="contact-panel-body">
        <p>Message me about the course, application or learning process.</p>
        <div className="contact-channels">{channels.map(({ key, label, href, Icon }) => <a className={`contact-channel contact-channel-${key}`} href={href} key={key} target="_blank" rel="noopener noreferrer"><span className="contact-channel-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.8}/></span><span>{label}</span><ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true"/></a>)}</div>
        <small>I usually reply personally.</small>
      </div>
    </section>}
    <button className="contact-toggle" ref={triggerRef} type="button" aria-label={isOpen ? 'Close contact options' : 'Message Pedanyan School'} aria-expanded={isOpen} aria-controls="pedanyan-contact-panel" onClick={() => setIsOpen(open => !open)}>{isOpen ? <X size={23} strokeWidth={1.7}/> : <MessageCircle size={24} strokeWidth={1.7}/>}</button>
  </div>
}
