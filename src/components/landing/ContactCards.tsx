import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { toast } from 'react-toastify'

interface ContactCard {
  label: string
  hint: string
  value: string
  action: string
  actionText: string
}

export function ContactCards({ cards }: { cards: ContactCard[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {cards.map((card) => (
        <ContactCardItem key={card.label} card={card} />
      ))}
    </div>
  )
}

/** 剪贴板降级：优先用异步 API，不可用时走 execCommand */
function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy') ? resolve() : reject(new Error('copy failed'))
    } catch {
      reject(new Error('copy failed'))
    } finally {
      document.body.removeChild(ta)
    }
  })
}

function ContactCardItem({ card }: { card: ContactCard }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    copyText(card.value)
      .then(() => {
        setCopied(true)
        toast.success(`已复制${card.label}：${card.value}`)
        window.setTimeout(() => setCopied(false), 1600)
      })
      .catch(() => {
        toast.error('复制失败，请手动复制')
      })
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="group text-left rounded-2xl border border-[#191A1D]/25 hover:border-[#191A1D] dark:border-white/25 dark:hover:border-white/70 bg-transparent p-6 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{card.label}</span>
        <span
          className={clsx(
            'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors',
            copied
              ? 'border-accent text-accent'
              : 'border-[#191A1D]/20 text-secondary group-hover:text-accent group-hover:border-accent/50 dark:border-white/20',
          )}
        >
          {copied ? '已复制 ✓' : card.actionText}
          {!copied && <span className="text-sm leading-none group-hover:rotate-45 transition-transform">＋</span>}
        </span>
      </div>
      <p className="mt-2 text-sm text-secondary">{card.hint}</p>
      <p className="mt-4 font-mono text-sm break-all">{card.value}</p>
    </motion.button>
  )
}
