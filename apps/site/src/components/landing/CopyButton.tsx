'use client'

import { useEffect, useRef, useState } from 'react'

import { CheckIcon, CopyIcon } from './Icons'

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            timeoutRef.current = setTimeout(() => setCopied(false), 1600)
        } catch {
            // clipboard API unavailable — nothing to fall back to
        }
    }

    return (
        <button
            type="button"
            className="lw-copy-btn"
            onClick={handleCopy}
            aria-label="Copy to clipboard"
        >
            {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
        </button>
    )
}
