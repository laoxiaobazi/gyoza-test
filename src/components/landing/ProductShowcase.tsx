import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { withBase } from '@/utils/base'

interface TerminalConfig {
  backTitle: string
  backCode: string
  midTitle: string
  midCode: string
  frontTitle: string
  frontStatus: string
  frontOutput: string[]
}

export interface ProjectItem {
  index: string
  name: string
  summary: string
  tags: string[]
  link: string
  linkText: string
  terminal: TerminalConfig
}

interface Props {
  eyebrow: string
  title: string
  description: string
  selectorLabel: string
  items: ProjectItem[]
}

export function ProductShowcase(props: Props) {
  const { selectorLabel, items } = props
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + items.length) % items.length)
  const next = () => setActive((i) => (i + 1) % items.length)

  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 lg:gap-14 items-start">
      {/* 左侧：选择项目 + 详情 */}
      <div>
        <div className="flex flex-wrap gap-2.5" data-reveal>
          {items.map((item, i) => (
            <button
              key={item.index}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all',
                i === active
                  ? 'border-[#24212F] bg-[#24212F] text-white'
                  : 'border-[#191A1D]/25 text-[#191A1D] hover:border-[#191A1D]/60 dark:border-white/25 dark:text-[#E8E6F0] dark:hover:border-white/60',
              )}
            >
              <span className="font-['Atkinson'] opacity-70">{item.index}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 text-xs text-secondary" data-reveal>
          {selectorLabel}
        </div>

        <ProjectDetail item={items[active]} />
      </div>

      {/* 右侧：终端堆叠 */}
      <div className="relative" data-reveal>
        <TerminalStack config={items[active].terminal} key={active} />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            aria-label="上一个项目"
            onClick={prev}
            className="size-9 rounded-full border border-[#191A1D]/25 hover:border-[#191A1D] hover:bg-[#EFEEE8] transition-colors dark:border-white/25 dark:hover:border-white/60 dark:hover:bg-[#25232E]"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="下一个项目"
            onClick={next}
            className="size-9 rounded-full border border-[#191A1D]/25 hover:border-[#191A1D] hover:bg-[#EFEEE8] transition-colors dark:border-white/25 dark:hover:border-white/60 dark:hover:bg-[#25232E]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectDetail({ item }: { item: ProjectItem }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.index}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        <div className="text-4xl font-bold text-accent/70 font-['Atkinson']">{item.index}</div>
        <h3 className="mt-3 text-2xl font-bold">{item.name}</h3>
        <p className="mt-3 text-secondary leading-relaxed">{item.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#E8E1F4]/70 px-3 py-1 text-xs text-[#514462] dark:bg-[#353148] dark:text-[#C9BFE0]"
            >
              {tag}
            </span>
          ))}
        </div>
        {item.link && (
          <a
            href={withBase(item.link)}
            target={item.link.startsWith('http') ? '_blank' : undefined}
            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1.5 mt-6 text-sm text-accent hover:underline underline-offset-4"
          >
            {item.linkText}
            <i className="iconfont icon-external-link" />
          </a>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

function TerminalStack({ config }: { config: TerminalConfig }) {
  const [typedLines, setTypedLines] = useState<string[]>([])
  const timers = useRef<number[]>([])

  useEffect(() => {
    setTypedLines([])
    timers.current.forEach(clearTimeout)
    timers.current = []
    let delay = 400
    config.frontOutput.forEach((line, lineIdx) => {
      delay += 500
      for (let ch = 1; ch <= line.length; ch++) {
        const t = window.setTimeout(() => {
          setTypedLines((prev) => {
            const next = [...prev]
            next[lineIdx] = line.slice(0, ch)
            return next
          })
        }, delay)
        timers.current.push(t)
        delay += 28
      }
    })
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [config])

  return (
    <div className="relative pt-8 pb-2 pr-2">
      {/* back 层 */}
      <div className="absolute top-0 left-6 right-0 h-[68%] rounded-xl bg-[#353148] border border-white/10 px-4 py-2.5 overflow-hidden">
        <div className="text-xs text-white/50 truncate">
          <span className="text-white/70">{config.backTitle}</span>
          <span className="mx-2 opacity-40">·</span>
          <code className="text-white/45">{config.backCode}</code>
        </div>
      </div>
      {/* middle 层 */}
      <div className="absolute top-4 left-3 right-2 h-[80%] rounded-xl bg-[#3D3954] border border-white/10 px-4 py-2.5 overflow-hidden">
        <div className="text-xs text-white/55 truncate">
          <span className="text-white/75">{config.midTitle}</span>
          <span className="mx-2 opacity-40">·</span>
          <code className="text-white/50">{config.midCode}</code>
        </div>
      </div>
      {/* front 终端 */}
      <div className="relative rounded-xl bg-[#2B2740] border border-white/10 shadow-xl shadow-[#2B2740]/30 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-2 text-xs text-white/60 font-mono">{config.frontTitle}</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-[#EEEAF8]/55">
            <i className="inline-block size-1.5 rounded-full bg-[#28C840] animate-pulse" />
            {config.frontStatus}
          </span>
        </div>
        <div className="px-4 py-3 font-mono text-[13px] leading-6 text-[#EEEAF8]/85 min-h-[120px]">
          {typedLines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-[#9D8ACB] select-none">$</span>
              <span className="break-all">
                {line}
                {i === typedLines.length - 1 && (
                  <span className="terminal-caret ml-0.5 inline-block w-[7px] h-[14px] align-[-2px] bg-[#EEEAF8]" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
